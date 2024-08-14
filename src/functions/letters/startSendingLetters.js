import {clearTimeout} from "worker-timers";

export function startSendingLetters() {
    this.isSendingLetters = true;
    this.sendLettersWithInterval();

    if (this.autoStartTimer) {
        clearTimeout(this.autoStartTimer);
        this.autoStartTimer = null;
    }
}
