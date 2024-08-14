import newChatFromFind from "@/functions/notification/newChat/newChatFromFind.js";
import useIncomingChat from "@/functions/notification/newChat/useIncomingChat.js";
import getManInfo from "@/functions/men/getManInfo.js";
import {autoAnswerText} from "@/functions/notification/newChat/autoAnswerText.js";
import sendInvite from "@/functions/invites/sendInvite.js";
import {newChat} from "@/functions/notification/newChat/newChat.js";

const checkingIncomingChat = async (banSectionIds, ladyId, errorInvite, manyMessagesSent) => {
    const incomingChat = useIncomingChat();
    const allIncomingChats = await newChatFromFind();
    if (!allIncomingChats) {
        return null;
    }

    for (const item of allIncomingChats.messages) {
        if (!incomingChat.dataIncomingChat.whoGetAnswer.includes(item.source_user_id)) {
            const infMan = await getManInfo(`${item.source_user_id}`);
            if (!infMan) {
                const newDataIncomingChat = {
                    newChat: null,
                    chatWithoutAutoAnswer: null,
                    whoGetAnswer: [...incomingChat.dataIncomingChat.whoGetAnswer, item.source_user_id],
                    infoMan: { autoName: '', autoId: '', message: null }
                };
                incomingChat.saveIncomingChat(newDataIncomingChat);

            } else {
                const autoId = infMan.id;
                const autoName = infMan.name;
                const text = autoAnswerText[Math.floor(Math.random() * autoAnswerText.length)].replace(/%Name%/g, autoName);

                await sendInvite(autoId, text, banSectionIds, ladyId, errorInvite, manyMessagesSent);
                await newChat('сработала функция из checkingIncomingChat')
                console.log(`Входящее сообщение, отправляю инвайт пользователю: ${autoId} - ${autoName}. Текст инвайта: ${text}`);
                const newDataIncomingChat = {
                    newChat: true,
                    chatWithoutAutoAnswer: null,
                    whoGetAnswer: [...incomingChat.dataIncomingChat.whoGetAnswer, Number(autoId)],
                    infoMan: { autoName: autoName, autoId: autoId, message: text }
                };
                incomingChat.saveIncomingChat(newDataIncomingChat);

                return newDataIncomingChat;
            }
        }
    }
    return null;
}

export default checkingIncomingChat;
