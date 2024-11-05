document.addEventListener('DOMContentLoaded', () => {
    const clickSendForm = document.querySelector("#form_pr_2_0_0__clickSent");
    if (clickSendForm) { // Kiểm tra xem phần tử có tồn tại không
        clickSendForm.addEventListener('click', () => {
            document.querySelector('.form_pr_2_0_0__form input[name="first_link"]').value = document.URL;
            document.querySelector('.form_pr_2_0_0__form input[name="website"]').value = document.referrer;
            getLocation().then((data) => {
                document.querySelector('.form_pr_2_0_0__form input[name="location"]').value = data.city;
            });
            // Validate Form
            Validator({
                form: '#form_pr_2_0_0__form',
                errorSelector: '.form-message',
                formGroupSelector: '.form-group',
                rules: [
                    Validator.isRequired('input[name="imob"]'),
                    Validator.isRequired('input[name="iname"]'),
                    Validator.isMobile('input[name="imob"]'),
                    Validator.isRequired('select[name="iservice"]'),
                    Validator.addInput('#sidebar__form input[name="itext"]', () => {
                        return 'Tư vấn dịch vụ: ' + document.querySelector('#sidebar__form select[name="iservice"]').value;
                    }),
                ],
                onSubmit: function (data) {
                    console.log(data);
                    clickSendForm__hideForm();
                    // sendForm(data, '/dang-ky-thanh-cong');             
                }
            });
        });
    }
});