/* Roblox Grow a Garden 韩语网站 - 主JavaScript文件 */

// ===== 全局变量 =====
const GAG = {
  // 网站配置
  config: {
    siteName: 'Roblox Grow a Garden 가이드',
    version: '1.0.0',
    language: 'ko',
    theme: localStorage.getItem('theme') || 'light'
  },
  
  // DOM元素缓存
  elements: {},
  
  // 初始化标志
  initialized: false
};

// ===== DOM加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  GAG.init();
});

// ===== 主初始化函数 =====
GAG.init = function() {
  if (this.initialized) return;
  
  console.log(`${this.config.siteName} v${this.config.version} 초기화 중...`);
  
  // 缓存常用DOM元素
  this.cacheElements();
  
  // 初始化各个功能模块
  this.initTheme();
  this.initNavigation();
  this.initSearch();
  this.initBackToTop();
  this.initAnimations();
  this.initAds();
  this.initAnalytics();
  
  // 设置初始化完成标志
  this.initialized = true;
  
  console.log('웹사이트 초기화 완료!');
};

// ===== DOM元素缓存 =====
GAG.cacheElements = function() {
  this.elements = {
    // 导航相关
    navToggle: document.querySelector('.nav-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // 主题切换
    themeToggle: document.querySelector('.theme-toggle'),
    
    // 搜索相关
    searchInput: document.querySelector('.search-input'),
    searchResults: document.querySelector('.search-results'),
    
    // 返回顶部
    backToTop: document.querySelector('.back-to-top'),
    
    // 其他
    body: document.body,
    header: document.querySelector('.header'),
    main: document.querySelector('.main-content')
  };
};

// ===== 主题系统 =====
GAG.initTheme = function() {
  // 应用保存的主题
  this.applyTheme(this.config.theme);
  
  // 绑定主题切换按钮
  if (this.elements.themeToggle) {
    this.elements.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }
};

GAG.applyTheme = function(theme) {
  this.elements.body.setAttribute('data-theme', theme);
  this.config.theme = theme;
  localStorage.setItem('theme', theme);
  
  // 更新主题切换按钮图标
  if (this.elements.themeToggle) {
    this.elements.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
};

GAG.toggleTheme = function() {
  const newTheme = this.config.theme === 'light' ? 'dark' : 'light';
  this.applyTheme(newTheme);
};

// ===== 导航系统 =====
GAG.initNavigation = function() {
  // 移动端菜单切换
  if (this.elements.navToggle && this.elements.navMenu) {
    this.elements.navToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
  }
  
  // 导航链接点击处理
  this.elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      this.handleNavClick(e, link);
    });
  });
  
  // 点击外部关闭移动菜单
  document.addEventListener('click', (e) => {
    if (!this.elements.header.contains(e.target)) {
      this.closeMobileMenu();
    }
  });
  
  // 滚动时的导航栏效果
  this.initScrollEffects();
};

GAG.toggleMobileMenu = function() {
  this.elements.navMenu.classList.toggle('active');
  this.elements.navToggle.classList.toggle('active');
};

GAG.closeMobileMenu = function() {
  this.elements.navMenu.classList.remove('active');
  this.elements.navToggle.classList.remove('active');
};

GAG.handleNavClick = function(e, link) {
  // 移动端点击后关闭菜单
  if (window.innerWidth <= 767) {
    this.closeMobileMenu();
  }
  
  // 设置当前活动链接
  this.elements.navLinks.forEach(l => l.classList.remove('active'));
  link.classList.add('active');
};

// ===== 滚动效果 =====
GAG.initScrollEffects = function() {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // 导航栏显示/隐藏
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      this.elements.header.style.transform = 'translateY(-100%)';
    } else {
      this.elements.header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
};

// ===== 搜索功能 =====
GAG.initSearch = function() {
  if (!this.elements.searchInput) return;
  
  // 搜索输入处理
  let searchTimeout;
  this.elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      this.performSearch(e.target.value);
    }, 300);
  });
  
  // 搜索结果容器
  if (!this.elements.searchResults) {
    this.createSearchResults();
  }
};

GAG.performSearch = function(query) {
  if (query.length < 2) {
    this.hideSearchResults();
    return;
  }
  
  // 搜索页面内容
  const results = this.searchPageContent(query);
  this.displaySearchResults(results);
};

GAG.searchPageContent = function(query) {
  const results = [];
  const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li');
  
  searchableElements.forEach(element => {
    const text = element.textContent.toLowerCase();
    const searchQuery = query.toLowerCase();
    
    if (text.includes(searchQuery)) {
      results.push({
        element: element,
        text: element.textContent,
        type: element.tagName.toLowerCase(),
        relevance: this.calculateRelevance(text, searchQuery)
      });
    }
  });
  
  // 按相关性排序
  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
};

GAG.calculateRelevance = function(text, query) {
  const exactMatch = text.includes(query) ? 10 : 0;
  const wordCount = text.split(' ').length;
  const queryPosition = text.indexOf(query);
  const positionBonus = queryPosition === 0 ? 5 : (queryPosition < 50 ? 3 : 1);
  
  return exactMatch + positionBonus - (wordCount / 100);
};

