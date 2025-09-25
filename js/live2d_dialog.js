// live2d看板娘对话框控制
(function() {
  // 等待页面加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 等待live2d-widget完全加载
    setTimeout(function() {
      try {
        // 显示自定义消息
        showLive2dDialog('若色彩造成阅读不适，可随时到右下角调节日夜模式呀');
      } catch (error) {
        console.error('Live2D对话框设置失败:', error);
        // 如果出现错误，尝试直接创建临时对话框
        createTemporaryDialog('若色彩造成阅读不适，可随时到右下角调节日夜模式呀');
      }
    }, 2000); // 延迟2秒执行，确保Live2D已经加载完成
  });

  // 通过不同方式尝试显示Live2D对话框
  function showLive2dDialog(message) {
    // 方式1：尝试直接修改已有的live2d对话框元素
    const dialogElement = document.querySelector('#live2d-dialog');
    if (dialogElement) {
      dialogElement.textContent = message;
      dialogElement.style.opacity = '1';
      dialogElement.style.display = 'block';
      
      // 5秒后自动隐藏
      setTimeout(function() {
        dialogElement.style.opacity = '0';
      }, 5000);
      return true;
    }

    // 方式2：检查是否有L2Dwidget对象并调用其方法
    if (window.L2Dwidget) {
      // 尝试各种可能的API调用方式
      try {
        // 方式2.1：showMessage方法
        if (window.L2Dwidget.showMessage) {
          window.L2Dwidget.showMessage(message);
          return true;
        }
        
        // 方式2.2：talk方法
        if (window.L2Dwidget.talk) {
          window.L2Dwidget.talk(message);
          return true;
        }
        
        // 方式2.3：on方法
        if (window.L2Dwidget.on) {
          window.L2Dwidget.on('dialog', message);
          return true;
        }
        
        // 方式2.4：dispatchEvent方法
        if (window.L2Dwidget.dispatchEvent) {
          window.L2Dwidget.dispatchEvent('show-message', message);
          return true;
        }
      } catch (e) {
        console.warn('Live2D API调用失败:', e);
      }
    }

    // 方式3：尝试通过事件触发
    try {
      const event = new CustomEvent('show-live2d-dialog', {
        detail: { message: message }
      });
      document.dispatchEvent(event);
      return true;
    } catch (e) {
      console.warn('自定义事件触发失败:', e);
    }

    // 所有方式都失败，返回false
    return false;
  }

  // 创建临时对话框
  function createTemporaryDialog(message) {
    // 检查是否已有临时对话框
    let dialog = document.querySelector('#temp-live2d-dialog');
    
    if (!dialog) {
      // 创建新的对话框元素
      dialog = document.createElement('div');
      dialog.id = 'temp-live2d-dialog';
      dialog.style.position = 'fixed';
      dialog.style.bottom = '220px'; // 假设看板娘在左下角，调整位置让对话框在其上方
      dialog.style.left = '40px';
      dialog.style.background = 'rgba(255, 255, 255, 0.9)';
      dialog.style.color = '#333';
      dialog.style.padding = '10px 15px';
      dialog.style.borderRadius = '18px';
      dialog.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      dialog.style.zIndex = '9998';
      dialog.style.maxWidth = '300px';
      dialog.style.fontSize = '14px';
      dialog.style.opacity = '0';
      dialog.style.transition = 'opacity 0.3s ease';
      dialog.style.pointerEvents = 'none';
      document.body.appendChild(dialog);
    }
    
    // 设置消息内容并显示
    dialog.textContent = message;
    dialog.style.opacity = '1';
    
    // 5秒后自动隐藏
    setTimeout(function() {
      dialog.style.opacity = '0';
    }, 5000);
  }
})();