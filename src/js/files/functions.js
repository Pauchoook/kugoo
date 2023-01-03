export function mediaAdaptive() {
  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = '_dynamic_adapt_';
    // массив DOM-элементов
    this.nodes = document.querySelectorAll('[data-da]');

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(',');
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(
      this.оbjects,
      function (element) {
        return '(' + this.type + '-width: ' + element.breakpoint + 'px),' + element.breakpoint;
      },
      this,
    );
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
  };

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  };

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === 'min') {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }

          if (a.place === 'last' || b.place === 'first') {
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

          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }

          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt('max');
  da.init();
}

export function dropdown() {
  const buttonsDrop = document.querySelectorAll('.drop-btn');
  if (buttonsDrop.length > 0) {
    const drops = document.querySelectorAll('.drop');
    buttonsDrop.forEach((btn) => {
      const idDrop = btn.dataset.dropBtn;
      const currentDrop = document.querySelector(`[data-drop="${idDrop}"]`);

      btn.addEventListener('click', () => {
        if (!currentDrop.classList.contains('open')) {
          drops.forEach((e) => e.classList.remove('open'));
          currentDrop.classList.add('open');
        } else {
          currentDrop.classList.remove('open');
        }
      });

      document.addEventListener('click', (e) => {
        if (e.target !== currentDrop && e.target !== btn && !e.target.closest('.drop')) {
          currentDrop.classList.remove('open');
        }
      });
    });
  }
}

export function tab() {
  const tabs = document.querySelectorAll('.tab');
  if (tabs.length > 0) {
    const buttonsTabs = document.querySelectorAll('.tab-btn');

    buttonsTabs.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idTab = e.currentTarget.dataset.tabBtn;
        const currentTab = document.querySelector(`[data-tab=${idTab}]`);
        const parentTab = btn.closest('.tab');
        const childsButtonsTabs = parentTab && parentTab.querySelectorAll('.tab-btn');

        // если открываем таб в табе
        if (parentTab) {
          const childTabs = parentTab.querySelectorAll('.tab');

          // закрываем только внутренние табы
          childTabs.forEach((tab) => tab.classList.remove('open'));
          // активная кнопка только внутренняя
          childsButtonsTabs.forEach((btn) => {
            btn.classList.remove('active');
          });
        } else {
          tabs.forEach((tab) => {
            // при закрытии родительского таба, дочерний таб остается открытым
            if (!tab.classList.contains('child')) tab.classList.remove('open');
          });
          buttonsTabs.forEach((btn) => {
            // активные кнопки в дочерних табах остаются активными
            if (!btn.closest('.tab')) btn.classList.remove('active');
          });
        }

        currentTab.classList.add('open');
        btn.classList.add('active');
      });
    });
  }
}