GAG.displaySearchResults = function(results) {
  if (!this.elements.searchResults) return;
  
  if (results.length === 0) {
    this.elements.searchResults.innerHTML = '<div class="search-no-results">검색 결과가 없습니다.</div>';
  } else {
    const resultsHTML = results.map(result => `
      <div class="search-result-item" data-type="${result.type}">
        <div class="search-result-text">${this.highlightSearchTerm(result.text, this.elements.searchInput.value)}</div>
      </div>
    `).join('');
    
    this.elements.searchResults.innerHTML = resultsHTML;
    
    // 绑定点击事件
    this.elements.searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.scrollToElement(results[index].element);
        this.hideSearchResults();
      });
    });
  }
  
  this.showSearchResults();
};

GAG.highlightSearchTerm = function(text, term) {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

GAG.createSearchResults = function() {
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results';
  resultsContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-medium);
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
  `;
  
  this.elements.searchInput.parentNode.appendChild(resultsContainer);
  this.elements.searchResults = resultsContainer;
};

GAG.showSearchResults = function() {
  if (this.elements.searchResults) {
    this.elements.searchResults.style.display = 'block';
  }
};

GAG.hideSearchResults = function() {
  if (this.elements.searchResults) {
    this.elements.searchResults.style.display = 'none';
  }
};

GAG.scrollToElement = function(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  
  // 添加高亮效果
  element.style.backgroundColor = 'var(--primary-color)';
  element.style.color = 'white';
  element.style.transition = 'all 0.3s ease';
  
  setTimeout(() => {
    element.style.backgroundColor = '';
    element.style.color = '';
  }, 2000);
};

// ===== 返回顶部功能 =====
GAG.initBackToTop = function() {
  if (!this.elements.backToTop) {
    this.createBackToTopButton();
  }
  
  // 滚动监听
  window.addEventListener('scroll', () => {
    this.updateBackToTopVisibility();
  });
  
  // 点击事件
  this.elements.backToTop.addEventListener('click', () => {
    this.scrollToTop();
  });
};

GAG.createBackToTopButton = function() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  button.setAttribute('aria-label', '맨 위로 이동');
  
  document.body.appendChild(button);
  this.elements.backToTop = button;
};

GAG.updateBackToTopVisibility = function() {
  const scrolled = window.scrollY > 300;
  
  if (scrolled) {
    this.elements.backToTop.classList.add('visible');
  } else {
    this.elements.backToTop.classList.remove('visible');
  }
};

GAG.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// ===== 动画效果 =====
GAG.initAnimations = function() {
  // 页面加载动画
  this.elements.main.classList.add('fade-in');
  
  // 滚动动画观察器
  this.initScrollAnimations();
};

GAG.initScrollAnimations = function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察卡片元素
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
};

// ===== 广告系统 =====
GAG.initAds = function() {
  // 检查AdSense是否可用
  this.checkAdSenseAvailability();
  
  // 延迟加载广告
  setTimeout(() => {
    this.loadAds();
  }, 1000);
};

GAG.checkAdSenseAvailability = function() {
  // 检查广告拦截器
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  document.body.appendChild(testAd);
  
  setTimeout(() => {
    if (testAd.offsetHeight === 0) {
      console.log('광고 차단기가 감지되었습니다.');
      this.handleAdBlocker();
    }
    document.body.removeChild(testAd);
  }, 100);
};

GAG.handleAdBlocker = function() {
  // 友好的广告拦截器提示
  const adContainers = document.querySelectorAll('.ad-container');
  adContainers.forEach(container => {
    container.innerHTML = `
      <div class="ad-blocker-message">
        <p>🚫 광고 차단기가 활성화되어 있습니다</p>
        <p>사이트 운영을 위해 광고를 허용해 주세요!</p>
      </div>
    `;
  });
};

GAG.loadAds = function() {
  // 模拟广告加载
  const adContainers = document.querySelectorAll('.ad-banner');
  adContainers.forEach(container => {
    if (container.innerHTML.includes('AdSense')) {
      // 实际项目中这里会加载真实的AdSense代码
      console.log('AdSense 광고 로딩 중...');
    }
  });
};

// ===== 分析统计 =====
GAG.initAnalytics = function() {
  // 页面浏览统计
  this.trackPageView();
  
  // 用户交互统计
  this.trackUserInteractions();
};

GAG.trackPageView = function() {
  // Google Analytics 或其他统计工具
  console.log('페이지 조회수 추적:', window.location.pathname);
};

GAG.trackUserInteractions = function() {
  // 导航点击统计
  this.elements.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('네비게이션 클릭:', link.textContent);
    });
  });
  
  // 搜索统计
  if (this.elements.searchInput) {
    this.elements.searchInput.addEventListener('input', (e) => {
      if (e.target.value.length >= 3) {
        console.log('검색어:', e.target.value);
      }
    });
  }
};

// ===== 工具函数 =====
GAG.utils = {
  // 防抖函数
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // 节流函数
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 格式化日期
  formatDate: function(date) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },
  
  // 复制到剪贴板
  copyToClipboard: function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('클립보드에 복사됨:', text);
      });
    }
  }
};

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
  console.error('JavaScript 오류:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('처리되지 않은 Promise 거부:', e.reason);
});

// ===== 页面卸载时清理 =====
window.addEventListener('beforeunload', function() {
  // 清理定时器、事件监听器等
  console.log('페이지 언로드 중...');
});
