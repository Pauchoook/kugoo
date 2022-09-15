import Swiper, {Navigation, Pagination, EffectFade, Autoplay} from 'swiper';

export async function slider() {
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
         disableOnInteraction: false,
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
}                                   

export function productSlider() {
   const productsCardsSliders = document.querySelectorAll('.product-card__slider');
   productsCardsSliders.forEach(slider => {
      const sliderProduct = new Swiper(slider, {
         modules: [Navigation],
         speed: 500,
         simulateTouch: false,
         loop: true,
         navigation: {
            nextEl: '.product-card__slider-arrow--next',
            prevEl: '.product-card__slider-arrow--prev'
         }
      });
   });
}