export function select() {
  const buttonsSelect = document.querySelectorAll('.select__btn');
  if (buttonsSelect.length > 0) {
    const itemsSelect = document.querySelectorAll('.select__item');

    let currentTitle = '';

    buttonsSelect.forEach((btn) => {
      const parent = btn.closest('.select');
      const currentItem = parent.querySelector('.select__item');

      btn.addEventListener('click', () => {
        if (!currentItem.classList.contains('open')) {
          buttonsSelect.forEach((btn) => btn.classList.remove('active'));
          btn.classList.add('active');

          itemsSelect.forEach((item) => item.classList.remove('open'));
          currentItem.classList.add('open');
        } else {
          currentItem.classList.remove('open');
          btn.classList.remove('active');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('select__btn')) {
        itemsSelect.forEach((item) => item.classList.remove('open'));
        buttonsSelect.forEach((btn) => btn.classList.remove('active'));
      }
    });

    itemsSelect.forEach((item) => {
      item.addEventListener('click', (e) => {
        const select = e.target.closest('.select');
        const selectValue = select.querySelector('.select__value');
        const currentBtn = e.target;

        if (item.classList.contains('color')) {
          const colorSelect = select.querySelector('.select__color');

          const currentColor = colorSelect.className.split(' ').pop();
          const btnColor = currentBtn.className.split(' ').pop();

          // добавляем цвет в заголовок и удаляем старый
          colorSelect.classList.remove(currentColor);
          colorSelect.classList.add(btnColor);

          // добавляем цвет к кнопке и удаляем старый
          currentBtn.classList.remove(btnColor);
          currentBtn.classList.add(currentColor);
        } else {
          setTimeout(() => {
            const titleSelect = select.querySelector('.select__title');
            currentTitle = currentBtn.innerText;
            if (
              !titleSelect.textContent.toLowerCase().includes('выберите') &&
              !titleSelect.textContent.toLowerCase().includes('откуда')
            ) {
              currentBtn.textContent = titleSelect.textContent;
            } else {
              currentBtn.remove();
            }

            titleSelect.textContent = currentTitle;

            if (selectValue) selectValue.value = currentTitle;
          }, 0);
        }
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
        document.body.classList.add('hidden');
        burgerBtn.classList.add('active');
        burgerMenu.classList.add('open');

        burgerHeight();
      } else {
        document.body.classList.remove('hidden');
        burgerBtn.classList.remove('active');
        burgerMenu.classList.remove('open');
      }
    });

    window.addEventListener('resize', burgerHeight);

    function burgerHeight() {
      const headerHeight = headerCenter.classList.contains('fixed') ? headerCenter.clientHeight : header.clientHeight; // отступ для меню бургера сверху
      const burgerHeight = window.innerHeight - headerHeight; // высота меню бургера(иначе оно не перекрывает нижнее меню)

      burgerMenu.style.height = `${burgerHeight}px`;
      burgerMenu.style.top = `${headerHeight}px`;
    }
  }
}

export function popup() {
  const buttonsPopup = document.querySelectorAll('.popup-btn');
  if (buttonsPopup.length > 0) {
    buttonsPopup.forEach((btn) => {
      const idPopup = btn.dataset.popupBtn;
      const currentPopup = document.querySelector(`[data-popup=${idPopup}]`);
      const popupWindow = currentPopup.querySelector('.popup__window');
      const heightPopup = popupWindow.clientHeight;

      btn.addEventListener('click', () => {
        topPopup();

        document.body.classList.add('hidden');
        currentPopup.classList.add('open');
      });

      for (let ev of ['load', 'resize']) {
        window.addEventListener(ev, topPopup);
      }

      function topPopup() {
        const popupTop = (window.innerHeight - heightPopup) / 2;
        popupWindow.style.marginTop = `${popupTop >= 20 ? popupTop : 20}px`;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('close-popup')) {
        closePopup(e.target.closest('.popup'));
      }
    });

    function closePopup(popup) {
      document.body.classList.remove('hidden');
      popup.classList.add('hide');
      setTimeout(() => {
        popup.classList.remove('hide');
        popup.classList.remove('open');
      }, 500);
    }
  }
}

export function maskNumber() {
  const maskNumbers = document.querySelectorAll('[data-phone-pattern]');
  if (maskNumbers.length > 0) {
    maskNumbers.forEach((input) => {
      for (let ev of ['input', 'focus', 'blur']) {
        input.addEventListener(ev, eventCalllback);
      }
      input.addEventListener('blur', () => {
        if (input.value.length <= 2) {
          input.value = '';
        }
      });
    });

    function eventCalllback(e) {
      let el = e.target,
        pattern = el.dataset.phonePattern,
        matrix = pattern,
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = e.target.value.replace(/\D/g, '');

      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
    }
  }
}

export function validateForm() {
  const forms = document.querySelectorAll('.form');
  if (forms.length > 0) {
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputsForm = form.querySelectorAll('.form__input');

        inputsForm.forEach((input) => {
          const select = input.closest('.select');
          const valueLength = input.getAttribute('data-length');

          if (input.getAttribute('no-valid')) return;

          // в data-length записываем точное кол-во символов, которые должны быть в инпуте
          if (valueLength) {
            if (input.value.length < valueLength || input.value.length > valueLength) {
              input.classList.add('error');
            } else {
              input.classList.remove('error');
            }
          } else {
            if (input.value === '') {
              input.classList.add('error');
            } else {
              input.classList.remove('error');
            }
          }

          // если чекбокс
          if (input.type === 'checkbox') {
            const inputLabel = input.nextElementSibling;
            if (!input.checked) {
              inputLabel.classList.add('error');
            } else {
              inputLabel.classList.remove('error');
            }
          }

          // если селект
          if (input.classList.contains('select__value')) {
            if (input.value === '') {
              select.classList.add('error');
            } else {
              select.classList.remove('error');
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
  const headerPos = headerCenter.offsetTop;

  window.addEventListener('scroll', () => {
    const windowPos = window.pageYOffset;

    if (windowPos > headerPos) {
      // если прокрутка ниже header
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

export function video() {
  const buttonsVideo = document.querySelectorAll('.video-player__btn');
  if (buttonsVideo.length > 0) {
    const videos = document.querySelectorAll('.video-player__video');

    buttonsVideo.forEach((btn) => {
      btn.addEventListener('click', () => {
        const videoParent = btn.closest('.video-player');
        const video = videoParent.querySelector('video');

        videoParent.classList.add('hide-poster');
        video.play();
      });
    });

    videos.forEach((video1) => {
      // при клике на одно видео другие закрываются
      video1.addEventListener('play', () => {
        videos.forEach((video2) => {
          const videoPlayer = video2.closest('.video-player');

          if (video2 != video1) {
            video2.pause();
            video2.currentTime = 0;
            videoPlayer.classList.remove('hide-poster');
          }
        });
      });
    });
  }
}

export function spollers() {
  const spollers = document.querySelectorAll('.spoller');
  if (spollers.length > 0) {
    const spollerButtons = document.querySelectorAll('.spoller__btn');
    spollerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const spoller = btn.closest('.spoller');

        if (spoller.classList.contains('_open')) {
          btn.classList.remove('_active');
          spoller.classList.remove('_open');
        } else {
          spollers.forEach((spoller) => spoller.classList.remove('_open'));
          spollerButtons.forEach((btn) => btn.classList.remove('_active'));
          btn.classList.add('_active');
          spoller.classList.add('_open');
        }
      });
    });
  }
}

export function range() {
  const ranges = document.querySelectorAll('.range');
  if (ranges.length > 0) {
    ranges.forEach((range) => {
      const minGap = 0;
      const sliderTrack = range.querySelector('.range__track');
      const leftSlider = range.querySelector('.range-slider-left');
      const rightSlider = range.querySelector('.range-slider-right');
      const maxValue = rightSlider.max;

      leftSlider.addEventListener('input', () => {
        if (+rightSlider.value - +leftSlider.value <= minGap) {
          leftSlider.value = +rightSlider.value - minGap;
        }
        fillColor();
      });

      rightSlider.addEventListener('input', () => {
        if (+rightSlider.value - +leftSlider.value <= minGap) {
          rightSlider.value = +leftSlider.value + minGap;
        }
        fillColor();
      });

      const allSliders = range.querySelectorAll('.range__slider');
      allSliders.forEach((slider) => {
        const currentId = slider.dataset.range;
        const currentCount = document.querySelector(`[data-range-input="${currentId}"]`);

        slider.addEventListener('input', () => {
          currentCount.value = slider.value;
          fillColor();
        });

        currentCount.addEventListener('input', () => {
          if (currentCount.value != maxValue) {
            slider.value = currentCount.value;
            fillColor();
          }
        });
      });

      function fillColor() {
        const percent1 = (leftSlider.value / maxValue) * 100;
        const percent2 = (rightSlider.value / maxValue) * 100;

        sliderTrack.style.background = `linear-gradient(to right, #eaebed ${percent1}%, #6f73ee ${percent1}%, #6f73ee ${percent2}%, #eaebed ${percent2}%)`;
      }
    });
  }
}

export function show() {
  const buttonsShow = document.querySelectorAll('.btn-show');
  if (buttonsShow.length > 0) {
    buttonsShow.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = btn.closest('.show');
        const itemsShow = parent.querySelectorAll('.show-item');

        itemsShow.forEach((item) => item.classList.add('open'));
        btn.remove();
      });
    });
  }
}

export function openFilter() {
  const filterBar = document.querySelector('.filter__bar-body');
  if (filterBar) {
    const btnBar = document.querySelector('.filter__open-filter');
    const closeBar = document.querySelector('.filter__close-bar');

    btnBar.addEventListener('click', () => {
      filterBar.classList.add('open');
    });

    closeBar.addEventListener('click', () => {
      filterBar.classList.remove('open');
    });

    document.addEventListener('click', (e) => {
      if (e.target != filterBar && !e.target.closest('.filter__bar') && e.target != btnBar) {
        filterBar.classList.remove('open');
      }
    });
  }
}

export function filesInputs() {
  const inputs = document.querySelectorAll('.file-input');
  if (inputs.length) {
    const deleteFilesButtons = document.querySelectorAll('.file-input-delete');

    inputs.forEach((input) => {
      input.addEventListener('change', (e) => {
        const inputName = input.nextElementSibling.querySelector('.file-input-name');
        const file = e.target.files[0];

        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
          alert('Разрешены только изображения!');
          input.value = '';
          return;
        }

        inputName.textContent = file.name;
      });
    });

    deleteFilesButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentData = btn.dataset.fileInput;
        const currentInput = document.querySelector(`[data-file=${currentData}]`);
        const inputName = currentInput.nextElementSibling.querySelector('.file-input-name');

        currentInput.value = '';
        inputName.textContent = 'Выберите изображение';
      });
    });
  }
}
