let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
    console.log(minutes, remainderSeconds);
}

function displayEndTime(timestamp) {
    // 用傳入的timestamp在取得date資訊
    const end = new Date(timestamp);
    // 從date取得小時數
    const hour = end.getHours();
    // 轉12小時制
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    // 從date取得分鐘數
    const minutes = end.getMinutes();
    // 顯示結束時間，與上方一樣，若分鐘數小於10，則前面補0
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// 開始計時（HTML畫面設定好的時間）
function startTimer() {
    // 取得html中設定的data-time（秒數）
    const seconds = parseInt(this.dataset.time);
    // 傳入計時器function
    timer(seconds);
}

// 替每個時間按鈕加上監聽click事件，用來啟動計時function
buttons.forEach(button => button.addEventListener('click', startTimer));

// HTML中的input自訂倒數時間輸入欄位監聽
document.customForm.addEventListener('submit', function (e) {
    // 因為用form，submit後避免跳頁使用preventDefault()來阻止預設事件
    e.preventDefault();
    // 取得input欄位的值
    const mins = this.minutes.value;
    // 傳入計時器
    timer(mins * 60);
    // 清空input
    this.reset();
})