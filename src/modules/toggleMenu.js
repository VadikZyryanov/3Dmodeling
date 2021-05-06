const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const closeMenu = (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            menu.classList.add('active-menu');
        }
        if (target.classList.contains('close-btn') || target.getAttribute('href')) {
            menu.classList.remove('active-menu');
        }
        if (!target.closest('menu') && !target.closest('.menu')) {
            menu.classList.remove('active-menu');
        }
    };

    document.addEventListener('click', closeMenu);
};

export default toggleMenu;