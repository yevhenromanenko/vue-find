import {loadFromLocalStorage} from "@/functions/local-storage/loadFromLocalStorage.js";
import {saveToLocalStorage} from "@/functions/local-storage/saveToLocalStorage.js";


export function removeMsgFromArchive(index) {

    const removedMessage = this.msgToArchive.splice(index, 1)[0];

    let storedMessages = loadFromLocalStorage('msgToArchive');
    if (!storedMessages) {
        storedMessages = [];
    }

    const updatedMessages = storedMessages.filter(msg => msg.msgId !== removedMessage.msgId);

    saveToLocalStorage('msgToArchive', updatedMessages);
}
