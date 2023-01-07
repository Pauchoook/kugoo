export default class Product {
   constructor(card, options) {
      this.cardProduct = card;
      this.options = options;
   }

   createCard() {
      this.cardProduct.insertAdjacentHTML('afterbegin', `
         <button class="product-card__compare">
               <svg class="product-card__compare-icon">
                  <use xlink:href='img/icons/icons.svg#icon-balance-scale'></use>
               </svg>
         </button>
         <div class="product-card__body">
            <h4 class="title-4 product-card__title">
               ${this.options.name}
            </h4>
            <ul class="product-card__characteristic-list">
               <li class="product-card__characteristic-item">
                  <svg class="product-card__characteristic-icon">
                        <use xlink:href='img/icons/icons.svg#icon-accumulator'></use>
                  </svg>
                  <span class="product-card__characteristic-content">${this.options.battery} mAh</span>
               </li>
               <li class="product-card__characteristic-item">
                  <svg class="product-card__characteristic-icon">
                        <use xlink:href='img/icons/icons.svg#icon-lightning'></use>
                  </svg>
                  <span class="product-card__characteristic-content">${this.options.horsepower} л.с.</span>
               </li>
               <li class="product-card__characteristic-item">
                  <svg class="product-card__characteristic-icon">
                        <use xlink:href='img/icons/icons.svg#icon-speedometer'></use>
                  </svg>
                  <span class="product-card__characteristic-content">${this.options.maxSpeed} км/ч</span>
               </li>
               <li class="product-card__characteristic-item">
                  <svg class="product-card__characteristic-icon">
                        <use xlink:href='img/icons/icons.svg#icon-timer'></use>
                  </svg>
                  <span class="product-card__characteristic-content">${this.options.timeCharging} часов</span>
               </li>
            </ul>
            <div class="product-card__nav">
               <div class="product-card__nav-buttons">
                  <button add-cart class="product-card__nav-btn">
                     <svg class="product-card__btn-icon">
                        <use xlink:href='img/icons/icons.svg#icon-shopping-cart-2'></use>
                     </svg>
                  </button>
                  <button class="product-card__nav-btn">
                     <svg class="product-card__btn-icon">
                        <use xlink:href='img/icons/icons.svg#icon-heart'></use>
                     </svg>
                  </button>
               </div>
            </div>
            <a href="error.html" class="btn product-card__btn">Купить в 1 клик</a>
         </div>
      `);

      this.#createSlider(this.cardProduct, this.options.images);
      this.#createType(this.cardProduct, this.options.type);
      this.#createPrice(this.cardProduct, this.options.price);

      return this.cardProduct;
   }

   #createSlider(card ,images) {
      const slider = document.createElement('div');
      slider.classList.add('swiper', 'product-card__slider');

      slider.insertAdjacentHTML('afterbegin', `
         <button class="slider-btn slider-btn--prev product-card__slider-arrow product-card__slider-arrow--prev">
               <svg class="product-card__slider-icon-arrow">
                  <use xlink:href='img/icons/icons.svg#icon-arrow'></use>
               </svg>
         </button>
         <button class="slider-btn product-card__slider-arrow product-card__slider-arrow--next">
               <svg class="product-card__slider-icon-arrow">
                  <use xlink:href='img/icons/icons.svg#icon-arrow'></use>
               </svg>
         </button>
      `);

      // создание wrapper и добавление его в slider
      const sliderWrapper = document.createElement('div');
      sliderWrapper.classList.add('swiper-wrapper');

      slider.appendChild(sliderWrapper)

      // добавление айтемов в слайдер
      images.forEach(img => {
         const sliderItem = document.createElement('a');
         sliderItem.href = 'product.html';
         sliderItem.classList.add('swiper-slide', 'product-card__slider-item');

         const sliderImg = document.createElement('img');
         sliderImg.classList.add('product-card__slider-img');
         sliderImg.src = img;
         sliderImg.alt = 'scooter';

         sliderItem.appendChild(sliderImg);
         sliderWrapper.appendChild(sliderItem);
      });

      card.insertBefore(slider, card.querySelector('.product-card__body'));
   }

   #createType(card, type) {
      if (type) {
         const typeCard = document.createElement('span');
         typeCard.classList.add('product-card__type');
   
         switch (type) {
             case 'new': 
                 typeCard.classList.add('product-card__type--new');
                 typeCard.textContent = 'Новинка';
                 break;
             case 'hit': 
                 typeCard.classList.add('product-card__type--hit');
                 typeCard.textContent = 'Хит';
                 break;
         }
   
         card.insertBefore(typeCard, card.querySelector('.product-card__body'));
      }
   }

   #createPrice(card, price) {
      const navPrice = document.createElement('div');
      navPrice.classList.add('product-card__nav-price');

      navPrice.insertAdjacentHTML('afterbegin', `
          <span class="product-card__price">
              ${price.newPrice || price} ₽
          </span>
      `);

      if (price.oldPrice) {
         const oldPrice = document.createElement('span');

         oldPrice.classList.add('product-card__old-price');
         oldPrice.textContent = `${price.oldPrice}₽`;

         navPrice.insertBefore(oldPrice, navPrice.querySelector('.product-card__price'));
      }

      const cardProductNav = card.querySelector('.product-card .product-card__nav');
      cardProductNav.insertBefore(navPrice, cardProductNav.querySelector('.product-card__nav-buttons'));
   }
}