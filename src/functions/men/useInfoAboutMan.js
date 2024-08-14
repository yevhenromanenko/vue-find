import {differenceInDays, parseISO} from "date-fns";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";

export function useInfoAboutMan(getInfo) {
    const dateOfBirth = getInfo.date_of_birth;

    const today = new Date();
    const birthDate = parseISO(dateOfBirth);
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBday < today) {
        nextBday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }

    const daysBefore = differenceInDays(nextBday, today);

    const manInfo = {
        manId: getInfo.id,
        manName: getInfo.name,
        manLocation: getInfo.country,
        profileLink: `${SITE_DOMEIN}/search/man_profile/all/${getInfo.id}`,
        srcPhoto: getInfo.avatar
            ? `https://api.findbride.com/api/v3/private_files/main/center-268x217/${getInfo.avatar.full.filename}`
            : 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png',
        daysBefore: daysBefore
    };

    return manInfo;
}
