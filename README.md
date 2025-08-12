# 로블록스 그로우 어 가든 가이드 웹사이트

한국어 사용자를 위한 Roblox Grow a Garden 게임 완벽 가이드 웹사이트입니다.

## 🌟 주요 기능

- **완전한 한국어 지원** - 모든 콘텐츠가 한국어로 작성
- **반응형 디자인** - 모바일, 태블릿, 데스크톱 모두 지원
- **SEO 최적화** - 검색엔진 친화적 구조
- **AdSense 통합** - 수익화를 위한 광고 시스템
- **다크/라이트 테마** - 사용자 선호에 따른 테마 선택
- **실시간 검색** - JavaScript 기반 페이지 내 검색

## 📁 프로젝트 구조

```
gagrecipe.pro/
├── index.html                 # 홈페이지
├── beginner-guide.html        # 초보자 가이드
├── plant-encyclopedia.html    # 식물 도감
├── items-tools.html          # 아이템 & 도구
├── tips-strategies.html      # 팁 & 전략
├── updates-news.html         # 업데이트 & 뉴스
├── assets/
│   ├── css/
│   │   ├── main.css          # 주요 스타일시트
│   │   └── responsive.css    # 반응형 스타일
│   ├── js/
│   │   └── main.js          # 메인 JavaScript
│   ├── images/              # 이미지 리소스
│   └── fonts/               # 폰트 파일
├── sitemap.xml              # SEO 사이트맵
├── robots.txt               # 검색엔진 크롤링 규칙
└── ads.txt                  # AdSense 설정
```

## 🎯 페이지 구성

### 1. 홈페이지 (/)
- 웹사이트 소개 및 네비게이션
- 빠른 접근 카드
- 인기 콘텐츠 및 최신 업데이트

### 2. 초보자 가이드 (/beginner-guide.html)
- 게임 시작 방법
- 기본 조작법
- 첫 농장 만들기
- 자주 묻는 질문

### 3. 식물 도감 (/plant-encyclopedia.html)
- 모든 식물 정보
- 카테고리별 분류
- 수익률 및 성장 시간

### 4. 아이템 & 도구 (/items-tools.html)
- 게임 내 모든 도구
- 사용법 및 효과
- 구매 우선순위

### 5. 팁 & 전략 (/tips-strategies.html)
- 고급 전략 가이드
- 효율성 팁
- 농장 최적화 방법

### 6. 업데이트 & 뉴스 (/updates-news.html)
- 최신 게임 업데이트
- 새로운 기능 소개
- 예정된 이벤트

## 🛠️ 기술 스택

- **HTML5** - 시맨틱 마크업
- **CSS3** - 모던 스타일링 (CSS Grid, Flexbox)
- **JavaScript (ES6+)** - 인터랙티브 기능
- **Google Fonts** - 한국어 폰트 지원
- **AdSense** - 광고 수익화

## 📱 반응형 지원

- **모바일** (0-767px): 터치 최적화 UI
- **태블릿** (768-991px): 중간 화면 최적화
- **데스크톱** (992px+): 전체 기능 지원

## 🚀 배포 방법

### 1. 정적 호스팅 (추천)
- **Netlify**: `netlify deploy --prod`
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Repository 설정에서 Pages 활성화

### 2. 전통적 웹 호스팅
- FTP를 통해 모든 파일 업로드
- 도메인 연결 및 DNS 설정

## 🔧 설정 방법

### AdSense 설정
1. `index.html` 및 다른 HTML 파일에서 `ca-pub-XXXXXXXXXX` 교체
2. `ads.txt` 파일에 AdSense 정보 업데이트

### Google Analytics 설정
1. 각 HTML 파일의 `GA_TRACKING_ID` 교체
2. 추적 코드 활성화

### 도메인 설정
1. `sitemap.xml`에서 `https://gagrecipe.pro/` URL 교체
2. 모든 canonical URL 업데이트

## 🎨 커스터마이징

### 색상 테마 변경
`assets/css/main.css`의 CSS 변수 수정:
```css
:root {
  --primary-color: #00A2FF;    /* 주요 색상 */
  --secondary-color: #4CAF50;  /* 보조 색상 */
  --accent-color: #FF6B35;     /* 강조 색상 */
}
```

### 폰트 변경
Google Fonts에서 원하는 폰트 선택 후 CSS import 교체

## 📈 SEO 최적화

- ✅ 메타 태그 최적화
- ✅ Open Graph 설정
- ✅ 구조화된 데이터 (Schema.org)
- ✅ XML 사이트맵
- ✅ robots.txt 설정
- ✅ 페이지 로딩 속도 최적화

## 🔍 주요 키워드

- 로블록스 그로우 어 가든
- Roblox Grow a Garden 가이드
- 로블록스 정원 가꾸기
- 그로우 어 가든 공략
- 로블록스 게임 팁

## 📞 지원

문제가 발생하거나 개선 사항이 있으시면 이슈를 생성해 주세요.

## 📄 라이선스

이 프로젝트는 개인 및 상업적 용도로 자유롭게 사용할 수 있습니다.
Roblox Corporation과는 공식적으로 연관되어 있지 않습니다.

---

**제작일**: 2024년 1월  
**버전**: 1.0.0  
**언어**: 한국어 (Korean)
