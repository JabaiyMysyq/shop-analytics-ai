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

    // --- 4. ДИНАМИЧЕСКАЯ И ИНТЕРАКТИВНАЯ ТАБЛИЦА (Исправлено) ---
    const table = document.getElementById("analyticsTable");
    const addRowBtn = document.getElementById("addRowBtn");

    if (table) {
        const tbody = table.querySelector("tbody");

        // Функция назначения событий удаления на кнопки
        const initDeleteButtons = () => {
            const deleteButtons = table.querySelectorAll(".delete-row-btn");
            deleteButtons.forEach(btn => {
                btn.onclick = (e) => {
                    const row = e.target.closest("tr");
                    if (row) row.remove();
                };
            });
        };

        // Инициализируем кнопки для базовых строк
        initDeleteButtons();

        // Добавление новой строки
        if (addRowBtn) {
            addRowBtn.addEventListener("click", () => {
                const categoryInput = document.getElementById("newCategory");
                const checkInput = document.getElementById("newCheck");
                const timeInput = document.getElementById("newTime");
                const bounceInput = document.getElementById("newBounce");

                const category = categoryInput.value.trim();
                const check = checkInput.value.trim();
                const time = timeInput.value.trim();
                const bounce = bounceInput.value.trim();

                // Валидация полей
                if (!category || !check || !time || !bounce) {
                    alert("Пожалуйста, заполните все 4 поля перед добавлением строки!");
                    return;
                }

                // Создаем новую структуру строки (точно под верстку portfolio.html)
                const newTr = document.createElement("tr");
                newTr.innerHTML = `
                    <td contenteditable="true">${category}</td>
                    <td contenteditable="true">${parseFloat(check)}</td>
                    <td contenteditable="true">${parseFloat(time)}</td>
                    <td contenteditable="true">${parseFloat(bounce)}</td>
                    <td style="text-align: center;">
                        <button class="delete-row-btn" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Удалить</button>
                    </td>
                `;

                // Добавляем строку в таблицу
                tbody.appendChild(newTr);
                
                // Переинициализируем кнопки удаления, чтобы новая кнопка тоже заработала
                initDeleteButtons();

                // Очищаем инпуты формы
                categoryInput.value = "";
                checkInput.value = "";
                timeInput.value = "";
                bounceInput.value = "";
            });
        }

        // Умная сортировка по заголовкам
        const headers = table.querySelectorAll("th");
        headers.forEach((header, index) => {
            // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Игнорируем 5-ю колонку "Действия" (индекс 4), чтобы не ломать скрипт
            if (index === 4) return; 

            header.addEventListener("click", () => {
                const rows = Array.from(tbody.querySelectorAll("tr"));
                const isAscending = header.classList.toggle("asc");
                
                rows.sort((rowA, rowB) => {
                    const cellA = rowA.children[index].textContent.trim();
                    const cellB = rowB.children[index].textContent.trim();
                    
                    const numA = parseFloat(cellA.replace(/[^0-9.-]/g, ''));
                    const numB = parseFloat(cellB.replace(/[^0-9.-]/g, ''));
                    
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return isAscending ? numA - numB : numB - numA;
                    }
                    return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
                });
                
                tbody.innerHTML = "";
                rows.forEach(row => tbody.appendChild(row));
                initDeleteButtons(); // Перепривязываем клики удаления после перестановки строк
            });
        });
    }

    // --- 5. УМНЫЙ ЧАТ-БОТ ---
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");

    if (sendChatBtn && chatInput && chatMessages) {
        const aiKnowledgeBase = [
            {
                keywords: /привет|здравствуй|добрый день|салам/i,
                response: "Приветствую! Я обновленная языковая модель-симулятор. Анализирую данные интернет-магазина 24/7. Чем могу помочь? Могу рассказать про конверсию, средний чек, брошенные корзины или тренды 2026 года."
            },
            {
                keywords: /конверси|процент продаж|как покупают/i,
                response: "Текущий уровень конверсии составляет **3.2%**. Благодаря внедрению ИИ-рекомендаций на основе анализа поведения, этот показатель вырос на 0.4% по сравнению с прошлым кварталом."
            },
            {
                keywords: /тренд|будущее|перспективы|что нового/i,
                response: "Главный тренд 2026 года — mobile-first коммерция (78% всех сессий) и предиктивные корзины, когда ИИ предугадывает желание клиента ещё до совершения клика."
            },
            {
                keywords: /чек|деньги|стоимость|дороже всего/i,
                response: "Лидером по среднему чеку являются Ноутбуки (**350,000 KZT**). Самый низкий чек в Аксессуарах (**12,000 KZT**), но у них самая высокая маржинальность."
            },
            {
                keywords: /корзин|бросил|ушел|не купил/i,
                response: "В категории 'Аксессуары' зафиксирован пик отказов — **45.2%**. Наш AI-агент рекомендует отправлять push-уведомление с напоминанием в течение первых 15 минут."
            },
            {
                keywords: /время|долго|сидят на сайте/i,
                response: "Дольше всего пользователи выбирают Ноутбуки — в среднем **22.1 минуты**. На аксессуарах задерживаются всего на **5.8 минут**."
            },
            {
                keywords: /кто автор|кто сделал|создатель/i,
                response: "Этот проект и его ИИ-модели разработал студент Школы экономики и менеджмента — **Болатұлы Асылбек**, в рамках финальной работы по ИКТ."
            },
            {
                keywords: /спасибо|благодарю|круто|отлично/i,
                response: "Всегда рад помочь! Если появятся новые вопросы по датасету или маркетинговым стратегиям — я всегда на связи."
            }
        ];

        const getAIResponse = (text) => {
            for (let item of aiKnowledgeBase) {
                if (item.keywords.test(text)) {
                    return item.response;
                }
            }
            return "Хм, обрабатываю ваш запрос... Моя нейросеть обучена на данных этого интернет-магазина. Попробуйте спросить точнее, например: про 'конверсию', 'крупный чек', 'отказы в корзинах' или 'кто автор сайта?'.";
        };

        const sendMessage = () => {
            const userText = chatInput.value.trim();
            if (!userText) return;

            chatMessages.innerHTML += `
                <div style="margin-bottom: 15px; text-align: right;">
                    <span style="background: #334155; padding: 8px 14px; border-radius: 12px 12px 0 12px; display: inline-block; max-width: 80%; color: #fff;">
                        ${userText}
                    </span>
                </div>`;
            
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const typingId = "typing-" + Date.now();
            chatMessages.innerHTML += `
                <div id="${typingId}" style="margin-bottom: 15px; text-align: left;">
                    <span style="background: var(--card-bg); border: 1px solid var(--border-color); padding: 8px 14px; border-radius: 12px 12px 12px 0; display: inline-block; color: var(--text-muted);">
                        <em>AI Аналитик думает...</em>
                    </span>
                </div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const typingIndicator = document.getElementById(typingId);
                if (typingIndicator) typingIndicator.remove();

                const botAnswer = getAIResponse(userText);
                chatMessages.innerHTML += `
                    <div style="margin-bottom: 15px; text-align: left;">
                        <span style="background: #1e293b; border-left: 3px solid var(--accent-color); padding: 10px 14px; border-radius: 0 12px 12px 12px; display: inline-block; max-width: 85%; color: #fff; line-height: 1.5;">
                            <strong>AI:</strong> ${botAnswer}
                        </span>
                    </div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        };

        sendChatBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }
});
