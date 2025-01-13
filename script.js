console.log("Скрипт подключён!");

// Загружаем JSON с вопросами
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const form = document.getElementById('testForm');
        const resultDiv = document.getElementById('result');
        const fuse = new Fuse(data, {
            keys: ['question'], // Ищем по полю "question"
            threshold: 0.3 // Порог совпадения
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

        // Обработка строки поиска
        document.getElementById('transparentSearch').addEventListener('input', (event) => {
            const query = event.target.value.trim();
            const resultBox = document.getElementById('resultBox');
            const answerBox = document.getElementById('answer');

            if (query.length > 0) {
                const result = fuse.search(query);
                if (result.length > 0) {
                    answerBox.textContent = result[0].item.correct; // Показать правильный ответ
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
    .catch(error => console.error("Ошибка загрузки JSON:", error));
