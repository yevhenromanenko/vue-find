import { setInterval, clearInterval } from 'worker-timers';
import {showValidationError} from "@/functions/notification/showValidationError.js";
import sendToUser from "@/functions/invites/sendToUser.js";

export function sendInvitesWithInterval() {

    this.intervalId = setInterval(async () => {

        if (this.invites.length === 0) {
            showValidationError('Додайте хоча б один інвайт для розсилки!');
            clearInterval(this.intervalId);
            this.isSendingInvites = false;
            return;
        }

        if (this.usersOnline.length  === 0) {
            showValidationError('Чоловіків не було знайдено, можлива помилка на самому сайті! Зачекайте 10 хвилин, якщо помилка досі буде - зверніться до адміністратора!');
            clearInterval(this.intervalId);
            this.isSendingInvites = false;
            return;
        }

        if (!this.isSendingInvites) {
            clearInterval(this.intervalId);
            this.isSendingInvites = false;
            return;
        }

        const filteredInvites = this.invites.filter(invite => invite.isMyMan);
        const filteredInvitesIsBirthday = this.invites.filter(invite => invite.isBirthday);
        const filteredInvitesIsPhoto = this.invites.filter(invite => invite.isPhoto);
        const filteredInvitesIsNoPhoto = this.invites.filter(invite => invite.isNoPhoto);
        const randomInviteList = this.invites.filter(invite => invite.isBirthday !== true && invite.isMyMan !== true && invite.isPhoto !== true && invite.isNoPhoto !== true);

        if (filteredInvites.length < 1 && this.myManSectionIds.length > 0) {
            showValidationError(`У вас є постояльці, але нема жодного інвайту для них, додайте хоча б один інвайт з позначкою "Персональний інвайт"`)
            clearInterval(this.intervalId);
            this.isSendingInvites = false;
            return;
        }

        if (filteredInvitesIsBirthday.length < 1) {
            showValidationError(`Додайте хоча б один інвайт з позначкою "Для тих, у кого день нарождення сьогодні"`)
            clearInterval(this.intervalId);
            this.isSendingInvites = false;
            return;
        }

        const randomUser = this.usersOnline[Math.floor(Math.random() * this.usersOnline.length)];

        const randomInvite = randomInviteList[Math.floor(Math.random() * randomInviteList.length)];
        const randomInviteToMyMan = filteredInvites[Math.floor(Math.random() * filteredInvites.length)];
        const randomInviteToBirthdayMan = filteredInvitesIsBirthday[Math.floor(Math.random() * filteredInvitesIsBirthday.length)];
        const randomInviteIsPhoto = filteredInvitesIsPhoto[Math.floor(Math.random() * filteredInvitesIsPhoto.length)];
        const randomInviteIsNoPhoto = filteredInvitesIsNoPhoto[Math.floor(Math.random() * filteredInvitesIsNoPhoto.length)];

        try {
            const userExists = this.myManSectionIds.some(user => user.manId === randomUser);
            const userBanExists = this.banSectionIds.some(user => user.manId === randomUser);
            const userGetManyMessagesSent = this.manyMessagesSent.includes(randomUser);

            if (userExists) {
                await sendToUser(randomUser, randomInviteToMyMan, randomInviteToBirthdayMan, randomInviteIsPhoto, randomInviteIsNoPhoto, this);
                this.countInvitesForMyUsers++;
            } else if (userBanExists) {
                this.errorInvite++;
                console.log(`${randomUser} у бан листі, не відправляемо`)
            } else if (userGetManyMessagesSent) {
                this.errorInvite++;
                console.log(`${randomUser} у бані на 30 хв, не відправляемо`)
            } else {
                await sendToUser(randomUser, randomInvite, randomInviteToBirthdayMan, randomInviteIsPhoto, randomInviteIsNoPhoto, this);
                this.dailyInviteCounter++;
            }


        } catch (error) {
            console.error('Error sending invite:', error);
            this.errorInvite++;
        }
    }, Math.floor(Math.random() * (4000 - 3000 + 1) + 3000));
}

