

export function stopSendingMassLetters() {
    this.isSendingMassLetters = false;
    clearInterval(this.intervalIdMassLetters);
}
