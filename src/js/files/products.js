import productsJSON from '../../files/products.json';
import { productSlider } from './sliders.js';
import Product from './products/Product.js';
import Cart from './products/Cart.js';

const cart = new Cart();

export function products() {
   // загрузка карточек при загрузке страницы
   const containerProducts = document.querySelectorAll('.container-products');
   if (containerProducts.length > 0) {
      containerProducts.forEach(container => {
         const maxLengthProducts = parseInt(container.dataset.lengthProducts); // макс кол-во карточек в контейнере

         window.addEventListener('load', () => {
            createCardProduct(productsJSON, 'Хиты продаж', maxLengthProducts, container);
         });
      });
   }

   // кнопки, переключающие товары
   const buttonsTypesProducts = document.querySelectorAll('.btn-product-type');
   if (buttonsTypesProducts.length > 0) {
      buttonsTypesProducts.forEach(btn => {
         btn.addEventListener('click', () => {
            if (!btn.classList.contains('_disabled')) {
               const parent = btn.closest('.products-buttons'); // родитель кнопки с айдишником нужного контейнера
               const idContainer = parent.dataset.btnsProducts;
               const typeProduct = btn.textContent;
               const containerCards = document.querySelector(`[data-container-products=${idContainer}]`);
               const maxLengthProducts = parseInt(containerCards.dataset.lengthProducts);

               containerCards.innerHTML = '<div class="preloader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
               containerCards.style.minHeight = '300px'; // нужно для того, чтобы прелоадер отображался нормально
               // имитация загрузки данных
               setTimeout(() => createCardProduct(productsJSON, typeProduct, maxLengthProducts, containerCards), 1000);
            }

            buttonsTypesProducts.forEach(btn => btn.classList.remove('_disabled', 'active'));
            btn.classList.add('active');
            if (!btn.classList.contains('_no-disabled')) btn.classList.add('_disabled');
         });
      });
   }

   // удаление карточек из корзины
   const bodyCart = document.querySelector('.cart-drop__body'); // блок с карточками
   bodyCart.addEventListener('click', (e) => {
      cart.deleteProduct(e);
   });
}

function createCardProduct(arr, whom, maxLength, container) {
   container.innerHTML = '';
   container.style.minHeight = 'auto';

   let i = 0;
   arr.forEach(item => {
      if (item.whom === whom) {
         // если указано количество карточек в контейнере, то прекратить при достижении лимита
         if (maxLength && i === maxLength) return;

         const cardProduct = document.createElement('div');
         cardProduct.classList.add('product-card');
         cardProduct.setAttribute('data-id', item.id);

         const product = new Product(cardProduct, item);
         container.appendChild(product.createCard());
         cardProduct.addEventListener('click', shoppingCartAdd);

         i++;
      }
   });

   productSlider();
}

function shoppingCartAdd(e) {
   const current = e.target;

   if (current.hasAttribute('add-cart')) {
      const cardProduct = current.closest('.product-card');
      const idCardProduct = parseInt(cardProduct.getAttribute('data-id'));
      const imgProduct = cardProduct.querySelector('.product-card__slider-img');
      const titleProduct = cardProduct.querySelector('.product-card__title').textContent;
      const priceProduct = cardProduct.querySelector('.product-card__price').textContent

      cart.addProduct(idCardProduct, imgProduct, titleProduct, Number(priceProduct.replace(/[^0-9]/g, '')));
   }
}