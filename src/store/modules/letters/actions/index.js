import axios from "axios";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";

export default {
    async saveLetter(context, data) {
        const letterData = {
            ladyId: data.ladyId,
            subject: data.subject,
            letter: data.letter,
            photo: data.photo,
            video: data.video,
        }

        try {
            const response = await axios.put(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/letter/${data.ladyId}.json`, {letterData});
            const savedLetter = response.data;
            context.commit('setSavedLetter', savedLetter)
            showSuccessNotification('Лист було збережено!');
        } catch (error) {
            showValidationError('Виникла помилка при збереженні листа!');
            console.error('Ошибка при сохранении письма:', error);
        }
    },
    async saveLetterToServer(context, letter) {
        try {
            console.log('Письмо успешно сохранено на сервере:', letter);
        } catch (error) {
            console.error('Ошибка при сохранении письма на сервер:', error);
        }
    },
}
