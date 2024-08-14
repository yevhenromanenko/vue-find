import { savedLetterData } from "@/functions/letters/savedLetterData.js";
import replaceTags from "@/functions/invites/replaceTags.js";
import PreSendLetter from "@/functions/letters/preSendLetter.js";
import SendLetter from "@/functions/letters/sendLetter.js";
import { showValidationError } from "@/functions/notification/showValidationError.js";
import getManInfo from "@/functions/men/getManInfo.js";
import { isBirthday } from "@/functions/invites/isBirthday.js";
import getLetterFromServer from "@/functions/letters/getLetterFromServer.js";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";

const sendLetterToUser = async (context, randomUser) => {
    try {
        const data = await savedLetterData(context.ladyId, 'letter');
        if (!data) {
            clearInterval(context.intervalIdLetters);
            context.isSendingLetters = false;
            showValidationError('Додайте лист спочатку!');
            return;
        }

        const man = await getManInfo(randomUser);
        const isBDayToday = isBirthday(man.date_of_birth);

        let subject, letter, photoId, videoId;
        if (isBDayToday) {
            const dataBDay = await getLetterFromServer(context.ladyId, 'template-bday');
            if (dataBDay) {
                subject = replaceTags(dataBDay.subject, man);
                letter = replaceTags(dataBDay.letter, man);
                photoId = '';
                videoId = '';
            } else {
                console.log('Додайте шаблон для тих у кого день нарождення сьогодні');
                subject = replaceTags(data.subject, man);
                letter = replaceTags(data.letter, man);
                photoId = data.photo;
                videoId = data.video;
            }
        } else {
            subject = replaceTags(data.subject, man);
            letter = replaceTags(data.letter, man);
            photoId = data.photo;
            videoId = data.video;
        }

        const formData = await PreSendLetter(subject, letter, photoId, videoId, context.ladyId, randomUser);
        if (!formData) return;

        const isSend = await SendLetter(randomUser, formData);
        if (isSend) {
            context.logsLetter.unshift({
                id: randomUser,
                manName: man.name,
                manLocation: man.country,
                profileLink: `${SITE_DOMEIN}/search/man_profile/all/${randomUser}`,
                srcPhoto: man.avatar
                    ? `https://api.findbride.com/api/v3/private_files/main/center-268x217/${man.avatar.full.filename}`
                    : 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png',
                text: subject,
            });
            context.dailyLetterCounter++;
        } else {
            context.errorLetter++;
            console.error('Ошибка отправки письма: ', isSend, 'для пользователя: ', randomUser, 'от: ', context.ladyId);
        }
    } catch (error) {
        console.error('Ошибка выполнения функции sendLetterToUser: ', error);
        showValidationError('Произошла ошибка при отправке письма.');
    }
};

export default sendLetterToUser;
