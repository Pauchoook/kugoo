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

export function videoClick() {
	const videos = document.querySelectorAll('.video-player__video');
	if (videos.length > 0) {
		videos.forEach(video1 => {

			video1.addEventListener('play', () => {
				videos.forEach(video2 => {
					const videoPlayer = video2.closest('.video-player');

					if(video2 != video1) {
						video2.pause();
						video2.currentTime = 0;
						videoPlayer.classList.remove('hide-poster');
					}
				});
			});
		});
	}
}