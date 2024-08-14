import { clearInterval, clearTimeout } from 'worker-timers';

export function stopSendingInvites() {
    clearInterval(this.intervalId);
    this.isSendingInvites = false;

    if (this.autoStartTimer) {
        clearTimeout(this.autoStartTimer);
        this.autoStartTimer = null;
    }
}
