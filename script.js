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

// Функция для поиска ответа с использованием Fuse.js
function searchAnswer(query) {
    // Настройки Fuse.js
    const options = {
        includeScore: true,   // Учитывать совпадения
        threshold: 0.3,       // Порог для поиска (чем ниже, тем точнее)
        keys: ['question'],   // Ищем по полю "question"
    };

    // Создаем новый экземпляр Fuse.js
    const fuse = new Fuse(database, options);

    // Поиск по запросу
    const results = fuse.search(query);

    // Если найден результат, возвращаем ответ
    if (results.length > 0) {
        return results[0].item.answer; // Возвращаем ответ на первый найденный вопрос
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
