export default function map() {
  const contactsMaps = document.querySelectorAll('.contacts-address__map');

  function mapInterface(map) {
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  }

  if (contactsMaps.length) {
    contactsMaps.forEach(contactsMap => {
      const coordinate = contactsMap.dataset.coordinate.split(',');

      ymaps.ready(() => {
        const map = new ymaps.Map(contactsMap, {
          center: [coordinate[0],coordinate[1]],
          zoom: 17
        })
        mapInterface(map);
      })
    })
  }
}