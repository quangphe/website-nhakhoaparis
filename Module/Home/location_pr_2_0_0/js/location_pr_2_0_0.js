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
initSlider();

const dataFetch = [
    {
        city: 'Hà Nội',
        address: '110-112 Bà Triệu, Hoàn Kiếm, Hà Nội',
        lat: '21.018135491077857',
        lon: '105.84904392649656'
    },
    {
        city: 'Hà Nội',
        address: '12 Thái Thịnh, Đống Đa, Hà Nội',
        lat: '21.006244467993135',
        lon: '105.82233457661137'
    },
    {
        city: 'TP. HCM',
        address: '84A Bà Huyện Thanh Quan, P9, Q.3',
        lat: '10.781696392567232',
        lon: '106.68196898957196'
    },
    {
        city: 'Đà Nẵng',
        address: 'Số 261-263 đường Hoàng Diệu, Phường Nam Dương, Q. Hải Châu, Đà Nẵng',
        lat: '16.05833598360324',
        lon: '108.21720497666232'
    }
]

const getNearLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const targetLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            }
            const data = findNearestLocation(targetLocation, dataFetch);
            renderNearestLocation(data);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Hàm tính khoảng cách giữa hai điểm sử dụng công thức Haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính Trái Đất tính bằng km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách tính bằng km
}

// Hàm tìm vị trí gần nhất
const findNearestLocation = (targetLocation, locations) => {
    const nearestLocation = [];

    locations.forEach(location => {
        const distance = calculateDistance(
            targetLocation.lat, targetLocation.lon,
            location.lat, location.lon
        );
        // Lấy địa điểm khoảng cách dưới 100km
        if (distance < 100) {
            nearestLocation.push({ ...location, distance: distance })
        }
    });

    nearestLocation.sort((a, b) => a.distance - b.distance); // Sắp xếp theo khoảng cách từ gần đến xa
    return nearestLocation;
}

const renderNearestLocation = (data) => {
    if (data.length > 0){
        const html = data.map(item => `
            <div class="location_pr_2_0_0__item">
                <div class="location_pr_2_0_0__picAddress">
                    <img width="175" height="109" src="/Module/Home/location_pr_2_0_0/images/img.jpg" alt="">
                </div>
                <div class="location_pr_2_0_0__infoAddress">
                    <div class="location_pr_2_0_0__nameAddress">
                        ${item.city}
                    </div>
                    <div class="location_pr_2_0_0__descAddress">
                        ${item.address}
                    </div>
                    <div class="location_pr_2_0_0__btnAddress">
                        <div class="location_pr_2_0_0__btn btnHotline">
                            <img width="17" height="17" src="/Module/Home/location_pr_2_0_0/images/icon-hotline.png" alt="">
                            <span>1900.6900</span>
                        </div>
                        <div class="location_pr_2_0_0__btn btnBooking">
                            <img width="17" height="17" src="/Module/Home/location_pr_2_0_0/images/icon-calendar.png" alt="">
                            <span>Đặt lịch hẹn</span>
                        </div>
                    </div>
                </div>
            </div> 
        `);
    
        document.querySelector('.location_pr_2_0_0__listAddress').innerHTML = html.join('');
    } else {
        document.querySelector('.location_pr_2_0_0__listAddress').innerHTML =  '<div>Trống</div>';
    }
}

const location_pr_2_0_0Select = () => {
    const select = document.querySelector('.location_pr_2_0_0__select');
    select.addEventListener('change', () => {
        if(select.value){
            const data = dataFetch.filter(item => item.city === select.value);
            renderNearestLocation(data);
        } else {
            renderNearestLocation(dataFetch);
        }
    });
}
location_pr_2_0_0Select();

const btnNearLocation = document.querySelector('.location_pr_2_0_0__nearLocation');
btnNearLocation.addEventListener('click', getNearLocation);