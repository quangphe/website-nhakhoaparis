
'use strict';

const carouselItemsCustomer = document.querySelectorAll('.customer_pr_2_0_0__itemCarousel');
console.log(carouselItemsCustomer)
let currentItemCustomer = document.querySelector('.carouselCustomer--main');
const leftBtnCustomer = document.querySelector('#leftBtnCustomer');
const rightBtnCustomer = document.querySelector('#rightBtnCustomer');


rightBtnCustomer.addEventListener('click', function () {
    currentItemCustomer = document.querySelector('.carouselCustomer--right');
    const leftItemCustomer = document.querySelector('.carouselCustomer--main');
    carouselItemsCustomer.forEach((item, i) => {
        item.classList = 'customer_pr_2_0_0__itemCarousel';
    });
    currentItemCustomer.classList.add('carouselCustomer--main');
    leftItemCustomer.classList.add('carouselCustomer--left');
    const currentIdCustomer = Array.from(carouselItemsCustomer).indexOf(currentItemCustomer);
    const rightItemCustomer = currentIdCustomer === carouselItemsCustomer.length - 1 ? carouselItemsCustomer[0] : carouselItemsCustomer[currentIdCustomer + 1];
    rightItemCustomer.classList.add('carouselCustomer--right');
});

leftBtnCustomer.addEventListener('click', function () {
    currentItemCustomer = document.querySelector('.carouselCustomer--left');
    const rightItemCustomer = document.querySelector('.carouselCustomer--main');
    carouselItemsCustomer.forEach((item, i) => {
        item.classList = 'customer_pr_2_0_0__itemCarousel';
    });
    currentItemCustomer.classList.add('carouselCustomer--main');
    rightItemCustomer.classList.add('carouselCustomer--right');
    const currentIdCustomer = Array.from(carouselItemsCustomer).indexOf(currentItemCustomer);
    const leftItemCustomer = currentIdCustomer === 0 ? carouselItemsCustomer[carouselItemsCustomer.length - 1] : carouselItemsCustomer[currentIdCustomer - 1];
    leftItemCustomer.classList.add('carouselCustomer--left');
});