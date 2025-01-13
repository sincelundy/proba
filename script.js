console.log("Скрипт подключён!");

// Функция для загрузки JSON файла с вопросами и ответами
async function loadQuestions() {
    try {
        // Попытка загрузить JSON файл
        const response = await fetch('questions.json');  // Убедись, что файл questions.json находится в той же папке
        if (!response.ok) {
            throw new Error('Не удалось загрузить файл.');
        }
        const questionsData = await response.json();
        console.log("Загруженные вопросы:", questionsData); // Логируем загруженные данные
        return questionsData; // Возвращаем данные из JSON
    } catch (error) {
        // Ошибка загрузки
        console.error("Ошибка при загрузке JSON файла:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

// Функция для поиска ответа
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
    return "Ответ не найден";  // Если ничего не найдено
}

// Функция для обработки ввода в поле поиска
async function handleSearchInput(event) {
    const query = event.target.value.trim(); // Получаем введённый текст
    const resultBox = document.getElementById("resultBox");
    const answerBox = document.getElementById("answer");

    // Загружаем данные из JSON
    const database = await loadQuestions(); // Загружаем данные из файла JSON

    if (query.length > 0) {
        const answer = searchAnswer(query, database); // Ищем ответ на введённый вопрос
        console.log("Найденный ответ:", answer); // Логируем найденный ответ

        // Показываем результат
        resultBox.classList.remove("hidden");
        resultBox.classList.add("visible");
        answerBox.textContent = answer; // Обновляем текст в блоке с ответом
    } else {
        // Если строка поиска пустая, скрываем результат
        resultBox.classList.remove("visible");
        resultBox.classList.add("hidden");
        answerBox.textContent = ""; // Очищаем текст
    }
}

// Добавляем обработчик на поле поиска
document.getElementById("transparentSearch").addEventListener("input", handleSearchInput);
