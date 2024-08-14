// import axios from "axios";
// import getManInfo from "@/functions/men/getManInfo.js";
// import {useInfoAboutMan} from "@/functions/men/useInfoAboutMan.js";
// import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
// import {showValidationError} from "@/functions/notification/showValidationError.js";
// import getUserToken from "@/functions/token/getLadyIdFromCookies.js";
//
// const addMyManId = async (myManSectionIds, manId) => {
//      if (manId) {
//         const getInfo = await getManInfo(manId);
//         const ladyId = getUserToken();
//
//         if (getInfo === null) {
//             showValidationError(`Користувача ${manId} не було знайдено на сайті, перевірте ID та спробуйте знову!`)
//         } else {
//             const isMyMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`);
//             const resData = await isMyMenFromServer.data;
//             let isUserOnServer = false;
//
//             if (resData) {
//                 for (const key in resData) {
//                     const resKey = resData[key];
//                     if (resKey && resKey.user && resKey.user.manId === manId) {
//                         isUserOnServer = true;
//                         break;
//                     }
//                 }
//             }
//
//             if (!isUserOnServer) {
//                 const user = useInfoAboutMan(getInfo);
//                 await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`, { user });
//                 showSuccessNotification(`${getInfo.name} був доданий, як Ваш постоялець!`)
//                 myManSectionIds.push(user);
//             } else {
//                 showValidationError(`Користувач ${manId} вже є у вашому списку постояльців!`)
//             }
//         }
//     }
// }
//
// export default addMyManId
import axios from "axios";
import getManInfo from "@/functions/men/getManInfo.js";
import {useInfoAboutMan} from "@/functions/men/useInfoAboutMan.js";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";

const addMyManId = async (myManSectionIds, manId) => {
    if (manId) {
        try {
            const getInfo = await getManInfo(manId);
            const ladyId = getUserToken();

            if (getInfo === null) {
                showValidationError(`Користувача ${manId} не було знайдено на сайті, перевірте ID та спробуйте знову!`);
                return;
            }

            const response = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`);
            const resData = response.data;
            let isUserOnServer = false;

            if (resData) {
                for (const key in resData) {
                    const resKey = resData[key];

                    if (String(resKey.user.manId) === String(manId)) {
                        isUserOnServer = true;
                        break;
                    }
                }
            }

            if (!isUserOnServer) {
                const user = useInfoAboutMan(getInfo);
                await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`, { user });
                showSuccessNotification(`${getInfo.name} був доданий, як Ваш постоялець!`);
                myManSectionIds.push(user);
            } else {
                showValidationError(`Користувач ${manId} вже є у вашому списку постояльців!`);
            }
        } catch (error) {
            console.error("An error occurred while adding the man:", error);
            showValidationError("Виникла помилка при додаванні користувача. Спробуйте ще раз.");
        }
    } else {
        showValidationError("Введіть дійсний ID користувача.");
    }
};

export default addMyManId;
