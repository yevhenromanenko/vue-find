import {savedLetterData} from "@/functions/letters/savedLetterData.js";

export async function loadBdayTemplate() {
    const data = await savedLetterData(this.ladyId, 'template-bday');
    if (data) {
        this.bdaySubject.val = data.subject;
        this.bdayLetter.val = data.letter;
    }
}
