console.log("Скрипт подключён!");

// Правильные ответы
const correctAnswers = {
    q1: 'b',
    q2: 'c'
};

// Функция для проверки теста
function checkAnswers() {
    const form = document.getElementById('testForm');
    let score = 0;

    // Проверяем все вопросы
    Object.keys(correctAnswers).forEach((question) => {
        const selectedAnswer = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    // Показываем результат
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Вы набрали ${score} из ${Object.keys(correctAnswers).length} баллов.`;
}

// Добавляем обработчик на кнопку проверки
document.getElementById('submitBtn').addEventListener('click', checkAnswers);

// База данных вопросов и ответов
const database = [
    { question: "Что такое HTML?", answer: "Язык разметки" },
    { question: "Что такое CSS?", answer: "Язык для стилизации веб-страниц" },
    { question: "Что делает JavaScript?", answer: "Добавляет интерактивность" }
];

// Настройки Fuse.js
const fuseOptions = {
    includeScore: false, // Не показываем счёт
    threshold: 0.3, // Порог совпадения
    keys: ['question'] // Ищем только по вопросам
};

// Создаём экземпляр Fuse.js
const fuse = new Fuse(database, fuseOptions);

// Функция для поиска ответа
function searchAnswer(query) {
    const results = fuse.search(query.trim());
    if (results.length > 0) {
        return results[0].item.answer; // Возвращаем первый найденный ответ
    }
    return "Ответ не найден";
}

// Функция для обработки ввода в поле поиска
function handleSearchInput(event) {
    const query = event.target.value.trim();
    const resultBox = document.getElementById("resultBox");
    const answerBox = document.getElementById("answer");

    if (query.length > 0) {
        const answer = searchAnswer(query);
        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        answerBox.textContent = answer;
    } else {
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
        answerBox.textContent = "";
    }
}

// Добавляем обработчик на поле поиска
document.getElementById("transparentSearch").addEventListener("input", handleSearchInput);

