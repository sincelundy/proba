console.log("Скрипт подключён!");

// Загружаем JSON с вопросами
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const form = document.getElementById('testForm');
        const resultDiv = document.getElementById('result');
        const fuse = new Fuse(data, {
            keys: ['question'], // Настройка поиска по ключу "question"
            threshold: 0.3 // Порог совпадения для поиска
        });

        // Динамическое добавление вопросов в форму
        data.forEach((item, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            questionDiv.innerHTML = `
                <p>${item.question}</p>
                ${item.answers.map((answer, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${String.fromCharCode(65 + i)}">
                        ${answer}
                    </label><br>
                `).join('')}
            `;
            form.appendChild(questionDiv);
        });

        // Проверка результатов теста
        document.getElementById('submitBtn').addEventListener('click', () => {
            let score = 0;

            data.forEach((item, index) => {
                const selected = form.querySelector(`input[name="q${index}"]:checked`);
                if (selected && selected.value === item.correct[0]) {
                    score++;
                }
            });

            resultDiv.textContent = `Вы набрали ${score} из ${data.length} баллов.`;
        });

        // Обработка строки поиска
        document.getElementById('transparentSearch').addEventListener('input', (event) => {
            const query = event.target.value.trim();
            const resultBox = document.getElementById('resultBox');
            const answerBox = document.getElementById('answer');

            if (query.length > 0) {
                const result = fuse.search(query);
                if (result.length > 0) {
                    answerBox.textContent = result[0].item.correct;
                } else {
                    answerBox.textContent = "Ответ не найден";
                }
                resultBox.classList.remove('hidden');
                resultBox.classList.add('visible');
            } else {
                resultBox.classList.remove('visible');
                resultBox.classList.add('hidden');
                answerBox.textContent = '';
            }
        });
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));

// База данных вопросов для примера
const database = [
    { question: "Что такое HTML?", answer: "Язык разметки" },
    { question: "Что такое CSS?", answer: "Язык для стилизации веб-страниц" },
    { question: "Что делает JavaScript?", answer: "Добавляет интерактивность" }
];

// Функция для поиска ответа
function searchAnswer(query) {
    const options = {
        includeScore: true, // Учитывать совпадения
        threshold: 0.3, // Порог для поиска
        keys: ['question'] // Ищем по полю "question"
    };

    const fuse = new Fuse(database, options);
    const results = fuse.search(query);

    if (results.length > 0) {
        return results[0].item.answer; // Возвращаем первый найденный ответ
    } else {
        return "Ответ не найден";
    }
}

// Отслеживание ввода в строке поиска
document.getElementById("transparentSearch").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    const resultBox = document.getElementById("resultBox");
    const answerBox = document.getElementById("answer");

    if (query.length > 0) {
        const answer = searchAnswer(query);
        console.log("Найденный ответ:", answer);

        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        answerBox.textContent = answer;
    } else {
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
        answerBox.textContent = ""; // Очищаем текст
    }
});
