const regularExpressions = () => {
    const formOneName = document.getElementById('form1-name'),
        formTwoName = document.getElementById('form2-name'),
        formThreeName = document.getElementById('form3-name'),
        formOneEmail = document.getElementById('form1-email'),
        formTwoEmail = document.getElementById('form2-email'),
        formThreeEmail = document.getElementById('form3-email'),
        formOnePhone = document.getElementById('form1-phone'),
        formTwoPhone = document.getElementById('form2-phone'),
        formThreePhone = document.getElementById('form3-phone'),
        inputMessage = document.getElementById('form2-message');

    const checkName = (input) => {
        input.value = input.value.replace(/[^А-Яа-яЁё|\s]/g, '');
        input.addEventListener('blur', () => {
            input.value = input.value.replace(/\s+/g, ' ');
            input.value = input.value.replace(/\-+/g, '-');
            input.value = input.value.replace(/^-+|-+$/g, '');
            input.value = input.value.trim();
            let number = input.value.split(' ');
            for (let i = 0; i < number.length; i++) {
                number[i] = number[i][0].toUpperCase() + number[i].slice(1).toLowerCase();
            }
            input.value = number.join(' ');
        });
    };

    const checkEmail = (input) => {
        input.value = input.value.replace(/[^\w|\@|\-|\_|\.|\!|\~|\*|\']/g, '');
        input.addEventListener('blur', () => {
            input.value = input.value.replace(/\-+/g, '-');
            input.value = input.value.replace(/^-+|-+$/g, '');
        });
    };

    const checkPhone = (input) => {
        input.value = input.value.replace(/[^0-9|\+]/g, '');
        input.addEventListener('blur', () => {
            input.value = input.value.replace(/\-+/g, '-');
            input.value = input.value.replace(/^-+|-+$/g, '');
        });
    }

    formOneName.addEventListener('input', () => {
        checkName(formOneName);
    });

    formTwoName.addEventListener('input', () => {
        checkName(formTwoName);
    });

    formThreeName.addEventListener('input', () => {
        checkName(formThreeName);
    });

    formOneEmail.addEventListener('input', () => {
        checkEmail(formOneEmail);
    });

    formTwoEmail.addEventListener('input', () => {
        checkEmail(formTwoEmail);
    });

    formThreeEmail.addEventListener('input', () => {
        checkEmail(formThreeEmail);
    });

    formOnePhone.addEventListener('input', () => {
        checkPhone(formOnePhone);
    });

    formTwoPhone.addEventListener('input', () => {
        checkPhone(formTwoPhone);
    });

    formThreePhone.addEventListener('input', () => {
        checkPhone(formThreePhone);
    });

    inputMessage.addEventListener('input', () => {
        inputMessage.value = inputMessage.value.replace(/[^А-Яа-яЁё|\s|\d|.,!?]/g, '');
    });
    inputMessage.addEventListener('blur', () => {
        inputMessage.value = inputMessage.value.replace(/\s+/g, ' ');
        inputMessage.value = inputMessage.value.replace(/\-+/g, '-');
        inputMessage.value = inputMessage.value.replace(/^-+|-+$/g, '');
        inputMessage.value = inputMessage.value.trim();
    });
};

export default regularExpressions;
