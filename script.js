// Загружаем JSON с вопросами
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const form = document.getElementById('testForm');
        const resultBox = document.getElementById('resultBox');
        const answerBox = document.getElementById('answer');

        // Инициализация Fuse.js с настройками fuzzy search
        const fuse = new Fuse(data, {
            keys: ['question'],
            threshold: 0.3 // Порог для fuzzy search
        });

        // Добавление вопросов в форму
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

        // Обработка ввода в строке поиска
        document.getElementById("transparentSearch").addEventListener("input", (event) => {
            const query = event.target.value.trim();

            if (query.length > 0) {
                const result = fuse.search(query);
                if (result.length > 0) {
                    answerBox.textContent = result[0].item.correct; // Ответ на вопрос
                    resultBox.classList.remove("hidden");
                    resultBox.classList.add("visible");
                } else {
                    answerBox.textContent = "Ответ не найден";
                    resultBox.classList.remove("hidden");
                    resultBox.classList.add("visible");
                }
            } else {
                resultBox.classList.remove("visible");
                resultBox.classList.add("hidden");
                answerBox.textContent = "";
            }
        });
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));
