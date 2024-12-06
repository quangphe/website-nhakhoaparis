// Hàm hiển thị dữ liệu
function displayPriceData(data, containerSelector, group) {
    const priceBox = document.querySelector(containerSelector);
    priceBox.innerHTML = ''; // Xóa nội dung cũ
        
        // Hien thi 1 san pham
        if (group) {
            for (let i = 0 ; i < data.length; i++) {
                if (i == 0) {
                    renderProduct(data[0], priceBox);
                }
                renderItem(data[i], priceBox);
            }
        }

        if (group == undefined) {
            // Hien thi tat ca san pham THEO cate
            
            for (const key in data) {
                let count = 0;
                // console.log(data[key]);
                for( const item in data[key]) { 
                    let x = data[key][item];

                    // lấy nhóm sản phẩm đầu tiên
                    for (let i = 0 ; i < x.length; i++) {
                        if (i == 0) {
                            renderProduct(x[i], priceBox, count);
                        }
                        
                        // Render Product Item
                        renderItem(x[i], priceBox, count); 
                    }
                    // console.log(x);

                    // Tăng count Product group
                    count= count + 1;
                }
           }

           // render mobile
            sliderTab(containerSelector);
        }
}


function renderProduct(service, priceBox, count) {
    // Tạo template
    const template = document.getElementById('my-template').content;
    const clone = document.importNode(template, true);

     // Chèn dữ liệu từ object vào template
     clone.querySelector('.price_pr_2_0_0__titleChild').textContent = service.name;
     clone.querySelector('.price_pr_2_0_0__pic img').src = service.image;
     clone.querySelector('.price_pr_2_0_0__boxPrice').classList.add('item_' + count);
     priceBox.appendChild(clone);
}

// Hàm hiển thị nhóm sản phẩm
function renderItem(service, priceBox, count) {
    // Tạo template
    const template = document.getElementById('my-template2').content;
    const clone = document.importNode(template, true);

     // Chèn dữ liệu từ object vào template
     clone.querySelector('.price_pr_2_0_0__nameService').textContent = service.name;
     clone.querySelector('.price_pr_2_0_0__price').textContent = service.price.toLocaleString();

    priceBox.querySelector(`.price_pr_2_0_0__boxPrice.item_${count}`).appendChild(clone);
    // priceBox.appendChild(clone);

}

// Slider Mobile
function sliderTab(idDom) {
    let dots = [];
    if (window.innerWidth <= 767) {
        const slider = document.querySelector(idDom);
        const slideItems = document.querySelectorAll(`${idDom} .price_pr_2_0_0__item`);
        let currentSlide = 0;

        function showSlide(index) {
            slideItems.forEach(item => {
                item.style.display = 'none';
            });
            if (slideItems[index]) {
                slideItems[index].style.display = 'block';
                activeDot(index);
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideItems.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
            showSlide(currentSlide);
        }

        showSlide(currentSlide);

        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('price_pr_2_0_0__dots');

        // Create dots for each slide
        slideItems.forEach((item, index) => {
            const dot = document.createElement('span');
            dot.classList.add('price_pr_2_0_0__dot');
            dot.addEventListener('click', () => {
                showSlide(index);
                currentSlide = index;
            });
            dots.push(dot); // Thêm dot vào mảng dots
            dotsContainer.appendChild(dot);
        });

        activeDot(currentSlide);

        // Tạo thẻ div để chứa cả hai button
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('price_pr_2_0_0__controls');

        // Tạo button prev
        const prevButton = document.createElement('button');
        prevButton.textContent = '❮';
        prevButton.addEventListener('click', prevSlide);
        prevButton.classList.add('price_pr_2_0_0__prev'); // Thêm class vào button

        // Tạo button next
        const nextButton = document.createElement('button');
        nextButton.textContent = '❯';
        nextButton.addEventListener('click', nextSlide);
        nextButton.classList.add('price_pr_2_0_0__next'); // Thêm class vào button

        // Thêm cả hai button vào thẻ div
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(nextButton);

        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('price_pr_2_0_0__controlsContainer');
        controlsContainer.appendChild(dotsContainer);
        controlsContainer.appendChild(buttonContainer);

        // Thêm thẻ div chứa cả hai button vào slider
        slider.appendChild(controlsContainer);

        // Tạo sự kiện click cho dot
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('price_pr_2_0_0__dot')) {
                const index = Array.from(dots).indexOf(e.target);
                showSlide(index);
            }
        });
    }

    function activeDot(index) {
        if (dots && dots[index]) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[index].classList.add('active');
        }
    }
}

// Call API
const getData = async (cate, group) => {
    let response;
    if (group) {
        response = await fetch(`https://scigroup.com.vn/app/api/store/?d=price-paris&cate=${cate}&group=${group}`);
    } else {
        response = await fetch(`https://scigroup.com.vn/app/api/store/?d=price-paris&cate=${cate}`);
    }
    const data = await response.json();
    return data;
};

// Chạy chương trình
const run = async (cate, idDom, group) => {
    const data = await getData(cate, group);
    // console.log(data);
    displayPriceData(data, idDom, group);
};

// Gọi hàm chạy sản phẩm tiêu biểu [cate, id dom]
run('like', '#price1');

// Gọi hàm chạy sản phẩm theo cate
run('Niềng Răng', '#price2');

// Gọi hàm chạy sản phẩm tiêu biểu
run('', '#price3', 'Niềng răng mắc cài kim loại');