const defaultOptions = {
  slidesPerView: 4,
  spaceBetween: 16,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    1280: {
      slidesPerView: 4,
      spaceBetween: 16
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    }
  }
}

export default defaultOptions
