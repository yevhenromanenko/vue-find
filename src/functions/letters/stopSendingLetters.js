import {clearTimeout} from "worker-timers";

export function stopSendingLetters() {
    this.isSendingLetters = false;
    clearInterval(this.intervalIdLetters);

    if (this.autoStartTimer) {
        clearTimeout(this.autoStartTimer);
        this.autoStartTimer = null;
    }
}
