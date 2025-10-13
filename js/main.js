// 1. HTML에서 필요한 요소들을 선택해서 변수에 담습니다.
const hamburger = document.querySelector('.hamburger-menu'); // 햄버거 메뉴 아이콘
const navMenu = document.querySelector('nav');               // 내비게이션 메뉴

// 2. 햄버거 아이콘을 'click'했을 때, 실행될 함수를 정의합니다.
hamburger.addEventListener('click', () => {
    // navMenu 요소에 'nav-active' 라는 클래스를 추가하거나 제거합니다.
    // 이 클래스가 추가되면 CSS에 의해 메뉴가 보이게 되고, 제거되면 사라집니다.
    navMenu.classList.toggle('nav-active');
});

/* ====================================
   스크롤 애니메이션 스크립트
   ==================================== */

// 1. 애니메이션을 적용할 모든 요소를 선택합니다.
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// 2. Intersection Observer 생성
// 이 Observer는 감시할 요소가 화면에 들어오거나 나갈 때 특정 동작을 실행합니다.
const observer = new IntersectionObserver((entries) => {
    // entries는 화면에 보이거나 사라지는 모든 요소의 배열입니다.
    entries.forEach(entry => {
        // isIntersecting 속성은 요소가 화면에 보이는지 여부를 알려줍니다. (true/false)
        if (entry.isIntersecting) {
            // 화면에 보이면 'visible' 클래스를 추가하여 CSS 애니메이션을 발동시킵니다.
            entry.target.classList.add('visible');
            // 한번 애니메이션이 실행된 요소는 더 이상 감시할 필요가 없으므로 감시를 중지합니다.
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // 요소가 10% 정도 보였을 때 애니메이션을 실행합니다.
});

// 3. 위에서 선택한 모든 요소(animatedElements)에 대해 감시를 시작합니다.
animatedElements.forEach(element => {
    observer.observe(element);
});

/* ====================================
   폼 유효성 검사 스크립트
   ==================================== */

// 견적 문의 폼이 있는 페이지에서만 이 코드가 실행되도록 합니다.
const quoteForm = document.querySelector('.quote-form');

if (quoteForm) {
    // 폼과 각 입력 필드, 에러 메시지 공간을 변수로 지정
    const companyInput = document.getElementById('company');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const detailsInput = document.getElementById('details');

    // 이메일 형식을 검사하는 정규 표현식 (일종의 마법 주문)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // '제출(submit)' 이벤트가 발생했을 때 실행될 함수
    quoteForm.addEventListener('submit', function(event) {
        let isValid = true; // 폼이 유효한지 여부를 저장하는 변수

        // 헬퍼 함수: 에러를 보여주거나 숨기는 역할
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

        // --- 각 필드 검사 시작 ---

        // 회사명 검사 (비어있는지 확인)
        if (companyInput.value.trim() === '') {
            showError(companyInput, '회사명을 입력해주세요.');
        } else {
            hideError(companyInput);
        }

        // 담당자 이름 검사 (비어있는지 확인)
        if (nameInput.value.trim() === '') {
            showError(nameInput, '담당자 이름을 입력해주세요.');
        } else {
            hideError(nameInput);
        }
        
        // 이메일 검사 (형식이 맞는지 확인)
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, '올바른 이메일 주소를 입력해주세요.');
        } else {
            hideError(emailInput);
        }

        // 연락처 검사 (비어있는지 확인)
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, '연락처를 입력해주세요.');
        } else {
            hideError(phoneInput);
        }

        // 상세 내용 검사 (비어있는지 확인)
        if (detailsInput.value.trim() === '') {
            showError(detailsInput, '상세 문의 내용을 입력해주세요.');
        } else {
            hideError(detailsInput);
        }

        // --- 최종 결정 ---
        // 만약 유효하지 않은 필드가 하나라도 있다면, 폼 제출을 막음
        if (!isValid) {
            event.preventDefault();
        }
    });
}