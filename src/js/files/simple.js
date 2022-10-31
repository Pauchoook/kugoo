export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function citiesSelect() {
	// костыльная функция. Выводит города в селект

	const citiesElements = document.querySelectorAll('[data-cities]');

	if (citiesElements.length > 0) {
		citiesElements.forEach(city => {
			fetch('https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia')
			.then(res => res.json())
			.then(data => data.slice(0, 10))
			.then(cities => {
				cities.forEach(obj => {
					const li = document.createElement('li')
					li.classList.add('select__element', 'simple-select__element');
					li.textContent = obj.city;

					city.appendChild(li);
				});
			})
		})
	}
}