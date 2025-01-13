console.log("Скрипт подключён!");

// Функция для загрузки JSON файла с вопросами и ответами
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const questionsData = await response.json();
        console.log("Загруженные вопросы:", questionsData);
        return questionsData;
    } catch (error) {
        console.error("Ошибка при загрузке JSON файла:", error);
        return [];
    }
}

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

// Настройки Fuse.js для поиска
async function handleSearchInput(event) {
    const query = event.target.value.trim(); // Получаем введённый текст
    const resultBox = document.getElementById("resultBox");
    const answerBox = document.getElementById("answer");

    // Загружаем данные из JSON
    const database = await loadQuestions();

    if (query.length > 0) {
        const answer = searchAnswer(query, database); // Ищем ответ
        console.log("Найденный ответ:", answer); // Логируем ответ

        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        answerBox.textContent = answer; // Обновляем текст
    } else {
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
        answerBox.textContent = ""; // Очищаем текст
    }
}

// Функция для поиска ответа по вопросу
function searchAnswer(query, database) {
    const fuseOptions = {
        includeScore: false,  // Не показываем счёт
        threshold: 0.3,       // Порог совпадения
        keys: ['question']    // Ищем только по вопросам
    };

    const fuse = new Fuse(database, fuseOptions);
    const results = fuse.search(query.trim());
    if (results.length > 0) {
        return results[0].item.answer; // Возвращаем первый найденный ответ
    }
    return "Ответ не найден";
}

// Добавляем обработчик на поле поиска
document.getElementById("transparentSearch").addEventListener("input", handleSearchInput);
