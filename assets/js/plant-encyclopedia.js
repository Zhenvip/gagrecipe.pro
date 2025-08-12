/* 식물 도감 페이지 전용 JavaScript */

// ===== 식물 도감 관리 시스템 =====
const PlantEncyclopedia = {
  // 현재 필터 상태
  currentFilter: {
    category: 'all',
    level: 'all',
    sort: 'name'
  },
  
  // 모든 식물 카드 요소
  plantCards: [],
  
  // 초기화
  init: function() {
    console.log('식물 도감 시스템 초기화 중...');
    
    // 식물 카드들 수집
    this.plantCards = Array.from(document.querySelectorAll('.plant-card'));
    
    // 이벤트 리스너 설정
    this.setupEventListeners();
    
    // 초기 표시
    this.applyFilters();
    
    console.log(`총 ${this.plantCards.length}개의 식물이 로드되었습니다.`);
  },
  
  // 이벤트 리스너 설정
  setupEventListeners: function() {
    // 카테고리 탭 클릭
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.handleCategoryChange(e.target.dataset.category);
      });
    });
    
    // 정렬 선택 변경
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.handleSortChange(e.target.value);
      });
    }
    
    // 레벨 필터 변경
    const levelFilter = document.getElementById('level-filter');
    if (levelFilter) {
      levelFilter.addEventListener('change', (e) => {
        this.handleLevelChange(e.target.value);
      });
    }
    
    // 검색 기능
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.handleSearch(e.target.value);
        }, 300);
      });
    }
    
    // 식물 카드 클릭 시 상세 정보 토글
    this.plantCards.forEach(card => {
      const header = card.querySelector('.plant-header');
      if (header) {
        header.addEventListener('click', () => {
          this.togglePlantDetails(card);
        });
        header.style.cursor = 'pointer';
      }
    });
  },
  
  // 카테고리 변경 처리
  handleCategoryChange: function(category) {
    // 활성 탭 업데이트
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // 필터 상태 업데이트
    this.currentFilter.category = category;
    
    // 필터 적용
    this.applyFilters();
    
    // 통계 업데이트
    this.updateStatistics();
  },
  
  // 정렬 변경 처리
  handleSortChange: function(sortType) {
    this.currentFilter.sort = sortType;
    this.applyFilters();
  },
  
  // 레벨 필터 변경 처리
  handleLevelChange: function(levelRange) {
    this.currentFilter.level = levelRange;
    this.applyFilters();
  },
  
  // 검색 처리
  handleSearch: function(query) {
    const searchTerm = query.toLowerCase().trim();
    
    this.plantCards.forEach(card => {
      const plantName = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('.plant-description').textContent.toLowerCase();
      const tips = card.querySelector('.plant-tips').textContent.toLowerCase();
      
      const matches = plantName.includes(searchTerm) || 
                     description.includes(searchTerm) || 
                     tips.includes(searchTerm);
      
      if (searchTerm === '' || matches) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    this.updateStatistics();
  },
  
  // 필터 적용
  applyFilters: function() {
    let visibleCount = 0;
    
    this.plantCards.forEach(card => {
      let shouldShow = true;
      
      // 카테고리 필터
      if (this.currentFilter.category !== 'all') {
        const cardCategory = card.dataset.category;
        if (cardCategory !== this.currentFilter.category) {
          shouldShow = false;
        }
      }
      
      // 레벨 필터
      if (this.currentFilter.level !== 'all') {
        const cardLevel = parseInt(card.dataset.level);
        const levelRange = this.currentFilter.level;
        
        if (levelRange === '1-5' && (cardLevel < 1 || cardLevel > 5)) shouldShow = false;
        if (levelRange === '6-15' && (cardLevel < 6 || cardLevel > 15)) shouldShow = false;
        if (levelRange === '16-30' && (cardLevel < 16 || cardLevel > 30)) shouldShow = false;
        if (levelRange === '30+' && cardLevel < 30) shouldShow = false;
      }
      
      // 표시/숨김 적용
      if (shouldShow) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // 정렬 적용
    this.applySorting();
    
    // 애니메이션 효과
    this.animateCards();
    
    console.log(`필터 적용 완료: ${visibleCount}개 식물 표시`);
  },
  
  // 정렬 적용
  applySorting: function() {
    const container = document.getElementById('plants-container');
    const visibleCards = this.plantCards.filter(card => card.style.display !== 'none');
    
    visibleCards.sort((a, b) => {
      switch (this.currentFilter.sort) {
        case 'name':
          const nameA = a.querySelector('h3').textContent;
          const nameB = b.querySelector('h3').textContent;
          return nameA.localeCompare(nameB, 'ko');
          
        case 'price-low':
          return parseInt(a.dataset.price) - parseInt(b.dataset.price);
          
        case 'price-high':
          return parseInt(b.dataset.price) - parseInt(a.dataset.price);
          
        case 'time-fast':
          return parseInt(a.dataset.time) - parseInt(b.dataset.time);
          
        case 'profit-high':
          return parseInt(b.dataset.profit) - parseInt(a.dataset.profit);
          
        default:
          return 0;
      }
    });
    
    // DOM 재배열
    visibleCards.forEach(card => {
      container.appendChild(card);
    });
  },
  
  // 카드 애니메이션
  animateCards: function() {
    const visibleCards = this.plantCards.filter(card => card.style.display !== 'none');
    
    visibleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  },
  
  // 식물 상세 정보 토글
  togglePlantDetails: function(card) {
    const tips = card.querySelector('.plant-tips');
    const description = card.querySelector('.plant-description');
    
    if (tips.style.display === 'none') {
      tips.style.display = 'block';
      description.style.display = 'block';
      card.classList.add('expanded');
    } else {
      tips.style.display = 'none';
      description.style.display = 'none';
      card.classList.remove('expanded');
    }
  },
  
  // 통계 업데이트
  updateStatistics: function() {
    const visibleCards = this.plantCards.filter(card => card.style.display !== 'none');
    const totalPlants = this.plantCards.length;
    
    // 통계 정보 표시 (필요시 DOM 요소 생성)
    this.updateStatsDisplay(visibleCards.length, totalPlants);
  },
  
  // 통계 표시 업데이트
  updateStatsDisplay: function(visible, total) {
    let statsElement = document.querySelector('.plants-stats');
    
    if (!statsElement) {
      statsElement = document.createElement('div');
      statsElement.className = 'plants-stats';
      statsElement.style.cssText = `
        text-align: center;
        margin: var(--spacing-md) 0;
        padding: var(--spacing-sm);
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        color: var(--text-muted);
      `;
      
      const container = document.querySelector('.container');
      const plantsGrid = document.getElementById('plants-container');
      container.insertBefore(statsElement, plantsGrid);
    }
    
    statsElement.innerHTML = `
      표시 중: <strong>${visible}개</strong> / 전체: <strong>${total}개</strong> 식물
    `;
  },
  
  // 즐겨찾기 기능 (로컬 스토리지 사용)
  toggleFavorite: function(plantName) {
    let favorites = JSON.parse(localStorage.getItem('plant-favorites') || '[]');
    
    if (favorites.includes(plantName)) {
      favorites = favorites.filter(name => name !== plantName);
    } else {
      favorites.push(plantName);
    }
    
    localStorage.setItem('plant-favorites', JSON.stringify(favorites));
    this.updateFavoriteButtons();
  },
  
  // 즐겨찾기 버튼 업데이트
  updateFavoriteButtons: function() {
    const favorites = JSON.parse(localStorage.getItem('plant-favorites') || '[]');
    
    this.plantCards.forEach(card => {
      const plantName = card.querySelector('h3').textContent;
      let favoriteBtn = card.querySelector('.favorite-btn');
      
      if (!favoriteBtn) {
        favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        `;
        favoriteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFavorite(plantName);
        });
        
        card.style.position = 'relative';
        card.appendChild(favoriteBtn);
      }
      
      favoriteBtn.textContent = favorites.includes(plantName) ? '❤️' : '🤍';
      favoriteBtn.title = favorites.includes(plantName) ? '즐겨찾기 해제' : '즐겨찾기 추가';
    });
  },
  
  // 수익률 계산기
  calculateProfit: function(seedPrice, sellPrice, quantity = 1, fertilizer = false) {
    const totalInvestment = seedPrice * quantity + (fertilizer ? 10 * quantity : 0);
    const totalRevenue = sellPrice * quantity;
    const profit = totalRevenue - totalInvestment;
    const profitRate = ((profit / totalInvestment) * 100).toFixed(1);
    
    return {
      investment: totalInvestment,
      revenue: totalRevenue,
      profit: profit,
      profitRate: profitRate
    };
  }
};

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 식물 도감 페이지인지 확인
  if (document.querySelector('.plants-grid')) {
    PlantEncyclopedia.init();
    
    // 즐겨찾기 버튼 초기화
    setTimeout(() => {
      PlantEncyclopedia.updateFavoriteButtons();
    }, 500);
  }
});

// 전역 함수로 내보내기 (디버깅용)
window.PlantEncyclopedia = PlantEncyclopedia;
