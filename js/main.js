/* ====================================
   햄버거 메뉴 스크립트
   ==================================== */
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

/* ====================================
   스크롤 애니메이션 스크립트
   ==================================== */
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});
animatedElements.forEach(element => {
    observer.observe(element);
});

/* ====================================
   폼 유효성 검사 스크립트
   ==================================== */
const quoteForm = document.querySelector('.quote-form');

if (quoteForm) {
    const companyInput = document.getElementById('company');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const detailsInput = document.getElementById('details');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    quoteForm.addEventListener('submit', function(event) {
        let isValid = true;

        function showError(input, message) {
            const errorDiv = input.nextElementSibling;
            input.classList.add('input-error');
            errorDiv.textContent = message;
            errorDiv.classList.add('visible');
            isValid = false;
        }
        function hideError(input) {
            const errorDiv = input.nextElementSibling;
            input.classList.remove('input-error');
            errorDiv.classList.remove('visible');
        }

        if (companyInput.value.trim() === '') {
            showError(companyInput, '회사명을 입력해주세요.');
        } else {
            hideError(companyInput);
        }

        if (nameInput.value.trim() === '') {
            showError(nameInput, '담당자 이름을 입력해주세요.');
        } else {
            hideError(nameInput);
        }
        
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, '올바른 이메일 주소를 입력해주세요.');
        } else {
            hideError(emailInput);
        }

        if (phoneInput.value.trim() === '') {
            showError(phoneInput, '연락처를 입력해주세요.');
        } else {
            hideError(phoneInput);
        }

        if (detailsInput.value.trim() === '') {
            showError(detailsInput, '상세 문의 내용을 입력해주세요.');
        } else {
            hideError(detailsInput);
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}

/* ====================================
   쿠키 정책 동의 배너 스크립트
   ==================================== */
document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.getElementById('cookie-consent-banner');
    const agreeButton = document.getElementById('cookie-consent-agree');

    // 1. 사용자가 이미 동의했는지 확인
    // 브라우저의 localStorage에 'cookieConsent' 값이 'agreed'로 저장되어 있는지 봅니다.
    if (localStorage.getItem('cookieConsent') === 'agreed') {
        // 이미 동의했다면, 배너에 'hidden' 클래스를 추가해 바로 숨깁니다.
        consentBanner.classList.add('hidden');
    }

    // 2. '동의하고 닫기' 버튼을 클릭했을 때의 동작 설정
    agreeButton.addEventListener('click', () => {
        // 배너에 'hidden' 클래스를 추가해 아래로 사라지는 애니메이션을 실행합니다.
        consentBanner.classList.add('hidden');
        
        // 사용자의 동의 선택을 브라우저에 저장합니다.
        // 이렇게 하면 다음 방문 시에는 1번 조건문에 걸려 배너가 나타나지 않습니다.
        localStorage.setItem('cookieConsent', 'agreed');
    });
});

/* ====================================
   GSAP 애니메이션 스크립트
   ==================================== */

// GSAP 플러그인 등록 (스크롤트리거를 사용하기 위해 필수)
gsap.registerPlugin(ScrollTrigger);

// 1. 첫 화면 히어로 텍스트 애니메이션
const heroText = document.querySelector('.hero-text h1');

// 텍스트를 한 글자씩 <span>으로 감싸주는 작업
if (heroText) {
    const heroTextChars = heroText.textContent.split('');
    heroText.innerHTML = heroTextChars.map(char => `<span>${char}</span>`).join('');
    
    // GSAP 애니메이션 적용
    gsap.fromTo(heroText.querySelectorAll('span'), 
        { opacity: 0, y: 50 }, // 시작 상태 (투명하고, 50px 아래에)
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, // 애니메이션 지속 시간
            ease: 'power3.out', // 애니메이션 효과
            stagger: 0.05, // 각 글자 사이의 지연 시간
            scrollTrigger: {
                trigger: '.hero',
                start: 'top center', // .hero 섹션이 화면 중앙에 오면 시작
                toggleActions: 'play none none none'
            }
        }
    );
}

// 2. 스크롤 연동 카드 애니메이션
gsap.from('.service-item', {
    scrollTrigger: {
        trigger: '.services', // .services 섹션이 트리거
        start: 'top 80%', // 섹션의 상단이 뷰포트 80% 지점에 닿으면 시작
        toggleActions: 'play none none none'
    },
    opacity: 0, // 처음엔 투명
    y: 50, // 50px 아래에서 시작
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3 // 0.3초 간격으로 순차적으로 나타남
});

/* ====================================
   Contentful (Headless CMS) 연동 스크립트 (수정본)
   ==================================== */

if (document.querySelector('.news-list')) {
    const newsListContainer = document.querySelector('.news-list');

    const SPACE_ID = '여러분의 Space ID';
    const ACCESS_TOKEN = '여러분의 Access Token';
    const contentType = 'newsPost'; // 1번 단계에서 확인한 정확한 API ID를 입력하세요.

    const url = `https://cdn.contentful.com/spaces/${'fj5xjtw9kg54'}/environments/master/entries?access_token=${'mCAOJhe52y_OJs6yvjd4xav_lglNodtmtjPZdg4X8s0'}&content_type=${'newsPost'}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            newsListContainer.innerHTML = '';

            if (!data.items || data.items.length === 0) {
                newsListContainer.innerHTML = '<p>아직 등록된 새소식이 없습니다.</p>';
                return;
            }

            data.items.forEach(item => {
                const fields = item.fields;

                const date = new Date(fields.publishedDate);
                const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

                let summary = '본문 요약이 없습니다.';
                if (fields.content && fields.content.content && fields.content.content[0] && fields.content.content[0].content && fields.content.content[0].content[0]) {
                    summary = fields.content.content[0].content[0].value.substring(0, 100) + '...';
                }

                const article = document.createElement('article');
                article.classList.add('news-item', 'animate-on-scroll');

                article.innerHTML = `
                    <p class="news-date">${formattedDate}</p>
                    <h2><a href="#">${fields.title}</a></h2>
                    <p>${summary}</p> 
                `;

                newsListContainer.appendChild(article);
            });

            ScrollTrigger.refresh();
        })
        .catch(error => {
            console.error('콘텐츠를 불러오는 데 실패했습니다:', error);
            newsListContainer.innerHTML = '<p>새소식을 불러오는 데 문제가 발생했습니다. (API ID 또는 키를 확인해주세요)</p>';
        });
}