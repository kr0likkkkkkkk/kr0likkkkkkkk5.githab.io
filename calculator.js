function calculateCost(event) {
    event.preventDefault();
    
    // Получение элементов
    const quantityInput = document.getElementsByName("quantity")[0];
    const productSelect = document.getElementsByName("product")[0];
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("quantityError");
    
    // Скрываем предыдущие сообщения
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    
    // Корректность ввода с помощью регулярного выражения
    const quantity = quantityInput.value;
    const match = quantity.match(/^\d+$/);
    
    if (match === null) {
        errorDiv.style.display = 'block';
        return false;
    }
    
    // Преобразуем в число
    const quantityNum = parseInt(quantity);
    const productPrice = parseInt(productSelect.value);
    
    // Проверяем, что количество больше 0
    if (quantityNum <= 0) {
        errorDiv.textContent = 'Количество должно быть больше 0';
        errorDiv.style.display = 'block';
        return false;
    }
    
    // Вычисляем стоимость
    const totalCost = productPrice * quantityNum;
    
    // Форматируем вывод
    const formattedCost = totalCost.toLocaleString('ru-RU');
    
    // Выводим результат
    resultDiv.innerHTML = `
        <h3>Стоимость заказа:</h3>
        <p>Товар: ${productSelect.options[productSelect.selectedIndex].text}</p>
        <p>Количество: ${quantityNum}</p>
        <p><strong>Общая стоимость: ${formattedCost} руб.</strong></p>
    `;
    resultDiv.style.display = 'block';
    
    return false;
}

// Инициализация после загрузки DOM
window.addEventListener('DOMContentLoaded', function (event) {
    console.log("DOM fully loaded and parsed");
    
    // Находим кнопку и добавляем обработчик
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", calculateCost);
    
    // Добавляем обработчик на поле ввода для скрытия ошибки при вводе
    const quantityInput = document.getElementsByName("quantity")[0];
    quantityInput.addEventListener('input', function() {
        document.getElementById("quantityError").style.display = 'none';
    });
});