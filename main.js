document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question-card');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressBar = document.querySelector('.progress-bar');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    const correctAnswers = ['a', 'b', 'a', 'a', 'a', 'b', 'a', 'a', 'a', 'a'];
    let userAnswers = new Array(totalQuestions).fill(null);
    
    // Обновление прогресс-бара
    function updateProgress() {
        const progress = ((currentQuestion) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Показать текущий вопрос
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
        
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === totalQuestions - 1 ? 'Завершить тест' : 'Далее';
        
        updateProgress();
    }
    
    // Переход к следующему вопросу
    nextBtn.addEventListener('click', function() {
        // Проверяем, выбран ли ответ
        const selectedOption = document.querySelector(`input[name="q${currentQuestion + 1}"]:checked`);
        
        if (!selectedOption && currentQuestion < totalQuestions - 1) {
            alert('Пожалуйста, выберите ответ');
            return;
        }
        
        if (selectedOption) {
            userAnswers[currentQuestion] = selectedOption.value;
        }
        
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // Завершение теста
            calculateResult();
        }
    });
    
    // Переход к предыдущему вопросу
    prevBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    // Расчет результатов
    function calculateResult() {
        let score = 0;
        for (let i = 0; i < totalQuestions; i++) {
            if (userAnswers[i] === correctAnswers[i]) {
                score++;
            }
        }
        
        scoreElement.textContent = score;
        
        // Оценка результата
        if (score === totalQuestions) {
            resultText.textContent = 'Отлично! Вы знаете HTML теги на отлично!';
            resultText.className = 'h4 mb-4 text-success';
        } else if (score >= totalQuestions * 0.7) {
            resultText.textContent = 'Хорошо! Вы хорошо знаете HTML теги!';
            resultText.className = 'h4 mb-4 text-primary';
        } else if (score >= totalQuestions * 0.5) {
            resultText.textContent = 'Удовлетворительно. Вы знаете основные HTML теги.';
            resultText.className = 'h4 mb-4 text-info';
        } else {
            resultText.textContent = 'Плохо. Вам нужно изучить HTML теги лучше.';
            resultText.className = 'h4 mb-4 text-danger';
        }
        
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        progressBar.style.width = '100%';
    }
    
    // Перезапуск теста
    restartBtn.addEventListener('click', function() {
        currentQuestion = 0;
        userAnswers = new Array(totalQuestions).fill(null);
        
        // Сброс выбранных ответов
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        showQuestion(0);
    });
    
    // Инициализация
    showQuestion(0);
});