import getManInfo from "@/functions/men/getManInfo.js";
import {isBirthday} from "@/functions/invites/isBirthday.js";

export async function bDayToday() {
    const birthdayUsers = [];

    await Promise.all(this.usersOnline.map(async id => {
        const getUserInfo = await getManInfo(id);
        const dateOfBirth = getUserInfo.date_of_birth;
        const isBDayToday = isBirthday(dateOfBirth);

        if (isBDayToday) {
            birthdayUsers.push(getUserInfo);
        }
    }));

    return birthdayUsers;
}

// function isBirthday(dateOfBirth) {
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
//     return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
// }
