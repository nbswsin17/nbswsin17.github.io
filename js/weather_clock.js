// 简单的天气时钟实现

// 更新天气时钟样式
function updateWeatherClockStyle(weatherClock, isSidebarMode) {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const isReadMode = document.body.classList.contains('read-mode');
  
  if (isSidebarMode) {
    // 侧边栏模式
    if (isDarkMode && isReadMode) {
      // 暗黑模式下的阅读模式
      weatherClock.style.backgroundColor = 'rgba(25, 25, 25, 0.9)';
      weatherClock.style.color = '#ffffff';
    } else if (isReadMode) {
      // 阅读模式
      weatherClock.style.backgroundColor = 'rgba(158, 204, 171, 0.5)';
      weatherClock.style.color = ''; // 恢复默认颜色
    } else if (isDarkMode) {
      // 暗黑模式
      weatherClock.style.backgroundColor = 'var(--trans-dark)';
      weatherClock.style.color = ''; // 恢复默认颜色
    } else {
      // 白天模式
      weatherClock.style.backgroundColor = 'var(--trans-light)';
      weatherClock.style.color = ''; // 恢复默认颜色
    }
  } else {
    // 固定定位模式
    if (isDarkMode) {
      weatherClock.style.backgroundColor = 'rgba(25, 25, 25, 0.27)';
    } else {
      weatherClock.style.backgroundColor = 'rgba(255, 255, 255, 0.27)';
    }
  }
}

function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const dateStr = `${year}-${month}-${day}`;
  const timeStr = `${hours}:${minutes}:${seconds}`;
  
  // 创建或获取天气时钟元素
  let weatherClock = document.getElementById('weather-clock');
  let isSidebarMode = false;
  
  if (!weatherClock) {
    weatherClock = document.createElement('div');
    weatherClock.id = 'weather-clock';
    
    // 找到侧边栏
    const sidebar = document.querySelector('#aside-content');
    
    if (sidebar) {
      // 如果找到侧边栏，添加到侧边栏中
      isSidebarMode = true;
      // 设置样式使其与侧边栏其他组件风格完全一致
      weatherClock.style.marginBottom = '15px';
      weatherClock.style.padding = '16px'; // 与侧边栏保持一致的内边距
      weatherClock.style.backgroundColor = 'var(--trans-light)';
      weatherClock.style.backdropFilter = 'var(--backdrop-filter)';
      weatherClock.style.borderRadius = '18px';
      weatherClock.style.border = 'var(--border-style)';
      weatherClock.style.textAlign = 'center';
      // 移除过渡效果，使主题切换瞬间完成
      weatherClock.style.transition = 'background-color 0s, border-color 0s, color 0s';
      
      // 将天气时钟添加到侧边栏的顶部
      sidebar.prepend(weatherClock);
    } else {
      // 如果侧边栏不存在，退化为固定定位
      weatherClock.style.position = 'fixed';
      weatherClock.style.top = '20px';
      weatherClock.style.right = '20px';
      weatherClock.style.zIndex = '9999';
      weatherClock.style.backgroundColor = 'rgba(255, 255, 255, 0.27)';
      weatherClock.style.backdropFilter = 'blur(2px) saturate(150%)';
      weatherClock.style.borderRadius = '18px';
      weatherClock.style.border = '1px solid rgb(169, 169, 169)';
      // 移除过渡效果，使主题切换瞬间完成
      weatherClock.style.transition = 'background-color 0s, border-color 0s';
      
      document.body.appendChild(weatherClock);
    }
    
    // 首次创建元素时设置初始内容结构
    weatherClock.innerHTML = `
      <div id="weather-date" style="font-size: 14px; color: #333; margin-bottom: 5px;">${dateStr}</div>
      <div id="weather-time" style="font-size: 24px; font-weight: bold; color: #49b1f5; margin-bottom: 5px;">${timeStr}</div>
      <div id="weather-info" style="font-size: 12px; color: #666;">当前天气：晴</div>
    `;
    
    // 存储模式信息在元素上，以便事件监听器使用
    weatherClock.dataset.isSidebarMode = isSidebarMode;
    
    // 初始化样式
    updateWeatherClockStyle(weatherClock, isSidebarMode);
  } else {
    // 优化更新逻辑：只更新变化的部分，而不是整个innerHTML
    const dateElement = document.getElementById('weather-date');
    const timeElement = document.getElementById('weather-time');
    const infoElement = document.getElementById('weather-info');
    
    if (dateElement) dateElement.textContent = dateStr;
    if (timeElement) timeElement.textContent = timeStr;
    // 如果天气信息有变化，也可以在这里更新
    
    // 获取存储的模式信息
    isSidebarMode = weatherClock.dataset.isSidebarMode === 'true';
    
    // 每次更新都检查并应用当前主题样式
    updateWeatherClockStyle(weatherClock, isSidebarMode);
  }
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // 初始化时钟
    updateClock();
    setInterval(updateClock, 1000);
    
    // 添加主题切换事件监听（立即执行，无延迟）
    document.addEventListener('themechange', function() {
      const weatherClock = document.getElementById('weather-clock');
      if (weatherClock) {
        const isSidebarMode = weatherClock.dataset.isSidebarMode === 'true';
        updateWeatherClockStyle(weatherClock, isSidebarMode);
      }
    });
    
    // 监听阅读模式切换事件（立即执行，无延迟）
    const readModeToggle = document.getElementById('readmode');
    if (readModeToggle) {
      readModeToggle.addEventListener('click', function() {
        const weatherClock = document.getElementById('weather-clock');
        if (weatherClock) {
          const isSidebarMode = weatherClock.dataset.isSidebarMode === 'true';
          updateWeatherClockStyle(weatherClock, isSidebarMode);
        }
      }); // 完全移除延迟，使模式切换瞬间完成
    }
  });
} else {
  // 初始化时钟
  updateClock();
  setInterval(updateClock, 1000);
  
  // 添加主题切换事件监听
  document.addEventListener('themechange', function() {
    const weatherClock = document.getElementById('weather-clock');
    if (weatherClock) {
      const isSidebarMode = weatherClock.dataset.isSidebarMode === 'true';
      updateWeatherClockStyle(weatherClock, isSidebarMode);
    }
  });
  
  // 监听阅读模式切换事件
  const readModeToggle = document.getElementById('readmode');
  if (readModeToggle) {
    readModeToggle.addEventListener('click', function() {
      setTimeout(function() {
        const weatherClock = document.getElementById('weather-clock');
        if (weatherClock) {
          const isSidebarMode = weatherClock.dataset.isSidebarMode === 'true';
          updateWeatherClockStyle(weatherClock, isSidebarMode);
        }
      }, 10); // 大幅缩减延迟时间，优化动画最后部分体验
    });
  }
}