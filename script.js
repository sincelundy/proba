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

// Функция для поиска ответа с использованием Juzzy Search
function searchAnswer(query) {
    const searcher = new JuzzySearch(database, {
        key: 'question', // Указываем, что мы будем искать по полю "question"
        threshold: 0.5, // Порог для нечеткого совпадения, чем меньше значение, тем точнее
        ignoreCase: true // Игнорируем регистр
    });

    const results = searcher.search(query);
    if (results.length > 0) {
        return results[0].answer; // Возвращаем ответ на первый найденный вопрос
    } else {
        return "Ответ не найден";
    }
}

// Слушаем ввод текста в поле
document.getElementById("transparentSearch").addEventListener("input", (event) => {
    const query = event.target.value.trim(); // Получаем текст из поля
    console.log("Введённый текст: ", query); // Выводим введённый текст в консоль

    const answer = searchAnswer(query); // Ищем ответ
    console.log("Найденный ответ: ", answer); // Выводим найденный ответ в консоль

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
