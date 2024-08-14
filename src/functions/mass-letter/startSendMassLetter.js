import {getMyMenFromServerMassLetter} from "@/functions/mass-letter/getMyMenFromServerMassLetter.js";
import getManInfo from "@/functions/men/getManInfo.js";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import PreSendLetter from "@/functions/letters/preSendLetter.js";
import sendLetter from "@/functions/letters/sendLetter.js";
import replaceTags from "@/functions/invites/replaceTags.js";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";

async function startSendMassLetter(context) {
    context.isSendingMassLetters = true;

    const myManSectionIdsMassLetter = await getMyMenFromServerMassLetter(context.ladyId);

    if (myManSectionIdsMassLetter.length === 0) {
        showSuccessNotification('Розсилка була завершена! Повторіть через 5 днів! out');
        context.isSendingMassLetters = false;
        return;
    }
    const sendToUser = async () => {

        if (myManSectionIdsMassLetter.length === 0) {
            showSuccessNotification('Розсилка була завершена! Повторіть через 5 днів! in');
            context.isSendingMassLetters = false;
            clearInterval(context.intervalIdMassLetters);
            return;
        }

        if (!context.isSendingMassLetters) {
            clearInterval(context.intervalIdMassLetters);
            context.isSendingMassLetters = false;
            return;
        }

        const randomIndex = Math.floor(Math.random() * myManSectionIdsMassLetter.length);
        const manId = myManSectionIdsMassLetter[randomIndex];

        const man = await getManInfo(manId.manId);
        const subject = replaceTags(context.subjectMassLetter.val, man);
        const letter = replaceTags(context.letterMassLetter.val, man);
        const photoId = context.photoMassLetter.val;
        const videoId = context.videoMassLetter.val;

        if (subject && letter) {
            const formData = await PreSendLetter(subject, letter, photoId, videoId, context.ladyId, manId.manId);

            if (formData) {
                const success = await sendLetter(manId.manId, formData);
                if (success) {
                    context.logsMassLetter.unshift({
                        id: manId.manId,
                        manName: man.name,
                        manLocation: man.country,
                        profileLink: `${SITE_DOMEIN}/search/man_profile/all/${manId.manId}`,
                        srcPhoto: man.avatar
                            ? `https://api.findbride.com/api/v3/private_files/main/center-268x217/${man.avatar.full.filename}`
                            : 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png',
                        text: subject,
                    });

                    context.massLetterCounter++;
                } else {
                    context.massLetterErrorCounter++
                    context.logsMassLetter.unshift({
                        id: manId.manId,
                        manName: man.name,
                        manLocation: man.country,
                        profileLink: `${SITE_DOMEIN}/search/man_profile/all/${manId.manId}`,
                        srcPhoto: man.avatar
                            ? `https://api.findbride.com/api/v3/private_files/main/center-268x217/${man.avatar.full.filename}`
                            : 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png',
                        text: `Помилка відправки листа користувачу: ${man.name} - ${manId.manId}`,
                    });
                    console.error(`Failed to send letter to user ID: ${manId.manId}`);
                }
            } else {
                context.massLetterErrorCounter++
                console.error(`Failed to prepare letter for user ID: ${manId.manId}`);
            }

            myManSectionIdsMassLetter.splice(randomIndex, 1);
        } else {
            clearInterval(context.intervalIdMassLetters);
            context.isSendingMassLetters = false;
            showValidationError('Додайте спочатку тему та лист, а також оберіть фото та відео для розсилки!');
        }

    };

    sendToUser();

    context.intervalIdMassLetters = setInterval(sendToUser, 20000);
}

export default startSendMassLetter;
