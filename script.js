/**
 * ==========================================================================
 * WIDGET DESIGN COLLECTION - COMPLETE ENGINE v2.5
 * Repositori: NF2077/Widget-Design
 * Fitur: Mengelola 7 komponen widget interaktif secara dinamis dan real-time.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. WIDGET JAM DIGITAL & TANGGAL REAL-TIME
    // ==========================================
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    function updateClock() {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        clockElement.innerText = `${hours}:${minutes}:${seconds}`;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.innerText = now.toLocaleDateString('id-ID', options);
    }
    setInterval(updateClock, 1000);
    updateClock();


    // ==========================================
    // 2. WIDGET MINI MUSIC PLAYER
    // ==========================================
    const playBtn = document.getElementById('play-btn');
    const disc = document.getElementById('disc');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            disc.classList.add('rotate');
            isPlaying = true;
        } else {
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            disc.classList.remove('rotate');
            isPlaying = false;
        }
    });


    // ==========================================
    // 3. WIDGET WEATHER SIMULATOR
    // ==========================================
    const refreshWeatherBtn = document.getElementById('refresh-weather');
    const wIcon = document.getElementById('w-icon');
    const wTemp = document.getElementById('w-temp');
    const wDesc = document.getElementById('w-desc');
    const wHumid = document.getElementById('w-humid');
    const wWind = document.getElementById('w-wind');

    const weatherDataMock = [
        { temp: "28°C", desc: "Cerah Berawan", humid: "75%", wind: "4 m/s", icon: "fa-cloud-sun", color: "#fbbf24" },
        { temp: "24°C", desc: "Hujan Guntur", humid: "95%", wind: "12 m/s", icon: "fa-cloud-showers-heavy", color: "#60a5fa" },
        { temp: "32°C", desc: "Cerah Terik", humid: "45%", wind: "2 m/s", icon: "fa-sun", color: "#f59e0b" },
        { temp: "22°C", desc: "Kabut Tebal", humid: "88%", wind: "3 m/s", icon: "fa-smog", color: "#94a3b8" }
    ];

    refreshWeatherBtn.addEventListener('click', () => {
        refreshWeatherBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => refreshWeatherBtn.style.transform = 'rotate(0deg)', 400);

        const randomWeather = weatherDataMock[Math.floor(Math.random() * weatherDataMock.length)];
        wTemp.innerText = randomWeather.temp;
        wDesc.innerText = randomWeather.desc;
        wHumid.innerText = randomWeather.humid;
        wWind.innerText = randomWeather.wind;
        wIcon.className = `fa-solid ${randomWeather.icon} weather-icon-demo`;
        wIcon.style.color = randomWeather.color;
    });


    // ==========================================
    // 4. WIDGET DYNAMIC TODO LIST (CRUD MINI)
    // ==========================================
    const todoBox = document.getElementById('todo-box');
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');

    let initialTasks = ["Update Weather Web API", "Slice Widget Design Dashboard", "Push to GitHub"];

    function renderTodos() {
        todoBox.innerHTML = "";
        initialTasks.forEach((task, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <div class="todo-left">
                    <input type="checkbox" id="task-${index}">
                    <label for="task-${index}">${task}</label>
                </div>
                <button class="delete-todo" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            `;
            todoBox.appendChild(todoItem);
        });
        attachDeleteEvents();
    }

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText !== "") {
            initialTasks.push(taskText);
            todoInput.value = "";
            renderTodos();
            todoBox.scrollTop = todoBox.scrollHeight;
        }
    }

    function attachDeleteEvents() {
        document.querySelectorAll('.delete-todo').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetIndex = e.currentTarget.getAttribute('data-index');
                initialTasks.splice(targetIndex, 1);
                renderTodos();
            });
        });
    }

    addTodoBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });
    renderTodos();


    // ==========================================
    // 5. WIDGET MINI CALCULATOR
    // ==========================================
    const calcScreen = document.getElementById('calc-screen');
    let calcExpression = "";

    document.querySelectorAll('.btn-num').forEach(button => {
        button.addEventListener('click', () => {
            if (calcScreen.innerText === "0" || calcScreen.innerText === "Error") {
                calcExpression = button.innerText;
            } else {
                calcExpression += button.innerText;
            }
            calcScreen.innerText = calcExpression;
        });
    });

    document.querySelectorAll('.btn-op').forEach(button => {
        button.addEventListener('click', () => {
            const lastChar = calcExpression.slice(-1);
            if (["+", "-", "*", "/"].includes(lastChar)) {
                calcExpression = calcExpression.slice(0, -1) + button.getAttribute('data-op');
            } else if (calcExpression !== "") {
                calcExpression += button.getAttribute('data-op');
            }
            calcScreen.innerText = calcExpression || "0";
        });
    });

    document.getElementById('calc-clear').addEventListener('click', () => {
        calcExpression = "";
        calcScreen.innerText = "0";
    });

    document.getElementById('calc-equal').addEventListener('click', () => {
        try {
            if (calcExpression !== "") {
                const result = Function(`"use strict"; return (${calcExpression})`)();
                calcScreen.innerText = Number.isInteger(result) ? result : result.toFixed(2);
                calcExpression = calcScreen.innerText;
            }
        } catch {
            calcScreen.innerText = "Error";
            calcExpression = "";
        }
    });


    // ==========================================
    // 6. WIDGET CRYPTO TRACKER SIMULATOR
    // ==========================================
    const btcPriceEl = document.getElementById('btc-price');
    const btcChangeEl = document.getElementById('btc-change');
    let currentBtcPrice = 67420;

    function simulateCryptoTicker() {
        const changeAmount = (Math.random() * 300) - 150;
        currentBtcPrice += changeAmount;
        const percentageChange = (Math.random() * 5).toFixed(1);
        
        btcPriceEl.innerText = `$${Math.round(currentBtcPrice).toLocaleString('en-US')}`;

        if (changeAmount >= 0) {
            btcChangeEl.className = "price-up";
            btcChangeEl.innerHTML = `<i class="fa-solid fa-caret-up"></i> +${percentageChange}%`;
        } else {
            btcChangeEl.className = "price-down";
            btcChangeEl.innerHTML = `<i class="fa-solid fa-caret-down"></i> -${percentageChange}%`;
        }
    }
    setInterval(simulateCryptoTicker, 3000);

});
