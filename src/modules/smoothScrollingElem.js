const smoothScrollingElem = () => {
    const btnServiceBlock = document.getElementsByTagName('a')[0],
        menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li');

    const smoothScrolling = idElem => {
        const element = document.querySelector(idElem);
        const addSmoothScrolling = () => {
            let count = element.offsetTop - Math.floor(document.documentElement.scrollTop);
            if (count > 0) {
                document.documentElement.scrollTop += 10;
            } else {
                clearInterval(idAddSmoothScrolling);
            }
        };
        const idAddSmoothScrolling = setInterval(addSmoothScrolling, 5);
    };

    btnServiceBlock.addEventListener('click', event => {
        event.preventDefault();
        const id = btnServiceBlock.getAttribute('href');
        smoothScrolling(id);
    });

    menuItems.forEach((items) => {
        const idItems = items.querySelector('a');
        idItems.addEventListener('click', event => {
            event.preventDefault();
            const id = idItems.getAttribute('href');
            smoothScrolling(id);
        });
    });
};

export default smoothScrollingElem;