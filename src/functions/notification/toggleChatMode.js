import { clearInterval } from 'worker-timers';

export function toggleChatMode() {

    if (this.isSendingInvites) {
        this.stopSendingInvites();
    } else {
        if (this.isChatMode) {
            this.startSendingInvites();
        }
    }

    if (this.isCheckChat) {
        this.isCheckChat = false;
        clearInterval(this.intervalChat);
    } else {
        if (this.isChatMode) {
            this.isCheckChat = true;
            this.incomingChatWithInterval(this);
        }
    }

    this.isChatMode = !this.isChatMode;
}
