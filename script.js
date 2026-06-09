/**
 * ==========================================================================
 * WIDGET DESIGN COLLECTION - COMPLETE ENGINE v3.0
 * Repositori: NF2077/Widget-Design
 * Fitur: Mengelola 7 komponen widget interaktif secara dinamis, real-time,
 * dan dilengkapi kalkulator scientific serta multi-crypto tracker.
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
    // 5. WIDGET ADVANCED SCIENTIFIC CALCULATOR
    // ==========================================
    const calcScreen = document.getElementById('calc-screen');
    let calcExpression = "";

    // Input Angka dan Desimal
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

    // Input Operator Dasar
    document.querySelectorAll('.btn-op').forEach(button => {
        button.addEventListener('click', () => {
            const op = button.getAttribute('data-op');
            const lastChar = calcExpression.slice(-1);
            if (["+", "-", "*", "/", "%"].includes(lastChar)) {
                calcExpression = calcExpression.slice(0, -1) + op;
            } else if (calcExpression !== "" || op === "-") {
                calcExpression += op;
            }
            calcScreen.innerText = calcExpression || "0";
        });
    });

    // Operasi Fungsi Sains (sin, cos, tan, sqrt, pi)
    document.querySelectorAll('.btn-sci').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-sci');
            try {
                let currentVal = parseFloat(calcScreen.innerText) || 0;
                let result;

                switch (action) {
                    case 'sin':
                        result = Math.sin(currentVal * Math.PI / 180); // Menggunakan derajat
                        break;
                    case 'cos':
                        result = Math.cos(currentVal * Math.PI / 180);
                        break;
                    case 'tan':
                        result = Math.tan(currentVal * Math.PI / 180);
                        break;
                    case 'sqrt':
                        if (currentVal < 0) throw new Error();
                        result = Math.sqrt(currentVal);
                        break;
                    case 'pi':
                        if (calcExpression === "" || calcScreen.innerText === "0") {
                            calcExpression = Math.PI.toString();
                        } else {
                            calcExpression += `*${Math.PI}`;
                        }
                        calcScreen.innerText = "π";
                        return;
                }

                calcScreen.innerText = Number.isInteger(result) ? result : result.toFixed(5);
                calcExpression = calcScreen.innerText;
            } catch {
                calcScreen.innerText = "Error";
                calcExpression = "";
            }
        });
    });

    // Tombol AC/Clear (C)
    document.getElementById('calc-clear').addEventListener('click', () => {
        calcExpression = "";
        calcScreen.innerText = "0";
    });

    // Evaluasi (=)
    document.getElementById('calc-equal').addEventListener('click', () => {
        try {
            if (calcExpression !== "") {
                const result = Function(`"use strict"; return (${calcExpression})`)();
                calcScreen.innerText = Number.isInteger(result) ? result : result.toFixed(4);
                calcExpression = calcScreen.innerText;
            }
        } catch {
            calcScreen.innerText = "Error";
            calcExpression = "";
        }
    });


    // ==========================================
    // 6. MULTI CRYPTO TRACKER ENGINE (BTC, ETH, SOL)
    // ==========================================
    const cryptoAssets = {
        btc: { price: 67420, elPrice: document.getElementById('btc-price'), elChange: document.getElementById('btc-change') },
        eth: { price: 3480, elPrice: document.getElementById('eth-price'), elChange: document.getElementById('eth-change') },
        sol: { price: 165, elPrice: document.getElementById('sol-price'), elChange: document.getElementById('sol-change') }
    };

    function simulateCryptoMarket() {
        Object.keys(cryptoAssets).forEach(key => {
            const coin = cryptoAssets[key];
            
            // Pergerakan acak berbanding lurus dengan nilai aset masing-masing
            const volatility = coin.price * 0.002; 
            const changeAmount = (Math.random() * (volatility * 2)) - volatility;
            coin.price += changeAmount;

            const percentageChange = (Math.random() * 3.5).toFixed(1);
            
            // Format rendering mata uang
            coin.elPrice.innerText = `$${coin.price.toLocaleString('en-US', { minimumFractionDigits: key === 'sol' ? 2 : 0, maximumFractionDigits: 2 })}`;

            if (changeAmount >= 0) {
                coin.elChange.className = "price-up";
                coin.elChange.innerHTML = `<i class="fa-solid fa-caret-up"></i> +${percentageChange}%`;
            } else {
                coin.elChange.className = "price-down";
                coin.elChange.innerHTML = `<i class="fa-solid fa-caret-down"></i> -${percentageChange}%`;
            }
        });
    }
    // Update fluktuasi pasar finansial secara independen tiap 3 detik
    setInterval(simulateCryptoMarket, 3000);

});
