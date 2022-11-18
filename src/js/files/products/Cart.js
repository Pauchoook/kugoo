export default class Cart {
   sumPrice = 0;
   numbers = 0;
   products = new Set();
   body = document.querySelector('.cart-drop__body');

   addProduct(id, img, title, price) {
      const emptinessCart = document.querySelector('.cart-drop__emptiness'); // шаблон пустой корзины
      if (emptinessCart) emptinessCart.remove();

      if (this.products.has(id)) {
         // если такой продукт уже есть в корзине
         const currentProduct = document.querySelector(`[data-product-cart="${id}"]`); // продукт в корзине
         const numbersCurrentProduct = currentProduct.querySelector('.cart-drop__card-content--numbers');
         let instanceProduct = numbersCurrentProduct.textContent.replace(/[^0-9]/g, ''); // кол-во экземпляров продукта

         // прибавляем экземпляр
         instanceProduct++;
         numbersCurrentProduct.textContent = `${instanceProduct} шт`;
      } else {
         // добавление продукта в коллекцию
         this.#createCard(id, img, title, price);
         this.products.add(id);
      }

      // прибавляем цену товара к общей сумме корзины
      this.sumPrice += price;
      this.numbers += 1;

      // вывод данных в DOM
      this.#panelCart(this.sumPrice, this.numbers);
   }

   deleteProduct(e) {
      const current = e.target;

      if (current.hasAttribute('delete-product')) {
         e.preventDefault();

         const currentProduct = current.closest('.cart-drop__card-product');
         const currentId = Number(currentProduct.getAttribute('data-product-cart'));
         const currentPrice = Number(currentProduct.querySelector('.cart-drop__card-content--price').textContent.replace(/[^0-9]/g, ''));
         const currentInstances = Number(currentProduct.querySelector('.cart-drop__card-content--numbers').textContent.replace(/[^0-9]/g, ''));

         if (currentInstances > 1) {
            const numbersCurrentProduct = currentProduct.querySelector('.cart-drop__card-content--numbers');
            let instanceProduct = numbersCurrentProduct.textContent.replace(/[^0-9]/g, ''); // кол-во экземпляров продукта
   
            // отнимаем экземпляр
            instanceProduct--;
            numbersCurrentProduct.textContent = `${instanceProduct} шт`;
         } else {
            currentProduct.remove();
            // удаляем из коллекции
            this.products.forEach(el => {
               if (el === currentId) this.products.delete(el);
            });
         }

         this.sumPrice -= currentPrice;
         this.numbers--;

         this.#panelCart(this.sumPrice, this.numbers);

         if (this.numbers === 0) {
            this.body.insertAdjacentHTML('afterbegin', `
               <div class="cart-drop__body">
                  <div class="cart-drop__emptiness">
                     <p class="cart-drop__emptiness-content">Ваша корзина пуста</p>
                     <a href="#" class="btn cart-drop__btn cart-drop__emptiness-btn">Перейти в каталог</a>
                  </div>
               </div>
            `);
         }
      }

   }

   #createCard(id, img, title, price) {
      // создание карточки продукта
      const cardProduct = document.createElement('div');
      cardProduct.classList.add('cart-drop__card-product');
      cardProduct.setAttribute('data-product-cart', id)

      const parentImgProduct = document.createElement('div');
      parentImgProduct.classList.add('cart-drop__card-parent-img');

      parentImgProduct.insertAdjacentHTML('afterbegin', `
         <img src="${img.src}" alt="${img.alt}" class="cart-drop__card-img">
      `);
      cardProduct.appendChild(parentImgProduct);

      const infoProduct = document.createElement('div');
      infoProduct.classList.add('cart-drop__card-info');
      infoProduct.insertAdjacentHTML('afterbegin', `
         <span class="cart-drop__card-title">${title}</span>
         <span class="cart-drop__card-content cart-drop__card-content--price">${price} ₽</span>
         <span class="cart-drop__card-content cart-drop__card-content--numbers">1 шт</span>
      `);
      cardProduct.appendChild(infoProduct);

      const deleteProduct = document.createElement('button');
      deleteProduct.classList.add('cart-drop__delete-btn');
      deleteProduct.setAttribute('delete-product', '');
      deleteProduct.insertAdjacentHTML('afterbegin', `
         <svg class="cart-drop__delete-icon">
            <use xlink:href='img/icons/icons.svg#icon-del'></use>
         </svg>
      `);
      cardProduct.appendChild(deleteProduct);

      this.body.appendChild(cardProduct);
   }

   #panelCart(price, num) {
      const sumPriceProducts = document.querySelector('#sum-drop-cart');
      const numbersProducts = document.querySelector('#numbers-products-drop-cart');

      sumPriceProducts.textContent = `${price} ₽`;
      numbersProducts.textContent = `${num} товаров`;
   }
}