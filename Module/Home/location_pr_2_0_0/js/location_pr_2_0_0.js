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
        city: 'Hà Nội',
        address: '12 Thái Thịnh, Đống Đa, Hà Nội',
        lat: '21.006224436367685',
        lon: '105.82232384777596',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.664060819998!2d105.8174636853365!3d21.006099238647714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5338e4fbcf%3A0xbccc535a180d93fd!2sNha%20khoa%20Paris%2012%20Tha%CC%81i%20Th%E1%BB%8Bnh!5e0!3m2!1svi!2s!4v1733451887171!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'TP. Hồ Chí Minh',
        address: '84A Bà Huyện Thanh Quan, Phường 9, Quận 3',
        lat: '10.78187674429616',
        lon: '106.68197704225865',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3851189536967!2d106.67927337573605!3d10.781787159093394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fd85f80a9e3%3A0x46e9f5f214222ecc!2zQuG7h25oIFZp4buHbiBSxINuZyBIw6BtIE3hurd0IFRo4bqpbSBN4bu5IFBhcmlz!5e0!3m2!1svi!2s!4v1733452718882!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'TP. Hồ Chí Minh',
        address: '97 Cộng Hòa, P4, Q.Tân Bình',
        lat: '10.80122359713085',
        lon: '106.65511845390472',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1352088879325!2d106.65252207573619!3d10.800954858739344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752937a20097c1%3A0x9b7db6679cc6c0ab!2sNha%20Khoa%20Paris%2097%20C%E1%BB%99ng%20H%C3%B2a!5e0!3m2!1svi!2s!4v1733452799405!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Hải Phòng',
        address: '386 Tô Hiệu, Phường Hồ Nam, Lê Chân, Hải Phòng',
        lat: '20.850297147139884',
        lon: '106.67346158472083',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7457.099223482661!2d106.66811862468805!3d20.849886070621093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a6273ba1805%3A0x2d353a377420f68c!2zTmhhIEtob2EgUGFyaXMgdOG6oWkgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1733452876547!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'TP Vinh',
        address: '143, Nguyễn Văn Cừ, TP Vinh, Nghệ An',
        lat: '18.677828586067026',
        lon: '105.68602336934123',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.6965092885057!2d105.68338407583107!3d18.67761006435718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139ce767b0b565b%3A0x2eda2bd516d3dc9c!2sNha%20Khoa%20Paris%20TP%20Vinh!5e0!3m2!1svi!2s!4v1733452946190!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Đà Nẵng',
        address: '261-263 đường Hoàng Diệu, Phường Nam Dương, Q. Hải Châu, TP. Đà Nẵng',
        lat: '16.05850996819868',
        lon: '108.21717882512515',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1379527346826!2d108.214593175792!3d16.05832953972836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b65bc148cb%3A0x43b3fabe23fc69f5!2zTmhhIEtob2EgUGFyaXMgVFAgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1733453011874!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Bình Dương',
        address: 'Số 688A, Đường Cách Mạng Tháng 8, TP Thủ Dầu Một, tỉnh Bình Dương',
        lat: '10.973432275243905',
        lon: '106.6594834962353',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.869568581025!2d106.65690857573757!3d10.973216355531662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1b2b53a442f%3A0x8d8c175aa11d6c04!2zTmhhIEtob2EgUGFyaXMgQsOsbmggRMawxqFuZw!5e0!3m2!1svi!2s!4v1733453118091!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Quảng Ninh',
        address: 'Shop house 6 – 7, KĐT Times Garden, đường Lê Thánh Tông, Hạ Long, Quảng Ninh',
        lat: '20.95194875039674',
        lon: '107.08310792520408',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.0187193267343!2d107.08052227587095!3d20.95176339041738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a592735a21e75%3A0x25ae133111de141f!2sNha%20Khoa%20Paris%20Qu%E1%BA%A3ng%20Ninh!5e0!3m2!1svi!2s!4v1733453197287!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Bắc Ninh',
        address: '519-521 Ngô Gia Tự, phường Tiền An, Thành phố Bắc Ninh, tỉnh Bắc Ninh',
        lat: '21.180948269526056',
        lon: '106.06253910986688',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.287547244939!2d106.05999637587537!3d21.18073318254042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350fdee07a3e29%3A0x2b68816948522566!2sNha%20Khoa%20Paris%20TP%20B%E1%BA%AFc%20Ninh!5e0!3m2!1svi!2s!4v1733453260778!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Thanh Hóa',
        address: 'Số 103 đường Nguyễn Trãi, Phường Ba Đình, TP Thanh Hóa, tỉnh Thanh Hóa',
        lat: '19.803765039675845',
        lon: '105.77340013867706',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.8603453631126!2d105.77084667585015!3d19.803517728729688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f9d2fe158c8b%3A0x696c5d1c67664cc6!2sNha%20Khoa%20Paris%20Thanh%20Ho%C3%A1!5e0!3m2!1svi!2s!4v1733453325863!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Thái Nguyên',
        address: '194 Phan Đình Phùng, Thái Nguyên',
        lat: '21.588876204066732',
        lon: '105.8430377828872',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.929324893975!2d105.84043067588324!3d21.588681668311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135277cc504a671%3A0x4474a164aa93d423!2sNha%20Khoa%20Paris%20Th%C3%A1i%20Nguy%C3%AAn!5e0!3m2!1svi!2s!4v1733453393982!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        city: 'Đắk Lắk',
        address: '26 Lê Thánh Tông, TP Buôn Ma Thuột, Đắk Lắk',
        lat: '12.685294626798392',
        lon: '108.04876386741508',
        frame: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.4337143797375!2d108.04619967575273!3d12.685090521093674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f7c51ded0fd7%3A0x88fe4cebcf4f3c26!2sNha%20Khoa%20Paris%20Bu%C3%B4n%20Ma%20Thu%E1%BB%99t!5e0!3m2!1svi!2s!4v1733453463194!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
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