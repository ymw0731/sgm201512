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