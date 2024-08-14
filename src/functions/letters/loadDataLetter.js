import {savedLetterData} from "@/functions/letters/savedLetterData.js";

export async function loadData() {
    const data = await savedLetterData(this.ladyId, 'letter');
    if (data) {
        this.subject.val = data.subject;
        this.letter.val = data.letter;
        this.photo.val = data.photo;
        this.video.val = data.video;
    }
}
