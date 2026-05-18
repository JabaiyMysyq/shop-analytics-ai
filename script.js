document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Кнопка "Наверх" (Back to Top) ---
    const topBtn = document.getElementById("backToTop");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                topBtn.style.display = "flex";
            } else {
                topBtn.style.display = "none";
            }
        });
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 2. Управление фоновой AI-музыкой ---
    const bgAudio = document.getElementById("bgAudio");
    const playBtn = document.getElementById("playAudio");
    const pauseBtn = document.getElementById("pauseAudio");

    if (bgAudio && playBtn && pauseBtn) {
        playBtn.addEventListener("click", () => bgAudio.play());
        pauseBtn.addEventListener("click", () => bgAudio.pause());
    }

    // --- 3. Имитация работы AI-Агента (Генерация стратегий) ---
    const generateBtn = document.getElementById("generateStrategy");
    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            const segment = document.getElementById("segmentSelect").value;
            const outputBlock = document.getElementById("aiAgentOutput");
            
            outputBlock.innerHTML = "<em>Анализ сегмента через AI-API...</em>";
            
            const responses = {
                cart: "AI-Рекомендация: Запустить триггерную цепочку писем через 15 минут после ухода. Предложить скидку 5% на товары в корзине или бесплатную доставку.",
                loyal: "AI-Рекомендация: Включить закрытый доступ к новой коллекции. Начислить кэшбек x2 на следующую покупку для максимизации LTV.",
                newbie: "AI-Рекомендация: Показать приветственный онбординг-баннер. Использовать социальные доказательства (отзывы) и ограничить акцию первого заказа таймером."
            };

            setTimeout(() => {
                outputBlock.innerHTML = `<strong>Ответ AI-Агента:</strong><br>${responses[segment]}`;
            }, 800);
        });
    }

    // --- 4. Сортировка Динамической Таблицы ---
    const table = document.getElementById("analyticsTable");
    if (table) {
        const headers = table.querySelectorAll("th");
        headers.forEach((header, index) => {
            header.addEventListener("click", () => {
                const tbody = table.querySelector("tbody");
                const rows = Array.from(tbody.querySelectorAll("tr"));
                const isAscending = header.classList.toggle("asc");
                
                rows.sort((rowA, rowB) => {
                    const cellA = rowA.children[index].textContent.trim();
                    const cellB = rowB.children[index].textContent.trim();
                    
                    // Проверка на числа для корректной числовой сортировки
                    const numA = parseFloat(cellA.replace(/[^0-9.-]/g, ''));
                    const numB = parseFloat(cellB.replace(/[^0-9.-]/g, ''));
                    
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return isAscending ? numA - numB : numB - numA;
                    }
                    return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
                });
                
                tbody.innerHTML = "";
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    }

    // --- 5. Интерактивный Чат-бот ---
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");

    if (sendChatBtn && chatInput && chatMessages) {
        const triggerBotResponse = (userText) => {
            let botText = "Извините, я собираю дополнительные статистические данные по этому вопросу. Спросите о 'конверсии' или 'трендах'.";
            const text = userText.toLowerCase();

            if (text.includes("привет") || text.includes("здравствуй")) {
                botText = "Приветствую! Я виртуальный аналитик магазина. Что вас интересует в поведении клиентов?";
            } else if (text.includes("конверси")) {
                botText = "Текущая конверсия сайта составляет 3.2%. Оптимизация UI через AI-рекомендации подняла её на 0.4% в этом квартале.";
            } else if (text.includes("тренд")) {
                botText = "Главный тренд 2026 года — mobile-first шоппинг и мгновенные транзакции через биометрию. Доля покупок со смартфонов достигла 78%.";
            }

            setTimeout(() => {
                chatMessages.innerHTML += `<div style="margin-bottom: 10px; color: var(--accent-color);"><strong>AI-Бот:</strong> ${botText}</div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        };

        const sendMessage = () => {
            const msg = chatInput.value.trim();
            if (!msg) return;

            chatMessages.innerHTML += `<div style="margin-bottom: 10px;"><strong>Вы:</strong> ${msg}</div>`;
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            triggerBotResponse(msg);
        };

        sendChatBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }
});