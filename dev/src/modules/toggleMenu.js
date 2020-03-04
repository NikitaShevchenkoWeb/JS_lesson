const menu = document.querySelector('menu');

const toggleMenu = ()=> {
    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (e) => {
        let target = e.target;

        if (target.closest('.menu') || target.matches('menu ul>li a') || target.matches('menu a')) {
            handlerMenu();
        }
    });
};


//scroll
function animateScroll(elem) {
    let elemId = elem.getAttribute('href'),
        block = document.querySelector(elemId);

    block.scrollIntoView({block: "start", behavior: "smooth"});
}

const menuItemsLink = menu.querySelectorAll('ul>li a');
menuItemsLink.forEach((elem) => {
    elem.addEventListener('click', function (e) {
        e.preventDefault();
        animateScroll(elem);
    });
});

const scrollBtn = document.querySelector('main a');
scrollBtn.addEventListener('click', function (e) {
    e.preventDefault();
    animateScroll(scrollBtn);
});


export default toggleMenu;