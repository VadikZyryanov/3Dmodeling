const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (document.documentElement.clientWidth > 768) {
                let count = -30;
                popupContent.style.left = `${count}%`;
                popup.style.display = 'block';
                const getPopupContent = () => {
                    if (count <= 38) {
                        popupContent.style.left = `${count}%`;
                    } else {
                        clearInterval(popupContentAnimation);
                    }
                    count++;
                };
                const popupContentAnimation = setInterval(getPopupContent, 8);
            } else {
                popup.style.display = 'block';
            }
        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup') || target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        }
    });
};

export default togglePopup;