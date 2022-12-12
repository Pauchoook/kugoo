export default function quiz() {
   const quizTitle = document.querySelector('#quiz-title');
   if (quizTitle) {
      const quizEnd = document.querySelector('#quiz-end');
      const quizPrev = document.querySelector('#quiz-prev');
      const quizNext = document.querySelector('#quiz-next');
      const quizProgress = document.querySelector('#quiz-progress');
      const quizStatusProgress = document.querySelector('#quiz-progress-content');
      const quizBody = document.querySelector('#quiz-body');
      const quizNav = document.querySelector('#quiz-nav');

      let count = 0;
      let progress = 0;

      quizNext.addEventListener('click', () => {
         if (count !== 4 && progress !== 100) {
            progress+=25;
            count++;
            init();
         } else {
            quizBody.innerHTML = '';
            quizEnd.style.display = 'block';
            quizNav.style.display = 'none';
         }
      });
      quizPrev.addEventListener('click', () => {
         if (count !== 0 && progress !== 0) {
            progress-=25;
            count--;
            init();
         }
      });

      const questions = {
         0: {
            title: 'Для кого выбираете электросамокат?',
            answers: {
               0: 'Для взрослого', 1: 'Для ребенка', 2: 'Для человека в возрасте', 3: 'Для взрослого и ребенка'
            }
            
         },
         1: {
            title: 'Для каких целей будет использоваться самокат?',
            answers: {
               0: 'Для перемещения по городу', 1: 'Для поездок на дальние расстояния', 2: 'Для бездорожья', 3: 'Другое'
            }
         },
         2: {
            title: 'Нужно ли сидение у самоката?',
            answers: {0: 'Да', 1: 'Нет', 2: 'Пока не знаю/подберите разные варианты'
         }
         },
         3: {
            title: 'Какая максимальная скорость должна быть у самоката?',
            answers: {
               0: '20-39 км/ч', 1: '40-59 км/ч', 2: '60 - 100 км/ч', 3: 'Пока не знаю/подберите разные варианты'
            }
         },
         4: {
            title: 'Какой у вас бюджет на покупку?',
            answers: {
               0: '35 000 - 45 000 руб.', 1: '45 000 - 60 000 руб.', 2: '60 000 - 100 000 руб.', 3: 'Пока не знаю/подберите разные варианты'
            }
         }
      };

      function init() {
         const question = questions[count]

         quizTitle.textContent = question.title;
         quizStatusProgress.textContent = `Готово: ${progress}%`
         quizProgress.style.maxWidth = `${progress}%`

         quizBody.innerHTML = '';
         for (const key in question.answers) {
            const answer = question.answers[key];

            const inputAnswer = document.createElement('input');
            inputAnswer.type = 'radio';
            inputAnswer.name = 'quiz';
            inputAnswer.classList.add('quiz__checkbox');
            inputAnswer.id = `quiz-${key}`;

            if (+key === 0) inputAnswer.checked = true;

            quizBody.appendChild(inputAnswer);

            const labelAnswer = document.createElement('label');
            labelAnswer.setAttribute('for', `quiz-${key}`);
            labelAnswer.classList.add('quiz__item');
            labelAnswer.insertAdjacentHTML('afterbegin', `
               <div class="quiz__item-circle"></div>
               <p class="quiz__item-content">${answer}</p>
            `);
            
            quizBody.appendChild(labelAnswer);
         }
      }

      init();
   }
}