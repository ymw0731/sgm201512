// 1. HTML에서 필요한 요소들을 선택해서 변수에 담습니다.
const hamburger = document.querySelector('.hamburger-menu'); // 햄버거 메뉴 아이콘
const navMenu = document.querySelector('nav');               // 내비게이션 메뉴

// 2. 햄버거 아이콘을 'click'했을 때, 실행될 함수를 정의합니다.
hamburger.addEventListener('click', () => {
    // navMenu 요소에 'nav-active' 라는 클래스를 추가하거나 제거합니다.
    // 이 클래스가 추가되면 CSS에 의해 메뉴가 보이게 되고, 제거되면 사라집니다.
    navMenu.classList.toggle('nav-active');
});