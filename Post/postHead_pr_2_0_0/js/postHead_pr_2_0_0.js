document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.postHead_pr_2_0_0__itemSlide');
    let currentSlide = 0;

    // Hàm hiển thị slide hiện tại
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    // Hàm chuyển slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Tăng chỉ số slide và quay lại nếu vượt quá số lượng slide
        showSlide(currentSlide);
    }

    // Hiển thị slide đầu tiên
    showSlide(currentSlide);

    // Chuyển slide sau mỗi 5 giây
    setInterval(nextSlide, 5000);
});