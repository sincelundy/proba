const correctAnswers = {
    q1: 'b',
    q2: 'c'
};

document.getElementById('submitBtn').addEventListener('click', function() {
    const form = document.getElementById('testForm');
    let score = 0;

    // Проверка всех вопросов
    Object.keys(correctAnswers).forEach(function(question) {
        const selectedAnswer = form.querySelector(`input[name=${question}]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    // Показываем результат
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = Вы набрали ${score} из ${Object.keys(correctAnswers).length} баллов.;
});
