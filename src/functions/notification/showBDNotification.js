import Swal from "sweetalert2";
import {savedLetterData} from "@/functions/letters/savedLetterData.js";
import getLetterFromServer from "@/functions/letters/getLetterFromServer.js";
import getManInfo from "@/functions/men/getManInfo.js";
import replaceTags from "@/functions/invites/replaceTags.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";
import PreSendLetter from "@/functions/letters/preSendLetter.js";
import SendLetter from "@/functions/letters/sendLetter.js";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";

export function showBDNotification(text) {
    return Swal.fire(
        'Привітайте з днем нарождення',
        text,
        'info',
    );
}

window.sendGreetings = async function(manId, ladyId) {
    console.log(manId, ladyId, 'ladyId');


    const data = await getLetterFromServer(ladyId, 'template-bday');
    console.log(data, 'data')
    if (data) {
        const man = await getManInfo(manId)

        const subjectText = replaceTags(data.subject, man);
        const letterText = replaceTags(data.letter, man);

        const formData = await PreSendLetter(subjectText, letterText, '', '', ladyId, manId);
        if (!formData) {
            return;
        }
        const isSend = await SendLetter(manId, formData);
        console.log(isSend, 'isSend')
        if (isSend) {
            showSuccessNotification('Лист було відправлено')
        } else {
            showValidationError('Виникла помилка')
        }
    } else {
        showValidationError('Шаблон не знайдено, спочатку збережіть його на сторінці "Шаблони"')
    }
}
