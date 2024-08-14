import { clearTimeout } from 'worker-timers';

export function startSendingInvites() {
    this.isSendingInvites = true;
    this.sendInvitesWithInterval();

    if (this.autoStartTimer) {
        clearTimeout(this.autoStartTimer);
        this.autoStartTimer = null;
    }
}
