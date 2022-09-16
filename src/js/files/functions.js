import productsJSON from '../../files/products.json';
import {productSlider} from './sliders.js';
import {Product, ProductCart} from './classes.js';

export function mediaAdaptive() {
    function DynamicAdapt(type) {
        this.type = type;
    }
    
    DynamicAdapt.prototype.init = function () {
        const _this = this;
        // массив объектов
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        // массив DOM-элементов
        this.nodes = document.querySelectorAll("[data-da]");
    
        // наполнение оbjects объктами
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
    
        this.arraySort(this.оbjects);
    
        // массив уникальных медиа-запросов
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (element) {
            return '(' + this.type + "-width: " + element.breakpoint + "px)," + element.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (element, index, self) {
            return Array.prototype.indexOf.call(self, element) === index;
        });
    
        // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
    
            // массив объектов с подходящим брейкпоинтом
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (element) {
                return element.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    
    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };
    
    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }
    
    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }
    
    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }
    
                    return a.place - b.place;
                }
    
                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }
    
                    return b.place - a.place;
                }
    
                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };
    
    const da = new DynamicAdapt("max");
    da.init();
}

export function dropdown() {
    const buttonsDrop = document.querySelectorAll('.drop-btn')
    if (buttonsDrop.length > 0) {
        buttonsDrop.forEach(btn => {
            const drops = document.querySelectorAll('.drop');
            const idDrop = btn.dataset.dropBtn;
            const currentDrop = document.querySelector(`[data-drop="${idDrop}"]`);

            btn.addEventListener('click', () => {
                if (!currentDrop.classList.contains('open')) {
                    drops.forEach(e => e.classList.remove('open'));
                    currentDrop.classList.add('open');
                } else {
                    currentDrop.classList.remove('open');
                }
            });

            document.addEventListener('click', e => {
                if (e.target !== currentDrop && e.target !== btn && !e.target.closest('.drop')) {
                    currentDrop.classList.remove('open');
                }
            });
        });
    }
}

export function dropHover() {
   const drops = document.querySelectorAll('.dropdown-hover');
   if (drops.length > 0) {
      drops.forEach(drop => {
        const tooltipWindow = drop.querySelector('.dropdown-hover__item');
         drop.addEventListener('mouseover', () => {
            tooltipWindow.classList.add('open');
         });
         drop.addEventListener('mouseout', () => {
            tooltipWindow.classList.remove('open');
         });
      });
   }  
}

export function tab() {
   const tabs = document.querySelectorAll('.tab');
   if(tabs.length > 0) {
      const buttonsTabs = document.querySelectorAll('.tab-btn');

      buttonsTabs.forEach(btn => {
         btn.addEventListener('click', e => {
            const idTab = e.currentTarget.dataset.tabBtn;
            const currentTab = document.querySelector(`[data-tab=${idTab}]`);

            tabs.forEach(tab => tab.classList.remove('open'));
            currentTab.classList.add('open');

            buttonsTabs.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
         });
      });
   }
}

export function select() {
    const buttonsSelect = document.querySelectorAll('.select__btn');
    if (buttonsSelect.length > 0) {
        const itemsSelect = document.querySelectorAll('.select__item');
        const elementsSelect = document.querySelectorAll('.select__element');

        buttonsSelect.forEach(btn => {
            const parent = btn.closest('.select');
            const currentItem = parent.querySelector('.select__item');

            btn.addEventListener('click', () => {
                if (!currentItem.classList.contains('open')) {
                    buttonsSelect.forEach(btn => btn.classList.remove('active'));
                    btn.classList.add('active');

                    itemsSelect.forEach(item => item.classList.remove('open'));
                    currentItem.classList.add('open');
                } else {
                    currentItem.classList.remove('open');
                    btn.classList.remove('active');
                }
            });

            document.addEventListener('click', e => {
                if (e.target !== btn) {
                    currentItem.classList.remove('open');
                    btn.classList.remove('active');
                }
            });
        });

        elementsSelect.forEach(element => {
            let currentTitle;

            element.addEventListener('click', () => {
                const parent = element.closest('.select');
                const titleSelect = parent.querySelector('.select__title');

                setTimeout(() => {
                    currentTitle = element.textContent;
                    element.textContent = titleSelect.textContent;
                    titleSelect.textContent = currentTitle;
                }, 0);
            });
        });
   }
}

