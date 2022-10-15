import productsJSON from '../../files/products.json';
import {productSlider} from './sliders.js';
import {Product, ProductCart} from './classes.js';

export function products() {
   const containerProducts = document.querySelectorAll('.container-products');
   if (containerProducts.length > 0) {
      containerProducts.forEach(container => {
         const maxLengthProducts = parseInt(container.dataset.lengthProducts); // макс кол-во карточек в контейнере
         const buttonsTypesProducts = document.querySelectorAll('.btn-product-type');

         buttonsTypesProducts.forEach(btn => {
            btn.addEventListener('click', () => {
               const typeProduct = btn.textContent;
               const containerCards = document.querySelector('.container-products');

               if (!btn.classList.contains('_disabled')) {
                  containerCards.innerHTML = ''; // очистка родительского контейнера перед загрузкой других карточек
                  createCardProduct(productsJSON, typeProduct);
               }

               buttonsTypesProducts.forEach(btn => btn.classList.remove('_disabled', 'active'));
               btn.classList.add('active');
               if (!btn.classList.contains('_no-disabled')) btn.classList.add('_disabled');
            });
         });

         // загрузка карточек при загрузке страницы
         document.addEventListener('DOMContentLoaded', () => {
            createCardProduct(productsJSON, 'Хиты продаж');
         });

         function createCardProduct(arr, whom) {
            let i = 0;
            arr.forEach(item => {
               if (item.whom === whom) {
                  // если указано количество карточек в контейнере, то прекратить при достижении лимита
                  if (maxLengthProducts && i === maxLengthProducts) return;

                  const cardProduct = document.createElement('div');
                  cardProduct.classList.add('product-card');
                  const product = new Product(cardProduct, item);
                  container.appendChild(product.createCard());

                  i++;
               }
            });

            productSlider();
            shoppingCartAdd();
         }
      });
   }
}

export function shoppingCartDelete() {
   const bodyCart = document.querySelector('.cart-drop__body'); // блок с карточками
   const priceCart = document.querySelector('#sum-drop-cart');
   const numbersProductsCart = document.querySelector('#numbers-products-drop-cart');

   // удаление товаров из корзины
   bodyCart.addEventListener('click', e => {

      if (e.target.classList.contains('cart-drop__delete-btn')) {
         e.preventDefault();

         let sumPriceCart = parseInt(priceCart.dataset.value); // общая сумма корзины
         let numbersProducts = parseInt(numbersProductsCart.dataset.value); // кол-во товаров в корзине

         const currentCart = e.target.closest('.cart-drop__card-product');
         const priceCurrentCart = currentCart.querySelector('.cart-drop__card-content--price').textContent.replace(/[^0-9]/g, '');

         sumPriceCart -= parseInt(priceCurrentCart);
         priceCart.setAttribute('data-value', sumPriceCart);
         numbersProducts -= 1;
         numbersProductsCart.setAttribute('data-value', numbersProducts);

         panelCart(sumPriceCart, numbersProducts)

         currentCart.remove(); // удаление карточки

         // когда товаров 0 появляется шаблон
         const carts = bodyCart.querySelectorAll('.cart-drop__card-product');
         if (!carts.length) {
            bodyCart.insertAdjacentHTML('afterbegin', `
                   <div class="cart-drop__body">
                       <div class="cart-drop__emptiness">
                           <p class="cart-drop__emptiness-content">Ваша корзина пуста</p>
                           <a href="#" class="btn cart-drop__btn cart-drop__emptiness-btn">Перейти в каталог</a>
                       </div>
                   </div>
               `);
         }
      }
   });
}

export function shoppingCartAdd() {
   const bodyCart = document.querySelector('.cart-drop__body'); // блок с карточками
   const priceCart = document.querySelector('#sum-drop-cart');
   const numbersProductsCart = document.querySelector('#numbers-products-drop-cart');
   const addCartButtons = document.querySelectorAll('.product-card__nav-btn');

   let sumPriceCart = parseInt(priceCart.dataset.value); // общая сумма корзины
   let numbersProducts = parseInt(numbersProductsCart.dataset.value); // кол-во товаров в корзине

   addCartButtons.forEach(btn => {
       btn.addEventListener('click', () => {
         const emptinessCart = document.querySelector('.cart-drop__emptiness'); // шаблон пустой корзины
         const cardProduct = btn.closest('.product-card');
         const idCardProduct = cardProduct.getAttribute('data-id');
         const imgProduct = cardProduct.querySelector('.product-card__slider-img').src;
         const titleProduct = cardProduct.querySelector('.product-card__title').textContent;
         const priceProduct = cardProduct.querySelector('.product-card__price').textContent;

         if (emptinessCart) emptinessCart.remove();

         // панель корзины
         sumPriceCart += parseInt(priceProduct);
         priceCart.setAttribute('data-value', sumPriceCart);
         numbersProducts++;
         numbersProductsCart.setAttribute('data-value', numbersProducts);
         panelCart(sumPriceCart, numbersProducts);

         // добавление товара в корзину
         const productCart = document.createElement('a');
         const product = new ProductCart(productCart, { idCardProduct, imgProduct, titleProduct, priceProduct });

         bodyCart.appendChild(product.createProduct());
         console.log(sumPriceCart, numbersProducts);
       });
   });
}

export function panelCart(price, numbers) {
   const priceCart = document.querySelector('#sum-drop-cart');
   const numbersProductsCart = document.querySelector('#numbers-products-drop-cart');
   const endNumber = parseInt(numbers.toString().split('').pop());

   let contentProduct = '';

   if (endNumber === 1) {
      contentProduct = 'товар';
   } else if (endNumber === 0 || endNumber >= 5) {
      contentProduct = 'товаров';
   } else {
      contentProduct = 'товара';
   }

   priceCart.textContent = `${price}₽`;
   numbersProductsCart.textContent = `${numbers} ${contentProduct}`;
}