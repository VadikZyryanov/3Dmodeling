const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо, мы скоро с вами свяжемся.',
        errorMesageTwo = 'Проверь имя, адрес почты, телефон';

    const formOne = document.getElementById('form1'),
        formTwo = document.getElementById('form2'),
        formThree = document.getElementById('form3');

    const statusMessage = document.createElement('section');
    statusMessage.className = 'section';

    const getForm = (form) => {
        form.addEventListener('submit', (event) => {
            const formName = form.querySelector('.form-name'),
                formEmail = form.querySelector('.form-email'),
                formPhone = form.querySelector('.form-phone');

            const patternName = /.{2,50}/,
                patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let patternPhone = /.{11,}/,
                patternPhoneTwo = /.{12,}/;

            if (form.closest('.popup')) {
                statusMessage.style.cssText = `font-size = 2rem;
                color: white;`;
            } else {
                statusMessage.style.cssText = `font-size = 2rem;`;
            }
            statusMessage.innerHTML = `
                <div class="sk-rotating-plane"></div>
            `;

            event.preventDefault();
            form.append(statusMessage);
            const formData = new FormData(form);

            const timeOutPostData = () => postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    formName.value = '';
                    formEmail.value = '';
                    formPhone.value = '';
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            if (formPhone.value[0] === '+') patternPhone = patternPhoneTwo;
            
            if (patternName.test(formName.value) &&
                patternEmail.test(formEmail.value) &&
                patternPhone.test(formPhone.value)) {
                setTimeout(timeOutPostData, 3000);

            } else {
                statusMessage.textContent = errorMesageTwo;
            }
        });
    };

    const postData = (formData) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });
    };

    getForm(formOne);
    getForm(formTwo);
    getForm(formThree);
};

export default sendForm;