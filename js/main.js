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