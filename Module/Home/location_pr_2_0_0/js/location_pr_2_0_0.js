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
        lon: '105.84904392649656',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.77273781910185!2d105.84885284573652!3d21.01812444520467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8245cead69%3A0x4c4225d15becfff6!2zTmhhIEtob2EgUGFyaXMgLSBCw6AgVHJp4buHdSAtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1730881923077!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Hà Nội 2',
        address: 'Số 110-112 Bà Triệu, Hoàn Kiếm, Hà Nội',
        lat: '21.15243585665105',
        lon: '105.50602332931679',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.77273781910185!2d105.84885284573652!3d21.01812444520467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8245cead69%3A0x4c4225d15becfff6!2zTmhhIEtob2EgUGFyaXMgLSBCw6AgVHJp4buHdSAtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1730881923077!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'TP. HCM',
        address: '84A Bà Huyện Thanh Quan, P9, Q.3',
        lat: '10.781696392567232',
        lon: '106.68196898957196',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.855754667249!2d106.68150660667754!3d10.781871515047815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fd85f80a9e3%3A0x46e9f5f214222ecc!2zQuG7h25oIFZp4buHbiBSxINuZyBIw6BtIE3hurd0IFRo4bqpbSBN4bu5IFBhcmlz!5e0!3m2!1svi!2s!4v1730882188641!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Đà Nẵng',
        address: 'Số 261-263 đường Hoàng Diệu, Phường Nam Dương, Q. Hải Châu, Đà Nẵng',
        lat: '16.05833598360324',
        lon: '108.21720497666232',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1380519795625!2d108.21716810028424!3d16.05832438743385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b65bc148cb%3A0x43b3fabe23fc69f5!2zTmhhIEtob2EgUGFyaXMgVFAgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1730882273361!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
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

const renderFrameLocation = (city) => {
    const location = dataFetch.filter(item => item.city === city);
    document.querySelector('.location_pr_2_0_0__maps').innerHTML = location[0].frame;
}

const renderNearestLocation = (data) => {
    if (data.length > 0){
        const html = data.map(item => `
            <div class="location_pr_2_0_0__item" onclick="renderFrameLocation('${item.city}')">
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