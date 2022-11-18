import Swiper, {Navigation, Pagination, EffectFade, Autoplay, FreeMode} from 'swiper';

export function slider() {
   const lengthHeroSlider = document.querySelector('#hero-slider__length');
   const activeHeroSlide = document.querySelector('#hero-slider__active');
   let heroTimeout;

   const mainSlider = new Swiper('.hero-main__slider', {
      modules: [EffectFade, Navigation, Pagination, Autoplay],
      speed: 1000,
      effect: 'fade',
      simulateTouch: false,
      fadeEffect: {
         crossFade: true
      },
      navigation: {
         nextEl: '.hero-main__slider--next',
         prevEl: '.hero-main__slider--prev',
      },
      pagination: {
         el: '.hero-main__slider-pagination',
         type: 'bullets',
         clickable: true
      },
      autoplay: {
         delay: 5000,
         disableOnInteraction: false
      },
      on: {
         afterInit: function() {
            const slider = this;

            activeHeroSlide.textContent = slider.realIndex + 1; // выводится текущий индекс активного слайда в пагинации
            lengthHeroSlider.textContent = slider.slides.length; // выводится длина слайдера
         },
         slideChange: function() {
            const slider = this;
            const delay = slider.params.autoplay.delay;
            const progressLine = document.querySelector('.hero-main__slider-progressbar');

            activeHeroSlide.textContent = slider.realIndex + 1; // выводится текущий индекс активного слайда в пагинации

            clearTimeout(heroTimeout);
            progressLine.classList.remove('active');

            setTimeout(() => progressLine.classList.add('active'), 0);
            heroTimeout = setTimeout(() => {
               progressLine.classList.remove('active');
            }, delay);
         }
      },
      breakpoints: {
         769: {
            pagination: {
               enabled: false
            }
         }
      }
   });

   const reviewsSliders = document.querySelectorAll('.reviews__slider');
   if (reviewsSliders.length > 0) {
      reviewsSliders.forEach(slider => {
         const speed = parseInt(slider.dataset.speed);

         const reviewsSlider = new Swiper(slider, {
            modules: [Autoplay, FreeMode],
            slidesPerView: 'auto',
            freeMode: true,
            loop: true,
            speed,
            touchRatio: 0.6,
            grabCursor: true,
            autoplay: {
               delay: 0,
               disableOnInteraction: false
            }
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
         disableOnInteraction: false
      },
      breakpoints: {
         577: {
            centeredSlides: true,
         }
      }
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
         disableOnInteraction: false
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
         disableOnInteraction: false
      }
   });

   const certificateSlider = new Swiper('.without-brokers__slider', {
      modules: [Navigation, Autoplay],
      speed: 1000,
      simulateTouch: true,
      slidesPerView: 'auto',
      loop: true,
      navigation: {
         nextEl: '.without-brokers__btn-slider--next',
         prevEl: '.without-brokers__btn-slider--prev',
      },
      autoplay: {
         delay: 3000,
         disableOnInteraction: false
      }
   });
}                                   

export function productSlider() {
   const productsCardsSliders = document.querySelectorAll('.product-card__slider');
   productsCardsSliders.forEach(slider => {
      const sliderProduct = new Swiper(slider, {
         modules: [Navigation],
         simulateTouch: false,
         speed: 500,
         loop: true,
         loopPreventsSlide: true,
         navigation: {
            nextEl: '.product-card__slider-arrow--next',
            prevEl: '.product-card__slider-arrow--prev'
         }
      });
   });
}