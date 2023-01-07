import Swiper, { Navigation, Pagination, EffectFade, Autoplay, FreeMode, Thumbs } from 'swiper';

export function slider() {
  const lengthHeroSlider = document.querySelector('#hero-slider__length');
  const activeHeroSlide = document.querySelector('#hero-slider__active');
  const progressLine = document.querySelector('.hero-main__slider-progressbar');
  let heroTimeout;

  const mainSlider = new Swiper('.hero-main__slider', {
    modules: [EffectFade, Navigation, Pagination, Autoplay],
    speed: 1000,
    effect: 'fade',
    simulateTouch: false,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: '.hero-main__slider--next',
      prevEl: '.hero-main__slider--prev',
    },
    pagination: {
      el: '.hero-main__slider-pagination',
      type: 'bullets',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      afterInit: function () {
        const slider = this;

        activeHeroSlide.textContent = slider.realIndex + 1; // выводится текущий индекс активного слайда в пагинации
        lengthHeroSlider.textContent = slider.slides.length; // выводится длина слайдера
      },
      slideChange: function () {
        const slider = this;
        const delay = slider.params.autoplay.delay;

        activeHeroSlide.textContent = slider.realIndex + 1; // выводится текущий индекс активного слайда в пагинации

        clearTimeout(heroTimeout);
        progressLine.classList.remove('active');

        setTimeout(() => progressLine.classList.add('active'), 0);
        heroTimeout = setTimeout(() => {
          progressLine.classList.remove('active');
        }, delay);
      },
    },
    breakpoints: {
      769: {
        pagination: {
          enabled: false,
        },
      },
    },
  });

  const reviewsSliders = document.querySelectorAll('.reviews__slider');
  if (reviewsSliders.length > 0) {
    reviewsSliders.forEach((slider) => {
      const speed = parseInt(slider.dataset.speed);

      const reviewsSlider = new Swiper(slider, {
        modules: [Autoplay, FreeMode],
        slidesPerView: 'auto',
        freeMode: true,
        loop: true,
        speed,
        touchRatio: 0.3,
        grabCursor: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });
    });
  }

  const reviewsSlider = new Swiper('.video-reviews__slider', {
    modules: [Navigation, Autoplay],
    speed: 1000,
    simulateTouch: true,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.video-reviews__slider-btn--next',
      prevEl: '.video-reviews__slider-btn--prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      577: {
        centeredSlides: true,
      },
    },
  });

  const articleSlider = new Swiper('.new-article__slider', {
    modules: [Navigation, Autoplay],
    speed: 1000,
    simulateTouch: true,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.new-article__slider-btn--next',
      prevEl: '.new-article__slider-btn--prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  const teamSlider = new Swiper('.team-service__slider', {
    modules: [Navigation, Autoplay],
    speed: 1000,
    simulateTouch: true,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.team-service__slider-btn--next',
      prevEl: '.team-service__slider-btn--prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  const certificateSlider = new Swiper('.certificate-slider', {
    modules: [Navigation, Autoplay],
    speed: 1000,
    simulateTouch: true,
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      nextEl: '.certificate-slider--next',
      prevEl: '.certificate-slider--prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  const productSliderPag = new Swiper('.product-main__slider-pag', {
    speed: 1000,
    allowTouchMove: false,
    slidesPerView: 'auto',
  });

  const productSlider = new Swiper('.product-main__slider', {
    modules: [Navigation, Thumbs],
    speed: 1000,
    simulateTouch: false,
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      nextEl: '.product-main__slider-btn--next',
      prevEl: '.product-main__slider-btn--prev',
    },
    thumbs: {
      swiper: productSliderPag,
    },
  });

  const descrArticleSlider = new Swiper('.descr-article__slider', {
    modules: [Navigation, Autoplay],
    spaceBetween: 20,
    speed: 1000,
    simulateTouch: false,
    navigation: {
      nextEl: '.descr-article__slider-btn--next',
      prevEl: '.descr-article__slider-btn--prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  const recSliders = document.querySelectorAll('.rec-slider');
  recSliders.forEach((slider) => {
    const recSlider = new Swiper(slider, {
      modules: [Navigation],
      simulateTouch: false,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.rec-slider__slider-btn--next',
        prevEl: '.rec-slider__slider-btn--prev',
      },
    });
  });
}

export function productSlider() {
  const productsCardsSliders = document.querySelectorAll('.product-card__slider');
  productsCardsSliders.forEach((slider) => {
    const sliderProduct = new Swiper(slider, {
      modules: [Navigation],
      simulateTouch: false,
      speed: 500,
      loop: true,
      loopPreventsSlide: true,
      navigation: {
        nextEl: '.product-card__slider-arrow--next',
        prevEl: '.product-card__slider-arrow--prev',
      },
    });
  });
}
