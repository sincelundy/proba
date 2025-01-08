console.log("Скрипт подключён!") ;
// Правильные ответы
const correctAnswers = {
    q1: 'b',
    q2: 'c'
};

document.getElementById('submitBtn').addEventListener('click', function () {
    const form = document.getElementById('testForm');
    let score = 0;

    // Проверка всех вопросов
    Object.keys(correctAnswers).forEach(function (question) {
        const selectedAnswer = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    // Показываем результат
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Вы набрали ${score} из ${Object.keys(correctAnswers).length} баллов.`;
});

// База данных вопросов и ответов
const database = [
    { question: "Что такое HTML?", answer: "Язык разметки" },
    { question: "Что такое CSS?", answer: "Язык для стилизации веб-страниц" },
    { question: "Что делает JavaScript?", answer: "Добавляет интерактивность" }
];

// Функция для поиска ответа
function searchAnswer(query) {
    const result = database.find(item => item.question.toLowerCase().includes(query.toLowerCase()));
    return result ? result.answer : "Ответ не найден";
}

// Слушаем ввод текста в поле
document.getElementById("transparentSearch").addEventListener("input", (event) => {
    const query = event.target.value.trim(); // Получаем текст из поля
    const answer = searchAnswer(query); // Ищем ответ

    // Показываем результат
    const resultBox = document.getElementById("resultBox");
    const answerBox = document.getElementById("answer");

    if (query.length > 0) {
        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        answerBox.textContent = answer;
    } else {
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
    }
});
