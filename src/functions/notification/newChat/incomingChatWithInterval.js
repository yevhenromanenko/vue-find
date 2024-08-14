import checkingIncomingChat from "@/functions/notification/newChat/сheckingIncomingChat.js";
import {newChatNotification} from "@/functions/notification/newChat/newChatNotification.js";
import {setInterval, clearInterval } from 'worker-timers';

export function incomingChatWithInterval(context) {
        this.intervalChat = setInterval(async () => {

            if (!context.isCheckChat) {
                clearInterval(context.intervalChat);
                context.isCheckChat = false;
                return;
            }

            const result = await checkingIncomingChat(context.banSectionIds, context.ladyId, context.errorInvite, context.manyMessagesSent);
            if (result) {
                context.startChat = true;

                const confirm = await newChatNotification();
                if (confirm.isConfirmed) {
                    if (context.isSendingInvites) {
                        context.stopSendingInvites();
                    }
                    if (context.isCheckChat) {
                        context.isCheckChat = false;
                        clearInterval(context.intervalChat);
                    }
                    context.isChatMode = !context.isChatMode;
                }
            }
        }, 10000);
}
