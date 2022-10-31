import waterproofingSettingJSON from '../../files/waterproofing-and-setting.json';
import { popup } from './functions.js';

// гидроизоляция и настройка
export function waterproofingSetting() {
   const containersPrices = document.querySelectorAll('.container-price');
   if (containersPrices.length > 0) {
      containersPrices.forEach(container => {
         window.onload = () => {
            const containerType = container.dataset.typePrice;
            renderItems(waterproofingSettingJSON, container, containerType);
         }
      });
   }

   const buttonsPrices = document.querySelectorAll('.btn-price');
   if (buttonsPrices.length > 0) {
      buttonsPrices.forEach(btn => {
         btn.addEventListener('click', () => {
            if (!btn.classList.contains('_disabled')) {
               const btnType = btn.dataset.btnPrice;
               const parentContainer = btn.closest('.prices-buttons');
               const idContainer = parentContainer.dataset.btnsPrices;
               const containerPrices = document.querySelector(`[data-container-prices=${idContainer}]`);

               containerPrices.innerHTML = '<div class="preloader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
               // имитация загрузки данных
               setTimeout(() => renderItems(waterproofingSettingJSON, containerPrices, btnType), 1000);
            }

            buttonsPrices.forEach(btn => btn.classList.remove('active', '_disabled'));
            btn.classList.add('active', '_disabled');
         });
      });
   }

   function renderItems(array, container, type) {
      container.innerHTML = '';

      const listPrice = document.createElement('ul');
      listPrice.classList.add('waterproofing-setting__list');

      array.forEach(obj => {
         if (obj.type === type) {
            const itemPrice = document.createElement('li');
            itemPrice.classList.add('waterproofing-setting__item');
      
            itemPrice.insertAdjacentHTML('afterbegin', `
               <span class="waterproofing-setting__name-product">${obj.name}</span>
               <span class="waterproofing-setting__price-product">${obj.price}</span>
            `);

            listPrice.appendChild(itemPrice);
         }
      });

      // кнопка "заказать"
      const btnOrder = document.createElement('button');
      btnOrder.classList.add('btn', 'waterproofing-setting__btn-order', 'popup-btn');
      btnOrder.setAttribute('data-popup-btn', 'order-waterproofing-setting');

      const orderPopup = document.querySelector('[data-popup="order-waterproofing-setting"]');
      const titlePopup = orderPopup.querySelector('.waterproofing-setting__popup-title');
      const modelsProducts = orderPopup.querySelector('.select__item'); // item селекта "выберите модель" в модалке
      const btnOrderPopup = orderPopup.querySelector('.waterproofing-setting__btn-form');

      switch (type) {
         case 'waterproofing':
            btnOrder.textContent = 'Заказать гидроизоляцию';
            btnOrderPopup.textContent = 'Заказать гидроизоляцию';
            titlePopup.textContent = 'Закажите гидроизоляцию и катайтесь на своем самокате в любую погоду!';
            break;
         case 'setting':
            btnOrder.textContent = 'Заказать настройку';
            btnOrderPopup.textContent = 'Заказать настройку';
            titlePopup.textContent = 'Закажите настройку электросамоката перед покупкой';
            break;
         case 'waterproofing-setting':
            btnOrder.textContent = 'Заказать настройку и гидроизоляцию';
            btnOrderPopup.textContent = 'Заказать';
            titlePopup.textContent = 'Закажите «настройку + гидроизоляцию» и сэкономьте до 1 000 руб.';
            break;
      }

      // добавление моделей самокатов в item селекта
      array.forEach(product => {
         const li = document.createElement('li');
         li.classList.add('select__element', 'simple-select__element');
         li.textContent = product.name;

         modelsProducts.appendChild(li);
      });

      container.appendChild(listPrice);
      container.appendChild(btnOrder);

      // инициализация кнопки для вызова модалки
      popup();
   }
}