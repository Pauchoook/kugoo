export default function basketPage() {
  const basket = document.querySelector('.basket');
  if (basket) {
    const productsCards = basket.querySelectorAll('.basket__product-card');
    const clearBasket = basket.querySelector('.clear-basket');
    const basketPrice = basket.querySelector('.basket__sidebar-price');
    const basketWrapper = basket.querySelector('.basket__wrapper');
    const btnSidebar = basket.querySelector('.basket__sidebar-btn');
    const basketCount = basket.querySelector('.basket__count');
    const basketTable = basket.querySelector('.basket__table');
    const basketArrange = basket.querySelector('.basket__arrange');
    const basketPrev = basket.querySelector('.basket__prev');
    const basketFormInputs = basket.querySelectorAll('.form__input');
    const basketFormLabels = basket.querySelectorAll('label');
    const basketDiscount = basket.querySelector('#sum-discount');
    const basketResult = basket.querySelector('#result-basket');

    clearBasket.addEventListener('click', () => {
      basketWrapper.innerHTML = `
      <div class="basket__empty">
        <img src="./img/pictures/empty-basket.svg" alt="Корзина" class="basket__empty-img">
        <h3 class="title-3 basket__empty-title">Ваша корзина пуста</h3>
        <p class="basket__empty-content">Ваша корзина пуста</p>
        <a href="catalog.html" class="btn basket__empty-btn">Перейти в каталог</a>
      </div>
      `;
      basketCount.remove();
    });

    btnSidebar.addEventListener('click', () => {
      if (btnSidebar.type === 'button') {
        window.scrollTo(0,0);
      }

      setTimeout(() => (btnSidebar.type = 'submit'), 0); // чтобы форма не сабмитилась сразу

      basketTable.style.display = 'none';
      basketArrange.style.display = 'block';

      basketPrev.style.display = 'flex';

      btnSidebar.textContent = 'Подтвердить заказ';
    });

    // обработчик события для возврата назад
    basketPrev.addEventListener('click', () => {
      basketTable.style.display = 'block';
      basketArrange.style.display = 'none';

      btnSidebar.type = 'button';
      btnSidebar.textContent = 'Оформить заказ';

      // убираем error у формы, если есть
      basketFormInputs.forEach((input) => input.classList.contains('error') && input.classList.remove('error'));
      basketFormLabels.forEach((label) => label.classList.contains('error') && label.classList.remove('error'));
    });

    productsCards.forEach((product) => {
      const productDelete = product.querySelector('.basket__product-del');
      const productCount = product.querySelector('.basket__product-count');
      const productNumber = product.querySelector('.basket__product-count-num');

      productDelete.addEventListener('click', () => {
        const length = document.querySelectorAll('.basket__product-card').length;

        if (length === 1) {
          basketWrapper.innerHTML = `
          <div class="basket__empty">
            <img src="img/pictures/empty-basket.svg" alt="Корзина" class="basket__empty-img">
            <h3 class="title-3 basket__empty-title">Ваша корзина пуста</h3>
            <p class="basket__empty-content">Ваша корзина пуста</p>
            <a href="catalog.html" class="btn basket__empty-btn">Перейти в каталог</a>
          </div>
          `;
          basketCount.remove();
        } else {
          product.remove();
          sumBasket();
        }
      });

      productCount.addEventListener('click', (e) => {
        if (e.target.classList.contains('increment')) {
          productNumber.textContent = +productNumber.textContent + 1;
        }
        if (e.target.classList.contains('decrement') && +productNumber.textContent > 1) {
          productNumber.textContent = +productNumber.textContent - 1;
        }
        sumBasket();
      });
    });

    function sumBasket() {
      // логика сайдбара
      const products = basket.querySelectorAll('.basket__product-card');
      let allPrice = 0;
      let count = 0;

      products.forEach((product) => {
        const currentPrice = product.querySelector('.basket__product-price');
        const currentCount = product.querySelector('.basket__product-count-num');

        const sum = +currentCount.textContent.replace(/[^0-9]/g, '') * +currentPrice.textContent.replace(/[^0-9]/g, '');
        allPrice += sum;
        count += +currentCount.textContent.replace(/[^0-9]/g, '');
      });

      const discount = (allPrice / 100) * 13;

      basketPrice.textContent = `${allPrice} ₽`;
      basketCount.textContent = `${count} товаров`;
      basketDiscount.textContent = `${discount} ₽`;
      basketResult.textContent = `${allPrice - discount} ₽`;
    }

    sumBasket();
  }
}
