// function sliderTab() {
//     // Slider mobile và desktop
//     let dots = [];
//     const slider = document.querySelector('.location_pr_2_0_0__boxSlide');
//     const slideItems = document.querySelectorAll('.location_pr_2_0_0__picSlide');
//     let currentSlide = 0;

//     function showSlide(index) {
//         slideItems.forEach(item => {
//             item.style.display = 'none';
//         });

//         // Hiển thị item dựa trên chế độ
//         const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
//         for (let i = 0; i < itemsPerDot; i++) {
//             const itemIndex = index * itemsPerDot + i;
//             if (slideItems[itemIndex]) {
//                 slideItems[itemIndex].style.display = 'flex';
//             }
//         }

//         activeDot(index);
//     }

//     function nextSlide() {
//         const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
//         currentSlide = (currentSlide + 1) % Math.ceil(slideItems.length / itemsPerDot);
//         showSlide(currentSlide);
//     }

//     function prevSlide() {
//         const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
//         currentSlide = (currentSlide - 1 + Math.ceil(slideItems.length / itemsPerDot)) % Math.ceil(slideItems.length / itemsPerDot);
//         showSlide(currentSlide);
//     }

//     function createDots() {
//         const dotsContainer = document.createElement('div');
//         dotsContainer.classList.add('location_pr_2_0_0__dots');

//         // Số lượng dot dựa trên kích thước màn hình
//         const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
//         const totalDots = Math.ceil(slideItems.length / itemsPerDot);

//         for (let i = 0; i < totalDots; i++) {
//             const dot = document.createElement('span');
//             dot.classList.add('location_pr_2_0_0__dot');
//             dot.addEventListener('click', () => {
//                 currentSlide = i;
//                 showSlide(currentSlide);
//             });
//             dots.push(dot);
//             dotsContainer.appendChild(dot);
//         }

//         activeDot(currentSlide);
//         return dotsContainer; // Trả về dotsContainer
//     }

//     const dotsContainer = createDots(); // Gọi hàm tạo dots

//     // Tạo thẻ div để chứa cả hai button
//     const buttonContainer = document.createElement('div');
//     buttonContainer.classList.add('location_pr_2_0_0__controls');

//     // Tạo button prev
//     const prevButton = document.createElement('button');
//     prevButton.textContent = '❮';
//     prevButton.addEventListener('click', prevSlide);
//     prevButton.classList.add('location_pr_2_0_0__prev');

//     // Tạo button next
//     const nextButton = document.createElement('button');
//     nextButton.textContent = '❯';
//     nextButton.addEventListener('click', nextSlide);
//     nextButton.classList.add('location_pr_2_0_0__next');

//     // Thêm cả hai button vào thẻ div
//     buttonContainer.appendChild(prevButton);
//     buttonContainer.appendChild(nextButton);

//     // Tạo thẻ div chứa cả dots và controls
//     const controlsContainer = document.createElement('div');
//     controlsContainer.classList.add('location_pr_2_0_0__controlsContainer');

//     // Thêm cả dotsContainer và buttonContainer vào controlsContainer
//     controlsContainer.appendChild(dotsContainer);
//     controlsContainer.appendChild(buttonContainer);
    
//     // Thêm controlsContainer vào slider
//     slider.appendChild(controlsContainer);

//     showSlide(currentSlide);

//     function activeDot(index) {
//         const itemsPerDot = window.innerWidth >= 768 ? 4 : 1;
//         const dotIndex = Math.floor(index / itemsPerDot);
//         dots.forEach(dot => dot.classList.remove('active'));
//         if (dots[dotIndex]) {
//             dots[dotIndex].classList.add('active');
//         }
//     }
// }

// sliderTab();

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);