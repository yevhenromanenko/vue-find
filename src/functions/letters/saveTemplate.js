import axios from "axios";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";

export async function saveTemplate(type) {
    const ladyId = this.ladyId;
    let url = '';

    if (type === 'bday') {
        if (!this.bdaySubject.isValid || !this.bdayLetter.isValid) {
            this.formIsValidBday = false;
            return;
        }


        const letterData = {
            ladyId: ladyId,
            subject: this.bdaySubject.val,
            letter: this.bdayLetter.val,
        }

        console.log(letterData, 'letterData')

        try {
            url = `https://find-db-default-rtdb.europe-west1.firebasedatabase.app/template-bday/${ladyId}.json`;
            const response = await axios.put(url, {letterData});
            const savedLetter = response.data;
            console.log(savedLetter)
            this.bdaySubject.val = savedLetter.subject;
            this.bdayLetter.val = savedLetter.letter;
            showSuccessNotification('Шаблон для чоловіків, у яких день нарождення було збережено!');
        } catch (error) {
            showValidationError('Виникла помилка при збереженні шаблону!');
            console.error('Ошибка при сохранении письма:', error);
        }

    } else if (type === 'online') {
        if (!this.onlineSubject.isValid || !this.onlineLetter.isValid) {
            this.formIsValidOnline = false;
            return;
        }

        const letterData = {
            ladyId: this.ladyId,
            subject: this.onlineSubject.val,
            letter: this.onlineLetter.val,
        }

        try {
            url = `https://find-db-default-rtdb.europe-west1.firebasedatabase.app/template-online/${ladyId}.json`;
            const response = await axios.put(url, {letterData});
            const savedLetter = response.data;
            console.log(savedLetter)
            this.onlineSubject.val = savedLetter.subject;
            this.onlineLetter.val = savedLetter.letter;
            showSuccessNotification('Шаблон для чоловіків які онлайн було збережено!');
        } catch (error) {
            showValidationError('Виникла помилка при збереженні шаблону!');
            console.error('Ошибка при сохранении письма:', error);
        }
    }
}
