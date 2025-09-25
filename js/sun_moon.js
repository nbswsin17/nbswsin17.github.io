// 自定义明暗切换动画（增强平滑渐变效果）
function customSwitchNightMode() {
  // 确保DOM完全加载
  if (document.readyState !== 'complete') {
    return;
  }
  
  // 获取当前模式
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const body = document.querySelector('body');
  const html = document.documentElement;
  
  // 移除所有已存在的动画元素
  const removeExistingElements = () => {
    const skyElements = document.querySelectorAll('.theme-transition-sky');
    const sunElements = document.querySelectorAll('.theme-transition-sun');
    const moonElements = document.querySelectorAll('.theme-transition-moon');
    
    skyElements.forEach(el => el.remove());
    sunElements.forEach(el => el.remove());
    moonElements.forEach(el => el.remove());
  };
  
  removeExistingElements();
  
  // 添加平滑过渡动画
  // 1. 创建过渡层
  const sky = document.createElement('div');
  sky.className = 'theme-transition-sky';
  // 使用更丰富的CSS动画属性和贝塞尔曲线
  sky.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
    background-size: 100% 200%;
    background-position: 0% 0%;
  `;
  
  document.body.appendChild(sky);
  
  // 2. 创建太阳/月亮元素
  const celestialBody = document.createElement('div');
  celestialBody.style.cssText = `
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    z-index: 10000;
    pointer-events: none;
    transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  // 3. 设置过渡样式
  html.style.transition = 'background-color 2s cubic-bezier(0.4, 0, 0.2, 1), color 2s cubic-bezier(0.4, 0, 0.2, 1)';
  body.style.transition = 'background-color 2s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // 4. 添加更多可过渡元素并使用统一的动画时间
  const transitionElements = document.querySelectorAll('header, nav, main, footer, .card, .post, .sidebar, .widget, a, button, input, .avatar, .tag, .category, .toc, .pagination');
  transitionElements.forEach(el => {
    el.style.transition = 'background-color 2s cubic-bezier(0.4, 0, 0.2, 1), color 2s cubic-bezier(0.4, 0, 0.2, 1), border-color 2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 2s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  // 5. 设置更丰富的渐变动画
  if (nowMode === 'light') {
    // 白天到黑夜的渐变 - 使用更丰富的色彩过渡
    sky.style.background = 'linear-gradient(180deg, #fff9e6 0%, #ffd79a 30%, #a3b9cc 60%, #1a237e 100%)';
    
    // 创建太阳元素
    celestialBody.className = 'theme-transition-sun';
    celestialBody.style.background = 'radial-gradient(circle, #ffffff 0%, #ffea00 50%, #ffc107 100%)';
    celestialBody.style.boxShadow = '0 0 60px rgba(255, 234, 0, 0.8)';
    celestialBody.style.top = '10%';
    celestialBody.style.left = '80%';
    document.body.appendChild(celestialBody);
    
    // 显示渐变层
    setTimeout(() => {
      sky.style.opacity = '1';
      
      // 太阳落山动画
      setTimeout(() => {
        celestialBody.style.top = '110%';
        celestialBody.style.left = '50%';
        celestialBody.style.transform = 'translate(-50%, -50%) scale(0.8)';
        celestialBody.style.opacity = '0';
      }, 300);
      
      // 延迟切换主题类
      setTimeout(() => {
        body.classList.add('DarkMode');
        body.classList.remove('LightMode');
        
        // 主题切换后添加星空效果
        const starsCount = 100;
        for (let i = 0; i < starsCount; i++) {
          const star = document.createElement('div');
          star.style.cssText = `
            position: fixed;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background-color: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            z-index: 9998;
            animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out;
          `;
          document.body.appendChild(star);
          
          // 清理星空
          setTimeout(() => star.remove(), 2500);
        }
        
        // 主题切换后淡出渐变层
        setTimeout(() => {
          sky.style.opacity = '0';
          
          // 清理过渡层
          setTimeout(() => {
            removeExistingElements();
            // 重置过渡样式
            html.style.transition = '';
            body.style.transition = '';
            transitionElements.forEach(el => {
              el.style.transition = '';
            });
          }, 1000);
        }, 1200);
      }, 700);
    }, 10);
    
    // 激活暗色模式
    setTimeout(() => {
      btf.activateDarkMode();
      btf.saveToLocal.set('theme', 'dark', 2);
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
      document.documentElement.setAttribute('data-theme', 'dark');
    }, 1000);
  } else {
    // 黑夜到白天的渐变 - 使用更丰富的色彩过渡
    sky.style.background = 'linear-gradient(180deg, #1a237e 0%, #3f51b5 40%, #82b1ff 70%, #fff9e6 100%)';
    
    // 创建月亮元素
    celestialBody.className = 'theme-transition-moon';
    celestialBody.style.background = 'radial-gradient(circle, #ffffff 0%, #e0e0e0 60%, #bdbdbd 100%)';
    celestialBody.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.3)';
    celestialBody.style.top = '110%';
    celestialBody.style.left = '50%';
    celestialBody.style.transform = 'translate(-50%, -50%) scale(0.8)';
    celestialBody.style.opacity = '0';
    document.body.appendChild(celestialBody);
    
    // 显示渐变层
    setTimeout(() => {
      sky.style.opacity = '1';
      
      // 月亮升起动画
      setTimeout(() => {
        celestialBody.style.top = '10%';
        celestialBody.style.left = '80%';
        celestialBody.style.transform = 'translate(0, 0) scale(1)';
        celestialBody.style.opacity = '1';
      }, 300);
      
      // 延迟切换主题类
      setTimeout(() => {
        body.classList.add('LightMode');
        body.classList.remove('DarkMode');
        
        // 主题切换后淡出渐变层
        setTimeout(() => {
          sky.style.opacity = '0';
          
          // 清理过渡层
          setTimeout(() => {
            removeExistingElements();
            // 重置过渡样式
            html.style.transition = '';
            body.style.transition = '';
            transitionElements.forEach(el => {
              el.style.transition = '';
            });
          }, 1000);
        }, 1200);
      }, 700);
    }, 10);
    
    // 激活亮色模式
    setTimeout(() => {
      btf.activateLightMode();
      btf.saveToLocal.set('theme', 'light', 2);
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
      document.documentElement.setAttribute('data-theme', 'light');
    }, 1000);
  }
  
  // 添加星星闪烁的关键帧动画
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // 显示提示信息
  if (GLOBAL_CONFIG.Snackbar !== undefined) {
    const message = nowMode === 'light' ? GLOBAL_CONFIG.Snackbar.day_to_night : GLOBAL_CONFIG.Snackbar.night_to_day;
    setTimeout(() => {
      btf.snackbarShow(message);
    }, 800);
  }
  
  // 处理第三方组件的主题切换
  setTimeout(() => {
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && window.disqusReset();
  }, 1500);
  
  // 清理动态样式
  setTimeout(() => {
    if (styleSheet.parentNode) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  }, 3000);
}

