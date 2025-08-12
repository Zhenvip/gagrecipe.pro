/* 고급 분석 및 사용자 추적 시스템 */

// ===== 사용자 행동 분석 시스템 =====
const Analytics = {
  // 세션 정보
  session: {
    startTime: Date.now(),
    pageViews: 0,
    interactions: 0,
    searchQueries: [],
    visitedPages: []
  },
  
  // 초기화
  init: function() {
    console.log('Analytics 시스템 초기화');
    
    // 세션 시작 추적
    this.trackPageView();
    
    // 이벤트 리스너 설정
    this.setupEventListeners();
    
    // 주기적 데이터 전송
    this.startPeriodicReporting();
    
    // 페이지 이탈 시 데이터 전송
    this.setupBeforeUnload();
  },
  
  // 페이지 뷰 추적
  trackPageView: function() {
    const pageData = {
      url: window.location.href,
      title: document.title,
      timestamp: Date.now(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    this.session.pageViews++;
    this.session.visitedPages.push(pageData);
    
    console.log('페이지 뷰 추적:', pageData);
    
    // Google Analytics로 전송
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_TRACKING_ID', {
        page_title: pageData.title,
        page_location: pageData.url
      });
    }
  },
  
  // 이벤트 리스너 설정
  setupEventListeners: function() {
    // 클릭 추적
    document.addEventListener('click', (e) => {
      this.trackClick(e);
    });
    
    // 스크롤 추적
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackScroll();
      }, 100);
    });
    
    // 검색 추적
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        if (e.target.value.length >= 3) {
          this.trackSearch(e.target.value);
        }
      });
    });
    
    // 폼 제출 추적
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        this.trackFormSubmit(form);
      });
    });
    
    // 에러 추적
    window.addEventListener('error', (e) => {
      this.trackError(e);
    });
  },
  
  // 클릭 추적
  trackClick: function(event) {
    const target = event.target;
    const clickData = {
      element: target.tagName.toLowerCase(),
      className: target.className,
      id: target.id,
      text: target.textContent ? target.textContent.substring(0, 50) : '',
      href: target.href || '',
      timestamp: Date.now()
    };
    
    this.session.interactions++;
    
    // 특별한 요소들 추가 추적
    if (target.matches('.nav-link')) {
      this.trackEvent('navigation', 'click', clickData.text);
    } else if (target.matches('.btn')) {
      this.trackEvent('button', 'click', clickData.text);
    } else if (target.matches('.plant-card')) {
      this.trackEvent('plant', 'view', clickData.text);
    } else if (target.matches('.category-tab')) {
      this.trackEvent('filter', 'category', clickData.text);
    }
    
    console.log('클릭 추적:', clickData);
  },
  
  // 스크롤 추적
  trackScroll: function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    // 25%, 50%, 75%, 100% 지점에서 이벤트 발생
    if ([25, 50, 75, 100].includes(scrollPercent)) {
      this.trackEvent('scroll', 'depth', scrollPercent.toString());
    }
  },
  
  // 검색 추적
  trackSearch: function(query) {
    const searchData = {
      query: query,
      timestamp: Date.now(),
      page: window.location.pathname
    };
    
    this.session.searchQueries.push(searchData);
    this.trackEvent('search', 'query', query);
    
    console.log('검색 추적:', searchData);
  },
  
  // 폼 제출 추적
  trackFormSubmit: function(form) {
    const formData = {
      action: form.action,
      method: form.method,
      fields: form.elements.length,
      timestamp: Date.now()
    };
    
    this.trackEvent('form', 'submit', form.action);
    console.log('폼 제출 추적:', formData);
  },
  
  // 에러 추적
  trackError: function(error) {
    const errorData = {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.trackEvent('error', 'javascript', error.message);
    console.error('JavaScript 에러 추적:', errorData);
    
    // 에러를 서버로 전송 (실제 구현 시)
    // this.sendErrorToServer(errorData);
  },
  
  // 일반 이벤트 추적
  trackEvent: function(category, action, label, value) {
    // Google Analytics로 전송
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
    
    console.log('이벤트 추적:', { category, action, label, value });
  },
  
  // 사용자 세션 분석
  analyzeSession: function() {
    const sessionDuration = Date.now() - this.session.startTime;
    const avgTimePerPage = this.session.pageViews > 0 ? sessionDuration / this.session.pageViews : 0;
    
    return {
      duration: sessionDuration,
      pageViews: this.session.pageViews,
      interactions: this.session.interactions,
      avgTimePerPage: avgTimePerPage,
      searchQueries: this.session.searchQueries.length,
      bounceRate: this.session.pageViews === 1 ? 100 : 0
    };
  },
  
  // 주기적 데이터 전송
  startPeriodicReporting: function() {
    // 5분마다 세션 데이터 전송
    setInterval(() => {
      const sessionAnalysis = this.analyzeSession();
      console.log('세션 분석:', sessionAnalysis);
      
      // 실제 구현 시 서버로 전송
      // this.sendSessionData(sessionAnalysis);
    }, 300000); // 5분
  },
  
  // 페이지 이탈 시 데이터 전송
  setupBeforeUnload: function() {
    window.addEventListener('beforeunload', () => {
      const finalSessionData = this.analyzeSession();
      
      // Navigator.sendBeacon을 사용하여 안정적으로 데이터 전송
      if (navigator.sendBeacon) {
        const data = JSON.stringify(finalSessionData);
        // navigator.sendBeacon('/analytics', data);
      }
      
      console.log('최종 세션 데이터:', finalSessionData);
    });
  },
  
  // A/B 테스트 지원
  getABTestVariant: function(testName) {
    // 사용자 ID 기반으로 일관된 변형 할당
    const userId = this.getUserId();
    const hash = this.simpleHash(userId + testName);
    return hash % 2 === 0 ? 'A' : 'B';
  },
  
  // 사용자 ID 생성 (쿠키 기반)
  getUserId: function() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('user_id', userId);
    }
    return userId;
  },
  
  // 간단한 해시 함수
  simpleHash: function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  },
  
  // 성능 메트릭 수집
  collectPerformanceMetrics: function() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      const metrics = {
        // Core Web Vitals
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        
        // 기타 메트릭
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domParsing: navigation.domInteractive - navigation.responseEnd,
        resourceLoading: navigation.loadEventStart - navigation.domContentLoadedEventEnd
      };
      
      console.log('성능 메트릭:', metrics);
      
      // 성능 데이터를 Google Analytics로 전송
      Object.entries(metrics).forEach(([key, value]) => {
        if (value > 0) {
          this.trackEvent('performance', key, '', Math.round(value));
        }
      });
      
      return metrics;
    }
  },
  
  // 히트맵 데이터 수집 (간단한 버전)
  collectHeatmapData: function() {
    const heatmapData = [];
    
    document.addEventListener('click', (e) => {
      const rect = document.documentElement.getBoundingClientRect();
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      heatmapData.push({
        x: x,
        y: y,
        timestamp: Date.now(),
        element: e.target.tagName.toLowerCase()
      });
      
      // 최대 100개 데이터포인트만 유지
      if (heatmapData.length > 100) {
        heatmapData.shift();
      }
    });
    
    return heatmapData;
  }
};

// 페이지 로드 완료 후 Analytics 초기화
document.addEventListener('DOMContentLoaded', function() {
  Analytics.init();
  
  // 성능 메트릭 수집 (페이지 로드 완료 후)
  window.addEventListener('load', () => {
    setTimeout(() => {
      Analytics.collectPerformanceMetrics();
    }, 1000);
  });
  
  // 히트맵 데이터 수집 시작
  Analytics.collectHeatmapData();
});

// 전역 객체로 내보내기
window.Analytics = Analytics;
