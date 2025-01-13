/* Стили для сине-голубого прямоугольника с текстом */
.header {
    background: linear-gradient(to right, #1e90ff, #87cefa);
    color: white;
    text-align: center;
    padding: 20px 0;
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

/* Основной контейнер */
.container {
    margin-top: 80px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
}

/* Контейнер для вопросов */
.questions-container {
    width: 100%;
    max-width: 800px;
    margin-bottom: 40px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Строка поиска */
.search-container {
    position: fixed;
    top: 100px;
    right: 20px;
    width: 300px;
    transition: all 0.3s ease;
}

#transparentSearch {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

#transparentSearch:focus {
    border-color: #1e90ff;
    box-shadow: 0px 0px 5px rgba(30, 144, 255, 0.5);
    outline: none;
}

/* Блок результата поиска */
#resultBox {
    display: none;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 100;
}

#resultBox.visible {
    display: block;
}

/* Стили для мобильных устройств */
@media (max-width: 768px) {
    .search-container {
        position: fixed;
        top: 80px;
        right: 10px;
        width: 200px;
    }
}
