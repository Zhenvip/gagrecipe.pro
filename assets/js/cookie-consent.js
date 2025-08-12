/**
 * Cookie Consent Banner
 * GDPR 및 개인정보보호법 준수를 위한 쿠키 동의 관리
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'gag-cookie-consent';
        this.cookieExpiry = 365; // 1년
        this.consentTypes = {
            necessary: true,  // 필수 쿠키는 항상 허용
            analytics: false,
            advertising: false
        };
        
        this.init();
    }

    init() {
        // 이미 동의했는지 확인
        if (this.hasConsent()) {
            this.loadConsentedServices();
            return;
        }

        // 동의 배너 표시
        this.showConsentBanner();
    }

    hasConsent() {
        const consent = this.getCookie(this.cookieName);
        return consent !== null;
    }

    showConsentBanner() {
        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // 애니메이션으로 표시
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h4>🍪 쿠키 사용 안내</h4>
                    <p>
                        저희 웹사이트는 사용자 경험 개선과 웹사이트 분석을 위해 쿠키를 사용합니다. 
                        필수 쿠키는 웹사이트 기능을 위해 필요하며, 선택적 쿠키는 분석 및 광고 목적으로 사용됩니다.
                    </p>
                    <div class="cookie-consent-details">
                        <a href="privacy-policy.html" target="_blank">개인정보처리방침</a>에서 자세한 내용을 확인하실 수 있습니다.
                    </div>
                </div>
                <div class="cookie-consent-actions">
                    <button class="btn-consent btn-accept-all" onclick="cookieConsent.acceptAll()">
                        모두 허용
                    </button>
                    <button class="btn-consent btn-accept-necessary" onclick="cookieConsent.acceptNecessaryOnly()">
                        필수만 허용
                    </button>
                    <button class="btn-consent btn-customize" onclick="cookieConsent.showCustomize()">
                        설정하기
                    </button>
                </div>
            </div>
            <div class="cookie-consent-customize" style="display: none;">
                <div class="cookie-categories">
                    <div class="cookie-category">
                        <div class="category-header">
                            <input type="checkbox" id="necessary" checked disabled>
                            <label for="necessary">
                                <strong>필수 쿠키</strong>
                                <span class="category-desc">웹사이트 기본 기능을 위해 필요합니다</span>
                            </label>
                        </div>
                        <div class="category-details">
                            테마 설정, 언어 선택, 세션 관리 등
                        </div>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="category-header">
                            <input type="checkbox" id="analytics">
                            <label for="analytics">
                                <strong>분석 쿠키</strong>
                                <span class="category-desc">웹사이트 사용 통계를 수집합니다</span>
                            </label>
                        </div>
                        <div class="category-details">
                            Google Analytics를 통한 방문자 수, 페이지뷰, 사용자 행동 분석
                        </div>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="category-header">
                            <input type="checkbox" id="advertising">
                            <label for="advertising">
                                <strong>광고 쿠키</strong>
                                <span class="category-desc">맞춤형 광고를 제공합니다</span>
                            </label>
                        </div>
                        <div class="category-details">
                            Google AdSense를 통한 관심사 기반 광고, 광고 효과 측정
                        </div>
                    </div>
                </div>
                
                <div class="customize-actions">
                    <button class="btn-consent btn-save-preferences" onclick="cookieConsent.savePreferences()">
                        선택사항 저장
                    </button>
                    <button class="btn-consent btn-back" onclick="cookieConsent.hideCustomize()">
                        돌아가기
                    </button>
                </div>
            </div>
        `;
        
        return banner;
    }

    showCustomize() {
        const banner = document.querySelector('.cookie-consent-banner');
        const content = banner.querySelector('.cookie-consent-content');
        const customize = banner.querySelector('.cookie-consent-customize');
        
        content.style.display = 'none';
        customize.style.display = 'block';
    }

    hideCustomize() {
        const banner = document.querySelector('.cookie-consent-banner');
        const content = banner.querySelector('.cookie-consent-content');
        const customize = banner.querySelector('.cookie-consent-customize');
        
        customize.style.display = 'none';
        content.style.display = 'block';
    }

    acceptAll() {
        this.consentTypes.analytics = true;
        this.consentTypes.advertising = true;
        this.saveConsent();
        this.loadConsentedServices();
        this.hideBanner();
    }

    acceptNecessaryOnly() {
        this.consentTypes.analytics = false;
        this.consentTypes.advertising = false;
        this.saveConsent();
        this.loadConsentedServices();
        this.hideBanner();
    }

    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics');
        const advertisingCheckbox = document.getElementById('advertising');
        
        this.consentTypes.analytics = analyticsCheckbox.checked;
        this.consentTypes.advertising = advertisingCheckbox.checked;
        
        this.saveConsent();
        this.loadConsentedServices();
        this.hideBanner();
    }

    saveConsent() {
        const consentData = {
            timestamp: new Date().toISOString(),
            consents: this.consentTypes,
            version: '1.0'
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consentData), this.cookieExpiry);
    }

    loadConsentedServices() {
        const consent = this.getStoredConsent();
        
        if (consent) {
            // Google Analytics 로드
            if (consent.consents.analytics) {
                this.loadGoogleAnalytics();
            }
            
            // Google AdSense 로드
            if (consent.consents.advertising) {
                this.loadGoogleAdSense();
            }
        }
    }

    loadGoogleAnalytics() {
        // Google Analytics 스크립트 로드
        if (!window.gtag) {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script1);
            
            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'GA_MEASUREMENT_ID');
            `;
            document.head.appendChild(script2);
        }
    }

    loadGoogleAdSense() {
        // Google AdSense 스크립트 로드
        if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }
    }

    hideBanner() {
        const banner = document.querySelector('.cookie-consent-banner');
        if (banner) {
            banner.classList.add('hide');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    getStoredConsent() {
        const consent = this.getCookie(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    // 쿠키 관리 함수들
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // 사용자가 설정을 변경할 수 있는 함수
    showSettings() {
        if (this.hasConsent()) {
            const consent = this.getStoredConsent();
            this.consentTypes = consent.consents;
        }
        this.showConsentBanner();
        this.showCustomize();
    }

    // 모든 쿠키 삭제 (GDPR 권리 행사)
    revokeConsent() {
        // 동의 쿠키 삭제
        this.setCookie(this.cookieName, '', -1);
        
        // Google Analytics 쿠키 삭제
        const gaCookies = ['_ga', '_ga_', '_gid', '_gat'];
        gaCookies.forEach(cookie => {
            this.setCookie(cookie, '', -1);
            this.setCookie(cookie, '', -1, '.' + window.location.hostname);
        });
        
        // 페이지 새로고침
        window.location.reload();
    }
}

// 전역 인스턴스 생성
const cookieConsent = new CookieConsent();

// 설정 버튼을 위한 전역 함수
window.showCookieSettings = () => cookieConsent.showSettings();
window.revokeCookieConsent = () => cookieConsent.revokeConsent();
