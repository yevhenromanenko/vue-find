import { setTimeout } from 'worker-timers';


export function startAutoStartTimer() {
    if (!this.isSendingInvites) {
        this.autoStartTimer = setTimeout(() => {
            if (!this.isSendingInvites) {
                this.startSendingInvites();
            }
            if (!this.isSendingLetters) {
                this.startSendingLetters();
            }
        }, 5000);
    }
}