export function burger() {
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const header = document.querySelector('.header');
        const headerCenter = document.querySelector('.header-center');
        const burgerBtn = document.querySelector('#burger-btn');

        burgerBtn.addEventListener('click', () => {
            if (!burgerMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
                burgerBtn.classList.add('active');
                burgerMenu.classList.add('open');
                
                burgerHeight();
            } else {
                document.body.style.overflow = 'visible';
                burgerBtn.classList.remove('active');
                burgerMenu.classList.remove('open');
            }
        });

        function burgerHeight() {
            const headerHeight = headerCenter.classList.contains('fixed') ? headerCenter.clientHeight : header.clientHeight; // отступ для меню бургера сверху
            const burgerHeight = window.outerHeight - headerHeight; // высота меню бургера(иначе оно не перекрывает нижнее меню)

            burgerMenu.style.height = `${burgerHeight}px`;
            burgerMenu.style.top = `${headerHeight}px`;
        }
    }
}

export function popup() {
    const buttonsPopup = document.querySelectorAll('.popup-btn');
    if (buttonsPopup.length > 0) {
        buttonsPopup.forEach(btn => {
            const idPopup = btn.dataset.popupBtn;
            const currentPopup = document.querySelector(`[data-popup=${idPopup}]`);
            const popupWindow = currentPopup.querySelector('.popup__window');
            const popupClose = currentPopup.querySelector('.popup__close');
            const heightPopup = popupWindow.clientHeight;

            btn.addEventListener('click', () => {
                document.body.style.overflow = 'hidden'
                currentPopup.classList.add('open');
            });
            
            document.addEventListener('click', e => {
                if (e.target.hasAttribute('data-close-popup')) {
                    closePopup();
                }
            });
            document.addEventListener('DOMContentLoaded', resizePopup);
            window.addEventListener('resize', resizePopup);

            function resizePopup() {
                if (heightPopup >= window.innerHeight) {
                    const height = window.innerHeight - 60;

                    popupWindow.style.height = `${height}px`;
                    popupWindow.classList.add('scroll');
                }
            }

            function closePopup() {
                document.body.style.overflow = 'visible'
                currentPopup.classList.add('hide');
                setTimeout(() => {
                    currentPopup.classList.remove('hide');
                    currentPopup.classList.remove('open');
                }, 500);
            }
        });
    }
}

export function maskNumber() {
    const maskNumbers = document.querySelectorAll('[data-phone-pattern]');
    if (maskNumbers.length > 0) {
        maskNumbers.forEach(input => {
            for (let ev of ['input', 'focus']) {
                input.addEventListener(ev, eventCalllback);
            }
        });

        function eventCalllback(e) {
            let el = e.target,
                pattern = el.dataset.phonePattern,
                matrix = pattern,
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = e.target.value.replace(/\D/g, "");

            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
        }
    }
}

export function validateForm() {
    const forms = document.querySelectorAll('.form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', e => {
                const inputsForm = form.querySelectorAll('input');

                inputsForm.forEach(input => {
                    // в data-length записываем точное кол-во символов, которые должны быть в инпуте
                    const valueLength = input.getAttribute('data-length');
                    if (valueLength) {
                        if (input.value.length < valueLength || input.value.length > valueLength) {
                            e.preventDefault();
                            input.classList.add('error');
                        } else {
                            input.classList.remove('error');
                        }
                    } else {
                        if (input.value === '') {
                            e.preventDefault();
                            input.classList.add('error');
                        } else {
                            input.classList.remove('error');
                        }
                    }

                    // если чекбокс
                    if (input.type === 'checkbox') {
                        const inputLabel = input.nextElementSibling;
                        if (!input.checked) {
                            e.preventDefault();
                            inputLabel.classList.add('error');
                        } else {
                            inputLabel.classList.remove('error');
                        }
                    }
                });
            });
        });
    }
}

