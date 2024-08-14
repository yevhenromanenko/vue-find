import replaceTags from "@/functions/invites/replaceTags.js";
import checkForForbiddenTags from "@/functions/invites/checkForForbiddenTags.js";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";
import getManInfo from "@/functions/men/getManInfo.js";
import sendInvite from "@/functions/invites/sendInvite.js";
import {isBirthday} from "@/functions/invites/isBirthday.js";
const sendToUser = async (randomUser, randomInvite, randomInviteToBirthdayMan, randomInviteIsPhoto, randomInviteIsNoPhoto, context) => {

    let inviteText;
    const man = await getManInfo(randomUser);
    const dateOfBirth = man.date_of_birth;
    const isBDayToday = isBirthday(dateOfBirth);
    const avatar = man.avatar;

    if (!context.sentMessages) {
        context.sentMessages = {
            noPhoto: [],
            birthday: [],
            hasPhoto: []
        };
    }
    const hasReceivedMessage = (type) => {
        return context.sentMessages[type].includes(randomUser);
    };

    if (isBDayToday && !hasReceivedMessage('birthday') && randomInviteToBirthdayMan) {
        inviteText = replaceTags(randomInviteToBirthdayMan.text, man);
        context.sentMessages.birthday.push(randomUser);
    } else if (avatar === null && !hasReceivedMessage('noPhoto') && randomInviteIsNoPhoto) {
        inviteText = replaceTags(randomInviteIsNoPhoto.text, man);
        context.sentMessages.noPhoto.push(randomUser);
    } else if (avatar !== null && !hasReceivedMessage('hasPhoto') && randomInviteIsPhoto) {
        inviteText = replaceTags(randomInviteIsPhoto.text, man);
        context.sentMessages.hasPhoto.push(randomUser);
    } else {
        inviteText = replaceTags(randomInvite.text, man);
    }

    if (inviteText === undefined) {
        context.errorInvite++;
        console.log('інвайт не знайдено');
        return;
    }

    const hasForbiddenTags = checkForForbiddenTags(inviteText);
    if (hasForbiddenTags) {
        context.errorInvite++;
        console.log('Инвайт содержит запрещенные теги. Начинаем заново рассылку');
        clearInterval(context.intervalId);
        context.isSendingInvites = false;
        context.startSendingInvites();
        return;
    }

    context.logsInvite.unshift({
        id: randomUser,
        manName: man.name,
        manLocation: man.country,
        profileLink: `${SITE_DOMEIN}/search/man_profile/all/${randomUser}`,
        srcPhoto: man.avatar
            ? `https://api.findbride.com/api/v3/private_files/main/center-268x217/${man.avatar.full.filename}`
            : 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png',
        text: inviteText,
    });

    const res = await sendInvite(randomUser, inviteText, context.banSectionIds, context.ladyId, context.errorInvite, context.manyMessagesSent);

    if (!res) {
        context.errorInvite++;
    }
}

export default sendToUser;
