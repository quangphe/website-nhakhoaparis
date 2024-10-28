document.addEventListener("DOMContentLoaded", function() {
    // Submit Form
    document.querySelector('.regist_pr_2_0_0__box3__form input[name="first_link"]').value = document.URL;
    document.querySelector('.regist_pr_2_0_0__box3__form input[name="website"]').value = document.referrer;
    // Validate Form
        Validator({
            form: '#regist_pr_2_0_0__box3__form',
            errorSelector: '.form-message',
            formGroupSelector: '.form-group',
            rules: [
                Validator.isRequired('input[name="iname"]'),
                Validator.isRequired('input[name="imob"]'),
                Validator.isMobile('input[name="imob"]'),
                // Validator.addInput('textarea[name="itext"]', () => {
                //     return 'Đăng ký tư vấn miễn phí: '  + document.querySelector('#regist_pr_2_0_0__box3__form textarea[name="inote"]').value;
                // }),
            ],
            onSubmit: function (data) {
                if (document.querySelector('#regist_pr_2_0_0__box3__form input[name="email"]').value === '') {
                    console.log(data);
                    document.querySelector('input[type="submit"]').setAttribute("disabled", "");
                    document.querySelector('input[type="submit"]').value="Đang gửi thông tin...";
                    sendForm(data, '/dang-ky-thanh-cong'); 
                }
                else {
                    console.log('NOT SPAM!!!', document.querySelector('#regist_pr_2_0_0__box3__form input[name="email"]').value)
                }
                         
                document.querySelector('.regist_pr_2_0_0__box3__form').reset();
            }
        });
    
    const renderDataCommit = (data, title) => {
        // console.log(2);
        const nameTab = data.filter((item, index) => {
            return index === Number(title);
        });
    
        let html = `
            <div class="regist_pr_2_0_0__box2__item">
                <div class="regist_pr_2_0_0__box2__pic">
                    <img src="${nameTab[0].image}" alt="${nameTab[0].title}" loading="lazy">
                </div>
                <div class="regist_pr_2_0_0__box2__ct">
                    <div class="regist_pr_2_0_0__box2__tt">
                        ${nameTab[0].title}
                    </div>
                    <div class="regist_pr_2_0_0__box2__subTitle">
                        ${nameTab[0].desc}
                    </div>
                    <a class="regist_pr_2_0_0__box2__more popup_regist btnnktv popupRegistSlide">
                        <span>
                            <b>Đăng ký tư vấn</b>
                        </span>
                    </a>
                </div>
            </div>
        `;
        document.getElementById('regist_pr_2_0_0__box2').innerHTML = html;
        popupRegist(false, '.popupRegistSlide');
    } 
    
    // const renderDataAddress = (data, cityObj) => {
    //     const nameCity = data.filter((item) => {
    //         return item.cityObj === cityObj;
    //     });
    //     let html = '';
    //     nameCity.map((itemAdd) => {
    //         html+= `
    //             <div class="regist_pr_2_0_0__box3__sub">
    //                 <a class="address">${itemAdd.addressCity}</a>
    //                 <a class="icon__call popup_caller popupCall">Hotline</a>
    //                 <a class="icon__time popup_regist popupRegist">Lịch hẹn</a>
    //             </div>
    //         `
    //     })
        
    //     document.getElementById('regist_pr_2_0_0__box3__item').innerHTML = html;
    //     // console.log(3);
    //     popupCall();
    //     // popupRegist();
    //     popupRegist(true, '.popupRegist');
    // }
    
    // Get API Person
    const getCommit = async () => {
        const commit = [];
        const response = await fetch(`https://nhakhoaparis.vn/wp-json/wp/v2/pages/81752`);
        const data = await response.json();
        // console.log(data);
        // const commitJSON = data.acf.page_field[6].commit_sub_fields[0].info1;
    
        const commitJSON = data.acf.group_page_field.body_custom.filter((item) => {
            return item.acf_fc_layout == "commit_1_0_0"
        });
    
        // console.log(commitJSON);
        commitJSON[0].info1.map((item) => {
            const commitObj = item.content1.split("\r\n");
            // console.log(commitObj);
            commit.push({ icon: commitObj[0], title: commitObj[1], desc: commitObj[2], image: commitObj[3] });
        });
    
        const cityAddress = [];
        
        commitJSON[0].contact_info.map((item) => {
            const addressObj = item.contact_city_data.map((itemAddress) => {
                const address = itemAddress.content.split("\r\n");
                // console.log(address);
                cityAddress.push({ addressCity: address[0], link: address[1], cityObj: item.contact_city_name })
            })
        });
    
        // renderDataAddress(cityAddress, "Hà Nội");
        // var selectAddress = document.querySelector(".regist_pr_2_0_0__box3__select");
        //     selectAddress.addEventListener ("change", function (e) {
        //             const element = e.target.value;
        //             renderDataAddress(cityAddress, element);
        //         });
                // popupCall();
                // popupRegist();
                // console.log(1);
    
        if (window.innerWidth > 600) {
            renderDataCommit(commit, 0);
    
            var tabLinks = document.querySelectorAll(".regist_pr_2_0_0__box1__tabs .tab");
            tabLinks.forEach(function (el) {
                el.addEventListener("click", function () {
                    const element = el.getAttribute('data-id');
                    tabLinks.forEach(function (el) {
                        el.classList.remove('active');
                    })
                    el.classList.add('active');
                    renderDataCommit(commit, element);
                });
            });
        }
        
    };
    
    getCommit();
    
    function fixResponsive(){
        const itemTabs = document.querySelectorAll('.regist_pr_2_0_0__box1__tabs .tab');
        const items = document.querySelectorAll('.regist_pr_2_0_0__box1__tabsTitle');
    
        const pc = () => {
            items.forEach(item => {
                item.style.display = "none";
            });
            itemTabs.forEach(item => {
                item.removeAttribute("style");
            });
        }
    
        if (window.innerWidth >= 768) {
            pc();
        } 
    
        window.addEventListener("resize", function() {
            if (window.innerWidth >= 768) {
                pc();
            } else{
                items.forEach(item => {
                    item.style.display = "block";
                });
            }
        } );
    }
    fixResponsive();
    
    function popupCall() {   
        const callBtnPopup_1_1_0 = document.querySelectorAll(".popupCall");
        for (let i = 0; i < callBtnPopup_1_1_0.length; i++) {
            callBtnPopup_1_1_0[i].addEventListener('click', () => {
                document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", popup_call_1_1_0);
                document.querySelector('.popup_call_1_1_0 input[name="first_link"]').value = document.URL;
                document.querySelector('.popup_call_1_1_0 input[name="website"]').value = document.referrer;
                document.querySelector('.popup_call_1_1_0 textarea[name="itext"]').value = `Để lại số điện thoại tại chi nhánh: ${callBtnPopup_1_1_0[i].parentNode.childNodes[1].innerText}`;
                getLocation().then((data) => {
                    document.querySelector('.popup_call_1_1_0 input[name="location"]').value = data.city;
                });
                // Validate Form
                if(document.querySelector('.popup_call_1_1_0')){
                    Validator({
                        form: '#popup_call_1_1_0',
                        errorSelector: '.form-message',
                        formGroupSelector: '.form-group',
                        rules: [
                            Validator.isRequired('input[name="imob"]'),
                            Validator.isMobile('input[name="imob"]'),
                        ],
                        onSubmit: function (data) {
                            if (document.querySelector('#popup_call_1_1_0 input[name="email"]').value === '') {
                                console.log(data);
                                document.querySelector('input[type="submit"]').setAttribute("disabled", "");
                                document.querySelector('input[type="submit"]').value="Đang gửi thông tin...";
                                sendForm(data, '/dang-ky-thanh-cong');    
                            }
                            else {
                                console.log('NOT SPAM!!!', document.querySelector('#popup_call_1_1_0 input[name="email"]').value)
                            }
        
                            document.querySelector('.popup_call_1_1_0').reset();
                        }
                    });
                }
        
                document.getElementById('popup_call_1_1_0__closePopup').addEventListener('click', () => {
                    popup_call_1_1_0__closeForm()
                })
                document.getElementById('popup_call_1_1_0__overlay').addEventListener('click', () => {
                    popup_call_1_1_0__closeForm()
                })
                window.onclick = function (e) {
                    if (e.target == document.querySelector('.popup_call_1_1_0__boxTv')) {
                        popup_call_1_1_0__closeForm()
                    }
                }
                function popup_call_1_1_0__closeForm(){
                    document.getElementById('popup_call_1_1_0').remove();
                    document.getElementById('popup_call_1_1_0__overlay').remove();
                    // document.getElementById('popup_call_1_1_0').remove();
                }
            })
        }
    }
    
    // Popup Regist
    
    function popupRegist(itext, nameClass) {
        const registBtnPopup_1_0_1 = document.querySelectorAll(nameClass);
        for (let i = 0; i < registBtnPopup_1_0_1.length; i++) {
            registBtnPopup_1_0_1[i].addEventListener('click', () => {
                document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", popup_regist_1_0_1);
                document.querySelector('.popup_regist_1_0_1 input[name="first_link"]').value = document.URL;
                document.querySelector('.popup_regist_1_0_1 input[name="website"]').value = document.referrer;
                if(itext == true){
                    document.querySelector('.popup_regist_1_0_1 textarea[name="itext"]').value = `Yêu cầu tư vấn tại chi nhánh: ${registBtnPopup_1_0_1[i].parentNode.childNodes[1].innerText}`;
                }
                getLocation().then((data) => {
                    document.querySelector('.popup_regist_1_0_1 input[name="location"]').value = data.city;
                });
                // Validate Form
                if(document.querySelector('.popup_regist_1_0_1')){
                    Validator({
                        form: '#popup_regist_1_0_1',
                        errorSelector: '.form-message',
                        formGroupSelector: '.form-group',
                        rules: [
                            Validator.isRequired('input[name="iname"]'),
                            Validator.isRequired('input[name="iemail"]'),
                            Validator.isRequired('input[name="imob"]'),
                            Validator.isMobile('input[name="imob"]'),
                            // Validator.addInput('textarea[name="itext"]', () => {
                            //     return 'Đăng ký tư vấn miễn phí: '  + document.querySelector('#popup_regist_1_0_1 textarea[name="inote"]').value;
                            // }),
                        ],
                        onSubmit: function (data) {
                            if (document.querySelector('#popup_regist_1_0_1 input[name="email"]').value === '') {
                                document.querySelector('input[type="submit"]').setAttribute("disabled", "");
                                document.querySelector('input[type="submit"]').value="Đang gửi thông tin...";
                                sendForm(data, '/dang-ky-thanh-cong');    
                            }
                            else {
                                console.log('NOT SPAM!!!', document.querySelector('#popup_regist_1_0_1 input[name="email"]').value)
                            }
                                
                            document.querySelector('.popup_regist_1_0_1').reset();
                        }
                    });
                }
    
                document.getElementById('popup_regist_1_0_1__closePopup').addEventListener('click', () => {
                    popup_regist_1_0_1__closeForm()
                })
                document.getElementById('popup_regist_1_0_1__overlay').addEventListener('click', () => {
                    popup_regist_1_0_1__closeForm()
                })
                window.onclick = function (e) {
                    if (e.target == document.querySelector('.popup_regist_1_0_1__boxTv')) {
                        popup_regist_1_0_1__closeForm()
                    }
                }
                function popup_regist_1_0_1__closeForm(){
                    document.getElementById('popup_regist_1_0_1').remove();
                    document.getElementById('popup_regist_1_0_1__overlay').remove();
                }
            })
        }
    }

});    
