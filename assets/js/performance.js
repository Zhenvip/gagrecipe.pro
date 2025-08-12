/* 성능 최적화 및 사용자 경험 향상 스크립트 */

// ===== 성능 최적화 시스템 =====
const Performance = {
  // 설정
  config: {
    lazyLoadOffset: 100,
    throttleDelay: 100,
    debounceDelay: 300
  },
  
  // 초기화
  init: function() {
    console.log('Performance 최적화 시스템 초기화');
    
    // 이미지 지연 로딩
    this.initLazyLoading();
    
    // 리소스 프리로딩
    this.preloadCriticalResources();
    
    // 캐시 관리
    this.initCacheManagement();
    
    // 네트워크 상태 모니터링
    this.monitorNetworkStatus();
    
    // 메모리 사용량 최적화
    this.optimizeMemoryUsage();
    
    // 배터리 상태 고려 최적화
    this.optimizeForBattery();
  },
  
  // 이미지 지연 로딩
  initLazyLoading: function() {
    // Intersection Observer를 사용한 지연 로딩
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // 실제 이미지 로드
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // srcset 처리
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            // 로딩 완료 후 클래스 추가
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
            
            // 관찰 중단
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: `${this.config.lazyLoadOffset}px`
      });
      
      // 지연 로딩할 이미지들 관찰 시작
      document.querySelectorAll('img[data-src]').forEach(img => {
        // 로딩 플레이스홀더 추가
        img.classList.add('lazy-loading');
        imageObserver.observe(img);
      });
    }
  },
  
  // 중요 리소스 프리로딩
  preloadCriticalResources: function() {
    const criticalResources = [
      // 중요 CSS 파일들
      '/assets/css/main.css',
      '/assets/css/responsive.css',
      
      // 중요 JavaScript 파일들
      '/assets/js/main.js',
      
      // 중요 폰트들
      'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
        link.onload = function() {
          this.rel = 'stylesheet';
        };
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.includes('fonts.googleapis.com')) {
        link.as = 'style';
      }
      
      link.href = resource;
      document.head.appendChild(link);
    });
  },
  
  // 캐시 관리
  initCacheManagement: function() {
    // Service Worker 등록 (실제 구현 시)
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.register('/sw.js');
    }
    
    // 로컬 스토리지 캐시 관리
    this.manageLocalStorageCache();
  },
  
  // 로컬 스토리지 캐시 관리
  manageLocalStorageCache: function() {
    const CACHE_KEY = 'gag_cache';
    const CACHE_VERSION = '1.0.0';
    const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24시간
    
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache) {
        const cacheData = JSON.parse(cache);
        
        // 캐시 만료 확인
        if (Date.now() - cacheData.timestamp > CACHE_EXPIRY || 
            cacheData.version !== CACHE_VERSION) {
          localStorage.removeItem(CACHE_KEY);
          console.log('캐시 만료로 인한 삭제');
        }
      }
    } catch (e) {
      console.error('캐시 관리 오류:', e);
      localStorage.removeItem(CACHE_KEY);
    }
  },
  
  // 네트워크 상태 모니터링
  monitorNetworkStatus: function() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      // 연결 상태에 따른 최적화
      this.optimizeForConnection(connection);
      
      // 연결 상태 변경 시 재최적화
      connection.addEventListener('change', () => {
        this.optimizeForConnection(connection);
      });
    }
    
    // 온라인/오프라인 상태 모니터링
    window.addEventListener('online', () => {
      console.log('온라인 상태로 전환');
      this.handleOnlineStatus(true);
    });
    
    window.addEventListener('offline', () => {
      console.log('오프라인 상태로 전환');
      this.handleOnlineStatus(false);
    });
  },
  
  // 연결 상태에 따른 최적화
  optimizeForConnection: function(connection) {
    const effectiveType = connection.effectiveType;
    const saveData = connection.saveData;
    
    console.log(`네트워크 상태: ${effectiveType}, 데이터 절약: ${saveData}`);
    
    // 느린 연결이나 데이터 절약 모드에서 최적화
    if (effectiveType === '2g' || effectiveType === 'slow-2g' || saveData) {
      this.enableDataSavingMode();
    } else {
      this.disableDataSavingMode();
    }
  },
  
  // 데이터 절약 모드 활성화
  enableDataSavingMode: function() {
    document.body.classList.add('data-saving-mode');
    
    // 이미지 품질 낮추기
    document.querySelectorAll('img').forEach(img => {
      if (img.dataset.lowres) {
        img.src = img.dataset.lowres;
      }
    });
    
    // 애니메이션 비활성화
    document.body.style.setProperty('--transition', 'none');
    
    console.log('데이터 절약 모드 활성화');
  },
  
  // 데이터 절약 모드 비활성화
  disableDataSavingMode: function() {
    document.body.classList.remove('data-saving-mode');
    
    // 원래 설정 복원
    document.body.style.removeProperty('--transition');
    
    console.log('데이터 절약 모드 비활성화');
  },
  
  // 온라인/오프라인 상태 처리
  handleOnlineStatus: function(isOnline) {
    if (isOnline) {
      // 온라인 상태: 대기 중인 요청들 처리
      this.processPendingRequests();
      this.showNotification('인터넷 연결이 복구되었습니다.', 'success');
    } else {
      // 오프라인 상태: 사용자에게 알림
      this.showNotification('인터넷 연결이 끊어졌습니다. 일부 기능이 제한될 수 있습니다.', 'warning');
    }
  },
  
  // 대기 중인 요청 처리
  processPendingRequests: function() {
    // 실제 구현에서는 오프라인 중 대기된 요청들을 처리
    console.log('대기 중인 요청들 처리 중...');
  },
  
  // 메모리 사용량 최적화
  optimizeMemoryUsage: function() {
    // 가비지 컬렉션 힌트 제공
    if ('gc' in window) {
      setInterval(() => {
        if (performance.memory && performance.memory.usedJSHeapSize > 50 * 1024 * 1024) {
          // 50MB 이상 사용 시 정리 제안
          console.log('메모리 사용량 높음, 정리 권장');
        }
      }, 60000); // 1분마다 체크
    }
    
    // 사용하지 않는 DOM 요소 정리
    this.cleanupUnusedElements();
  },
  
  // 사용하지 않는 DOM 요소 정리
  cleanupUnusedElements: function() {
    // 화면에 보이지 않는 오래된 요소들 정리
    setInterval(() => {
      const hiddenElements = document.querySelectorAll('[style*="display: none"]');
      hiddenElements.forEach(el => {
        if (el.dataset.cleanup !== 'keep') {
          // 오래된 숨겨진 요소 제거 (실제로는 더 정교한 로직 필요)
        }
      });
    }, 300000); // 5분마다
  },
  
  // 배터리 상태 고려 최적화
  optimizeForBattery: function() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        this.handleBatteryStatus(battery);
        
        // 배터리 상태 변경 시 재최적화
        battery.addEventListener('levelchange', () => {
          this.handleBatteryStatus(battery);
        });
        
        battery.addEventListener('chargingchange', () => {
          this.handleBatteryStatus(battery);
        });
      });
    }
  },
  
  // 배터리 상태 처리
  handleBatteryStatus: function(battery) {
    const level = battery.level;
    const charging = battery.charging;
    
    console.log(`배터리: ${Math.round(level * 100)}%, 충전 중: ${charging}`);
    
    // 배터리가 낮고 충전 중이 아닐 때 절전 모드
    if (level < 0.2 && !charging) {
      this.enablePowerSavingMode();
    } else {
      this.disablePowerSavingMode();
    }
  },
  
  // 절전 모드 활성화
  enablePowerSavingMode: function() {
    document.body.classList.add('power-saving-mode');
    
    // CPU 집약적 작업 감소
    this.reduceAnimations();
    this.reducePollingFrequency();
    
    console.log('절전 모드 활성화');
  },
  
  // 절전 모드 비활성화
  disablePowerSavingMode: function() {
    document.body.classList.remove('power-saving-mode');
    
    // 원래 설정 복원
    this.restoreAnimations();
    this.restorePollingFrequency();
    
    console.log('절전 모드 비활성화');
  },
  
  // 애니메이션 감소
  reduceAnimations: function() {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
  },
  
  // 애니메이션 복원
  restoreAnimations: function() {
    document.documentElement.style.removeProperty('--animation-duration');
  },
  
  // 폴링 빈도 감소
  reducePollingFrequency: function() {
    // 실제 구현에서는 각종 타이머 간격 조정
    console.log('폴링 빈도 감소');
  },
  
  // 폴링 빈도 복원
  restorePollingFrequency: function() {
    console.log('폴링 빈도 복원');
  },
  
  // 알림 표시
  showNotification: function(message, type = 'info') {
    // 간단한 토스트 알림 구현
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  },
  
  // 성능 메트릭 수집
  collectMetrics: function() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const metrics = {
        navigation: performance.getEntriesByType('navigation')[0],
        paint: performance.getEntriesByType('paint'),
        resource: performance.getEntriesByType('resource'),
        memory: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null
      };
      
      return metrics;
    }
    
    return null;
  }
};

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .lazy-loading {
    background: #f0f0f0;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .lazy-loading::before {
    content: "🌱";
    font-size: 2rem;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  .loaded {
    transition: opacity 0.3s ease;
  }
  
  /* 데이터 절약 모드 스타일 */
  .data-saving-mode img {
    filter: contrast(0.8) brightness(0.9);
  }
  
  /* 절전 모드 스타일 */
  .power-saving-mode * {
    animation-duration: 0.1s !important;
    transition-duration: 0.1s !important;
  }
`;
document.head.appendChild(style);

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  Performance.init();
});

// 전역 객체로 내보내기
window.Performance = Performance;
