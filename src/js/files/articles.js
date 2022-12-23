export default function articles() {
  const buttonsArticles = document.querySelectorAll('.articles__btn');
  if (buttonsArticles.length > 0) {
    const articles = document.querySelectorAll('.card-article');

    buttonsArticles.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentType = btn.dataset.typeBtn;
        if (currentType != 'all') {
          const currentArticles = document.querySelectorAll(`[data-type=${currentType}]`);
          
          articles.forEach(article => article.style.display = 'none');
          currentArticles.forEach(article => article.style.display = 'block');
        } else {
          articles.forEach(article => article.style.display = 'block');
        }
        
        buttonsArticles.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
}