export function fixedHeader() {
    const header = document.querySelector('.header');
    const headerCenter = document.querySelector('.header-center');
    const headerHeight = header.clientHeight;
    const headerPos = headerCenter.getBoundingClientRect().y;

    window.addEventListener('scroll', () => {
        const windowPos = window.pageYOffset;

        if (windowPos > headerPos) { // если прокрутка ниже header
            if (!headerCenter.classList.contains('fixed')) {
                header.style.height = headerHeight + 'px'; // чтобы страница не смещалась вверх
                headerCenter.classList.add('fixed');
            }
        } else {
            headerCenter.classList.remove('fixed');
            header.style.height = 'auto';
        }
    });
}

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
                    console.log('type button:', typeProduct);

                    if(!btn.classList.contains('_disabled')) {
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
                        // если указано количество карточек в контейнере, то прекратить при переполнении
                        if (maxLengthProducts && i === maxLengthProducts) return;
                        
                        const product = new Product(item);
                        container.appendChild(product.createCard());

                        i++;
                    }
                });

                productSlider()
            }
        });
    }
}

export async function shoppingCart() {
    document.addEventListener('DOMContentLoaded', () => {
        const bodyCart = document.querySelector('.cart-drop__body');
        const emptinessCart = document.querySelector('.cart-drop__emptiness');
        const priceCart = document.querySelector('#sum-drop-cart');
        const numbersProductsCart = document.querySelector('#numbers-products-drop-cart');
        const addCartButtons = document.querySelectorAll('.product-card__nav-btn');

        if (addCartButtons.length > 0) {
            const setCart = new Set();

            let sumPriceCart = 0; // общая сумма корзины
            let numbersProducts = 0; // кол-во товаров в корзине

            addCartButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const cardProduct = btn.closest('.product-card');
                    const idCardProduct = cardProduct.getAttribute('data-id');
                    const imgProduct = cardProduct.querySelector('.product-card__slider-img').src;
                    const titleProduct = cardProduct.querySelector('.product-card__title').textContent;
                    const priceProduct = cardProduct.querySelector('.product-card__price').textContent;

                    if (emptinessCart) emptinessCart.remove();
                    
                    // панель корзины
                    sumPriceCart += parseInt(priceProduct);
                    numbersProducts++;
                    panelCart(sumPriceCart, numbersProducts);

                    if (!setCart.has(cardProduct)) {
                        const productCart = new ProductCart();
                        bodyCart.appendChild(productCart.createProduct(idCardProduct, imgProduct, titleProduct, priceProduct));

                        setCart.add(cardProduct);
                    } else {
                        const productsCart = document.querySelectorAll('.cart-drop__card-product'); // карточки в корзине
                        const idProductCart = Array.from(productsCart).findIndex(item => item.getAttribute('data-id') === idCardProduct);  // id краточки
                        const currentProductCart = productsCart[idProductCart]; // текущая карточка
                        const numbersCurrentProducts = currentProductCart.querySelector('.numbers-product'); // кол-во экземпляров текущей карточки в корзине
                        
                        numbersCurrentProducts.textContent = parseInt(numbersCurrentProducts.textContent) + 1;
                    }
                    deleteProductsCart();
                });
            });

            function deleteProductsCart() {
                const deleteCartButtons = document.querySelectorAll('.cart-drop__delete-btn');
                if (deleteCartButtons.length > 0) {
                    deleteCartButtons.forEach(btn => {
                        btn.addEventListener('click', () => {
                            const currentProduct = btn.closest('.cart-drop__card-product'); // текущая карточка, которую собираемся удалить
                            const currentPriceProduct = currentProduct.querySelector('.cart-drop__card-content--price').textContent.replace(/[^0-9]/g, ''); // цена

                            console.log(currentPriceProduct);

                            // панель корзины
                            sumPriceCart -= parseInt(currentPriceProduct);
                            numbersProducts--;
                            panelCart(sumPriceCart, numbersProducts);

                            currentCard.remove();

                            // удалить из коллекции 
                        });
                    });
                }
            }

            function panelCart(price, numbers) {
                let contentProduct = numbers === 1 ? 'товар': 'товара';

                priceCart.textContent = `${price}₽`;
                numbersProductsCart.textContent = `${numbers} ${contentProduct}`;
            }
        }
    });
}