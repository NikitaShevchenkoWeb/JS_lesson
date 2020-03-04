//send AJAX form
const sendForms = () => {
    const sendForm = (form) => {
        const errorMessage = 'images/error.svg',
            loadMessage = 'images/hourglass.svg',
            successMessage = 'images/checked.svg';

        const statusMessage = document.createElement('img');
        statusMessage.style.cssText = 'width: 50px; margin-top: 10px;';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.src = loadMessage;

            const formData = new FormData(form);

            postData(formData)
                .then( (response) => {
                    if (response.status !== 200) {
                        throw new Error('Status network not 200');
                    }
                    statusMessage.src = successMessage;
                    clearForm();
                })
                .catch( (error) => {
                    statusMessage.src = errorMessage;
                    console.log(error);
                    clearForm();
                });
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : body
            });
        };

        //clear form
        const clearForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            formElem.forEach((item) => { item.value = ''; });
        };
    };


//validate form
    const validPhone = (inputVal) => {
        let countPlus = 0,
            arrInputVal = inputVal.split(''),
            newArrInputVal = [];

        arrInputVal.forEach((item, i) => {
            newArrInputVal[i] = item;

           if (item === '+' && countPlus <= 2) { countPlus++;}

            if ((countPlus >= 2 && item === '+') || newArrInputVal.length === 12 || (item === '+' && i >= 1)) {
                delete newArrInputVal[i];
                newArrInputVal.length -= 1;
            }
        });

        return newArrInputVal.join('');
    };

    const form = (e) => {
        const form = e.target.closest('form');

        const validForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            const regNum = /[^0-9\+]/g,
                  regPhone = /^[+]?[0-9]{1,11}$/g,
                  regStr = /[^А-Яа-яЁё\s]/g;

            const valid = (input) => {
                let val = input.value;

                if (input.focus && input.type === 'tel') {
                    val = val.replace(regNum, '');

                    if (regPhone.test(val)) { input.value = val; }
                    else { input.value = validPhone(val); }

                } else if ((input.getAttribute("placeholder") === "Ваше имя" ||
                    input.getAttribute("placeholder") === "Ваше сообщение") && regStr.test(val)) {
                    val = val.replace(regStr, '');
                    input.value = val;
                }
            };

            formElem.forEach((item) => { valid(item); })
        };

        form.addEventListener('input', validForm);
    };

    const forms = document.querySelectorAll('form');
    forms.forEach((item) => {
        item.addEventListener('click', form);
        sendForm(item);
    });
};

export default sendForms;