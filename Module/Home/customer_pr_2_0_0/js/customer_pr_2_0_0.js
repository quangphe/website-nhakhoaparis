
'use strict';

const carouselItems = document.querySelectorAll('.customer_pr_2_0_0__itemCarousel');
console.log(carouselItems)
let currentItem = document.querySelector('.carouselCustomer--main');
const leftBtn = document.querySelector('#leftBtnCustomer');
const rightBtn = document.querySelector('#rightBtnCustomer');


rightBtn.addEventListener('click', function () {
    currentItem = document.querySelector('.carouselCustomer--right');
    const leftItem = document.querySelector('.carouselCustomer--main');
    carouselItems.forEach((item, i) => {
        item.classList = 'customer_pr_2_0_0__itemCarousel';
    });
    currentItem.classList.add('carouselCustomer--main');
    leftItem.classList.add('carouselCustomer--left');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const rightItem = currentId === carouselItems.length - 1 ? carouselItems[0] : carouselItems[currentId + 1];
    rightItem.classList.add('carouselCustomer--right');
});

leftBtn.addEventListener('click', function () {
    currentItem = document.querySelector('.carouselCustomer--left');
    const rightItem = document.querySelector('.carouselCustomer--main');
    carouselItems.forEach((item, i) => {
        item.classList = 'customer_pr_2_0_0__itemCarousel';
    });
    currentItem.classList.add('carouselCustomer--main');
    rightItem.classList.add('carouselCustomer--right');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const leftItem = currentId === 0 ? carouselItems[carouselItems.length - 1] : carouselItems[currentId - 1];
    leftItem.classList.add('carouselCustomer--left');
});