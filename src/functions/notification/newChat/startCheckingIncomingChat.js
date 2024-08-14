
export function startCheckingIncomingChat() {
    this.isCheckChat = true;
    this.incomingChatWithInterval(this);
}
