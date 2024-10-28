function sliderTab() {
    // Slider mobile và desktop
    let dots = [];
    const slider = document.querySelector('.location_pr_2_0_0__boxSlide');
    const slideItems = document.querySelectorAll('.location_pr_2_0_0__picSlide');
    let currentSlide = 0;

    function showSlide(index) {
        slideItems.forEach(item => {
            item.style.display = 'none';
        });

        // Hiển thị item dựa trên chế độ
        const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
        for (let i = 0; i < itemsPerDot; i++) {
            const itemIndex = index * itemsPerDot + i;
            if (slideItems[itemIndex]) {
                slideItems[itemIndex].style.display = 'flex';
            }
        }

        activeDot(index);
    }

    function nextSlide() {
        const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
        currentSlide = (currentSlide + 1) % Math.ceil(slideItems.length / itemsPerDot);
        showSlide(currentSlide);
    }

    function prevSlide() {
        const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
        currentSlide = (currentSlide - 1 + Math.ceil(slideItems.length / itemsPerDot)) % Math.ceil(slideItems.length / itemsPerDot);
        showSlide(currentSlide);
    }

    function createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('location_pr_2_0_0__dots');

        // Số lượng dot dựa trên kích thước màn hình
        const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
        const totalDots = Math.ceil(slideItems.length / itemsPerDot);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('location_pr_2_0_0__dot');
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
            dots.push(dot);
            dotsContainer.appendChild(dot);
        }

        activeDot(currentSlide);
        return dotsContainer; // Trả về dotsContainer
    }

    const dotsContainer = createDots(); // Gọi hàm tạo dots

    // Tạo thẻ div để chứa cả hai button
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('location_pr_2_0_0__controls');

    // Tạo button prev
    const prevButton = document.createElement('button');
    prevButton.textContent = '❮';
    prevButton.addEventListener('click', prevSlide);
    prevButton.classList.add('location_pr_2_0_0__prev');

    // Tạo button next
    const nextButton = document.createElement('button');
    nextButton.textContent = '❯';
    nextButton.addEventListener('click', nextSlide);
    nextButton.classList.add('location_pr_2_0_0__next');

    // Thêm cả hai button vào thẻ div
    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);

    // Tạo thẻ div chứa cả dots và controls
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('location_pr_2_0_0__controlsContainer');

    // Thêm cả dotsContainer và buttonContainer vào controlsContainer
    controlsContainer.appendChild(dotsContainer);
    controlsContainer.appendChild(buttonContainer);
    
    // Thêm controlsContainer vào slider
    slider.appendChild(controlsContainer);

    showSlide(currentSlide);

    function activeDot(index) {
        const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
        const dotIndex = Math.floor(index / itemsPerDot);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[dotIndex]) {
            dots[dotIndex].classList.add('active');
        }
    }
}

sliderTab();