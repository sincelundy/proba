// Правильные ответы для теста
const correctAnswers = {
    q1: 'b',
    q2: 'c'
};

// Обработчик кнопки "Проверить ответы"
document.getElementById('submitBtn').addEventListener('click', function() {
    const form = document.getElementById('testForm');
    let score = 0;

    // Проверка всех вопросов
    Object.keys(correctAnswers).forEach(function(question) {
        const selectedAnswer = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    // Отображение результата
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = Вы набрали ${score} из ${Object.keys(correctAnswers).length} баллов.;
});

// База данных вопросов и ответов
const database = [
    { question: "Что такое HTML?", answer: "Язык разметки" },
    { question: "Что такое CSS?", answer: "Язык для стилизации веб-страниц" },
    { question: "Что делает JavaScript?", answer: "Добавляет интерактивность" }
];

// Функция для поиска ответа
function searchAnswer(query) {
    const result = database.find(item => 
        item.question.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
    );
    return result ? result.answer : "Ответ не найден";
}

// Обработчик ввода текста в поисковую строку
document.getElementById("transparentSearch").addEventListener("input", (event) => {
    const query = event.target.value.trim(); // Получаем текст из поля
    const answer = searchAnswer(query); // Ищем ответ

    // Отображение результата
    const resultBox = document.getElementById("resultBox");
    if (query.length > 0) {
        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        resultBox.textContent = answer; // Показать найденный ответ
    } else {
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
    }
});
