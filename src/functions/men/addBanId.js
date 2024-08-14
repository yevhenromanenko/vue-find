import getManInfo from "@/functions/men/getManInfo.js";
import {useInfoAboutMan} from "@/functions/men/useInfoAboutMan.js";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";
import axios from "axios";

export async function addBanId() {
    if (this.newBanId) {
        const getInfo = await getManInfo(this.newBanId);

        if (getInfo === null) {
            showValidationError(`Користувача ${this.newBanId} не було знайдено на сайті, перевірте ID та спробуйте знову!`)
        } else {
            const isBanMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${this.ladyId}.json`);
            const resData = await isBanMenFromServer.data;
            let isBanUserOnServer = false;

            if (resData) {
                for (const key in resData) {
                    const resKey = resData[key];
                    if (String(resKey.user.manId) === String(this.newBanId)) {
                        isBanUserOnServer = true;
                        break;
                    }
                }
            }

            if (isBanUserOnServer) {
                showValidationError(`Користувач ${getInfo.name} вже є у вашому списку бан юзерів!`);
                this.newBanId = '';
            } else {
                const user = useInfoAboutMan(getInfo);
                await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${this.ladyId}.json`, { user });
                showSuccessNotification(`${getInfo.name} був доданий у бан лист!`);
                this.banSectionIds.push(user);
                this.newBanId = '';
            }
        }
    }
}
