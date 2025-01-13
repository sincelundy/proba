console.log("Скрипт подключён!");

// Функция для асинхронной загрузки JSON файла
async function loadQuestionsFromJson() {
    try {
        const response = await fetch('questions.json'); // Путь к JSON файлу
        const data = await response.json();
        console.log("Загруженные вопросы и ответы:", data); // Логируем загруженные данные
        return data;
    } catch (error) {
        console.error("Ошибка загрузки файла JSON:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

// Настройки Fuse.js
const fuseOptions = {
    includeScore: false,  // Не показываем счёт
    threshold: 0.3,       // Порог совпадения
    keys: ['question']    // Ищем только по вопросам
};

// Переменная для хранения базы данных вопросов
let database = [];

// Загружаем вопросы и ответы при старте
loadQuestionsFromJson().then(questions => {
    // Инициализируем Fuse.js после загрузки данных
    database = questions.map(q => ({ question: q.question, answer: q.answer }));
    const fuse = new Fuse(database, fuseOptions);

    // Функция для поиска ответа
    function searchAnswer(query) {
        console.log("Поиск для запроса:", query);  // Логируем запрос
        const results = fuse.search(query.trim());
        if (results.length > 0) {
            console.log("Найденный результат:", results[0].item); // Логируем найденный ответ
            return results[0].item.answer; // Возвращаем первый найденный ответ
        }
        return "Ответ не найден";
    }

    // Обработчик для строки поиска
    function handleSearchInput(event) {
        const query = event.target.value.trim(); // Получаем введённый текст
        const resultBox = document.getElementById("resultBox");
        const answerBox = document.getElementById("answer");

        if (query.length > 0) {
            const answer = searchAnswer(query); // Ищем ответ
            console.log("Ответ на запрос:", answer); // Логируем ответ
            resultBox.classList.remove("hidden");
            resultBox.classList.add("visible");
            answerBox.textContent = answer; // Обновляем текст
        } else {
            resultBox.classList.remove("visible");
            resultBox.classList.add("hidden");
            answerBox.textContent = ""; // Очищаем текст
        }
    }

    // Добавляем обработчик на поле поиска
    document.getElementById("transparentSearch").addEventListener("input", handleSearchInput);
});
