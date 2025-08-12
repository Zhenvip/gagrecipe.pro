# 🚀 배포 가이드

로블록스 그로우 어 가든 한국어 웹사이트 배포를 위한 완벽한 가이드입니다.

## 📋 배포 전 체크리스트

### 1. AdSense 설정
모든 HTML 파일에서 다음 항목들을 실제 값으로 교체하세요:

```html
<!-- 교체 필요 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"></script>
<ins class="adsbygoogle" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX"></ins>
```

**파일 목록:**
- `index.html`
- `beginner-guide.html`
- `plant-encyclopedia.html`
- `items-tools.html`
- `tips-strategies.html`
- `updates-news.html`

### 2. Google Analytics 설정
모든 HTML 파일에서 `GA_TRACKING_ID`를 실제 추적 ID로 교체:

```html
<!-- 교체 필요 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 3. 도메인 설정
다음 파일들에서 도메인을 실제 도메인으로 교체:

**`sitemap.xml`:**
```xml
<!-- https://gagrecipe.pro/ → 실제 도메인으로 교체 -->
<loc>https://your-domain.com/</loc>
```

**모든 HTML 파일의 메타 태그:**
```html
<!-- 교체 필요 -->
<meta property="og:url" content="https://your-domain.com/">
<meta property="twitter:url" content="https://your-domain.com/">
```

## 🌐 배포 방법

### 방법 1: Netlify (추천)

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/gagrecipe-pro.git
   git push -u origin main
   ```

2. **Netlify 배포**
   - [Netlify](https://netlify.com)에 로그인
   - "New site from Git" 선택
   - GitHub 저장소 연결
   - 빌드 설정은 `netlify.toml`에서 자동 처리됨

3. **도메인 연결**
   - Netlify 대시보드에서 "Domain settings"
   - 커스텀 도메인 추가
   - DNS 설정 (A 레코드 또는 CNAME)

### 방법 2: Vercel

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **배포**
   ```bash
   vercel
   ```

3. **설정**
   - `vercel.json` 파일이 자동으로 설정 적용
   - 도메인은 Vercel 대시보드에서 설정

### 방법 3: GitHub Pages

1. **저장소 설정**
   - 저장소를 public으로 설정
   - Settings → Pages에서 활성화

2. **배포**
   - `main` 브랜치에서 자동 배포
   - 도메인: `username.github.io/gagrecipe-pro`

### 방법 4: 전통적 웹 호스팅

1. **FTP 업로드**
   - 모든 파일을 웹 서버의 public_html 폴더에 업로드
   - 파일 권한 설정 (644)

2. **서버 설정**
   - `.htaccess` 파일 생성 (Apache):
   ```apache
   # Gzip 압축
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/plain
     AddOutputFilterByType DEFLATE text/html
     AddOutputFilterByType DEFLATE text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE application/xml
     AddOutputFilterByType DEFLATE application/xhtml+xml
     AddOutputFilterByType DEFLATE application/rss+xml
     AddOutputFilterByType DEFLATE application/javascript
     AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>

   # 캐시 설정
   <IfModule mod_expires.c>
     ExpiresActive on
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
   </IfModule>

   # 404 에러 페이지
   ErrorDocument 404 /404.html
   ```

## 🔧 배포 후 설정

### 1. Search Console 등록
- [Google Search Console](https://search.google.com/search-console)
- 사이트 소유권 확인
- `sitemap.xml` 제출

### 2. AdSense 승인 신청
- AdSense 계정에서 사이트 추가
- 승인 대기 (보통 1-2주)
- 승인 후 광고 활성화

### 3. 성능 모니터링
- Google Analytics 대시보드 확인
- Core Web Vitals 점수 확인
- 페이지 로딩 속도 최적화

### 4. SEO 최적화
- 메타 태그 최적화
- 내부 링크 구조 점검
- 컨텐츠 정기 업데이트

## 📊 성능 최적화

### 이미지 최적화
```bash
# ImageOptim, TinyPNG 등 사용
# WebP 포맷으로 변환 권장
```

### CSS/JS 압축
```bash
# 온라인 도구 사용:
# - CSS Minifier
# - JavaScript Minifier
```

### CDN 설정
- Cloudflare 무료 CDN 사용 권장
- 전 세계 캐시 서버를 통한 빠른 로딩

## 🔍 SEO 체크리스트

- [ ] 모든 페이지에 고유한 title 태그
- [ ] Meta description 작성 (160자 이내)
- [ ] Open Graph 태그 설정
- [ ] 구조화된 데이터 (Schema.org) 적용
- [ ] XML 사이트맵 생성 및 제출
- [ ] robots.txt 설정
- [ ] 내부 링크 최적화
- [ ] 이미지 alt 속성 추가
- [ ] 페이지 로딩 속도 최적화 (3초 이내)
- [ ] 모바일 친화적 디자인
- [ ] HTTPS 적용

## 🚨 문제 해결

### 일반적인 문제들

1. **AdSense 승인 거부**
   - 콘텐츠 품질 향상
   - 개인정보처리방침 페이지 추가
   - 충분한 트래픽 확보 후 재신청

2. **페이지 로딩 느림**
   - 이미지 압축 및 WebP 변환
   - CSS/JS 파일 압축
   - CDN 사용

3. **검색엔진 노출 안됨**
   - Search Console에서 색인 요청
   - 사이트맵 재제출
   - 백링크 구축

4. **모바일 최적화 문제**
   - 반응형 디자인 점검
   - 터치 요소 크기 조정
   - 폰트 크기 최적화

## 📈 마케팅 전략

### 1. 콘텐츠 마케팅
- 정기적인 게임 업데이트 포스팅
- 사용자 가이드 동영상 제작
- 커뮤니티 참여 및 소통

### 2. 소셜 미디어
- 유튜브 채널 개설
- 디스코드 커뮤니티 운영
- 트위터/인스타그램 계정

### 3. SEO 전략
- 롱테일 키워드 타겟팅
- 백링크 구축
- 게스트 포스팅

## 📞 지원

문제가 발생하거나 도움이 필요한 경우:
- GitHub Issues 생성
- 개발자 문서 참조
- 커뮤니티 포럼 활용

---

**성공적인 배포를 위해 이 가이드를 단계별로 따라해 주세요! 🌱**
