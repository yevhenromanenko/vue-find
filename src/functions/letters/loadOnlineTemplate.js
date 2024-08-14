import {savedLetterData} from "@/functions/letters/savedLetterData.js";

export async function loadOnlineTemplate() {
    const data = await savedLetterData(this.ladyId, 'template-online');
    if (data) {
        this.onlineSubject.val = data.subject;
        this.onlineLetter.val = data.letter;
    }
}
