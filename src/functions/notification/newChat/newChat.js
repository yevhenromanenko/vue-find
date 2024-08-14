import newChatFromFind from "@/functions/notification/newChat/newChatFromFind.js";
import {getCurrentMonthYear} from "@/functions/local-storage/getCurrentMonthYear.js";
import {loadFromLocalStorage} from "@/functions/local-storage/loadFromLocalStorage.js";
import {saveToLocalStorage} from "@/functions/local-storage/saveToLocalStorage.js";
import {clearLocalStorage} from "@/functions/local-storage/clearLocalStorage.js";
import addMyManFromIncomingChat from "@/functions/men/addMyManFromIncomingChat.js";

export async function newChat(msg) {
    try {
        const data = await newChatFromFind();
        console.log(msg)

        const currentMonthYear = getCurrentMonthYear();
        const storedMonthYear = loadFromLocalStorage('msgToArchiveMonth');

        if (storedMonthYear !== currentMonthYear) {
            clearLocalStorage();
            saveToLocalStorage('msgToArchiveMonth', currentMonthYear);
        }

        let storedMessages = loadFromLocalStorage('msgToArchive');
        if (!storedMessages) {
            storedMessages = [];
        }

        if (data && data.messages) {
            const messages = data.messages;

            if (!Array.isArray(this.msgToArchive)) {
                this.msgToArchive = [];
                console.warn('msgToArchive was not an array, initialized to an empty array');
            }


            for (const message of messages) {

                // добавляем в список постояльцев, то есть с кем было общение
                await addMyManFromIncomingChat(this.myManSectionIds, message.source_user_id)

                const exists = storedMessages.some(
                    msg => msg.msgId === message.chat_message_id
                );


                if (!exists) {
                    const createdAt = message.created_at;
                    const date = new Date(createdAt * 1000);

                    const day = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const year = String(date.getUTCFullYear()).slice(2);

                    const hours = String(date.getUTCHours()).padStart(2, '0');
                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

                    const formattedDate = `${hours}:${minutes} - ${day}.${month}.${year}`;

                    const newChat = {
                        msgId: message.chat_message_id,
                        date: formattedDate,
                        ladyId: message.target_user_id,
                        manId: message.source_user_id,
                        content: message.content,
                    };

                    storedMessages.push(newChat);
                    this.msgToArchive.push(newChat);
                }
            }

            saveToLocalStorage('msgToArchive', storedMessages);
            this.msgLength = messages.length;
        } else {
            console.error('Failed to fetch data');
        }
    } catch (e) {
        console.error(e);
    }
}
