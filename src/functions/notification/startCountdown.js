
export function startCountdown() {
    let timeLeft = 1800;
    const updateCountdownText = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        this.countdownText = `до оновлення сторінки ${minutes}:${seconds < 10 ? '0' : ''}${seconds} хв`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            this.reloadPage();
        }
    };
    updateCountdownText();
    const countdownInterval = setInterval(updateCountdownText, 1000);
}
