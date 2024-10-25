function sliderTab() {
    // Slider mobile
    let dots = [];
    if (window.innerWidth <= 767) {
        const slider = document.querySelector('.price_pr_2_0_0__box');
        const slideItems = document.querySelectorAll('.price_pr_2_0_0__item');
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

sliderTab();