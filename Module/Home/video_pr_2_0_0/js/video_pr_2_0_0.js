document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các tab và nội dung tab
    const tabs = document.querySelectorAll('.video_pr_2_0_0__tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Thêm sự kiện click cho từng tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa lớp 'current' khỏi tất cả các tab và nội dung tab
            tabs.forEach(t => t.classList.remove('current'));
            tabContents.forEach(content => content.classList.remove('current'));

            // Thêm lớp 'current' cho tab được nhấp và nội dung tương ứng
            tab.classList.add('current');
            const targetContent = document.getElementById(tab.getAttribute('data-tab'));
            targetContent.classList.add('current');
        });
    });
});