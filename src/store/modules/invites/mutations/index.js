import {showValidationError} from "@/functions/notification/showValidationError.js";
import {showSuccessNotification} from "@/functions/notification/showSuccessNotification.js";
import axios from "axios";
import {showDeleteNotification} from "@/functions/notification/showDeleteNotification.js";
import {successNotification} from "@/functions/notification/successNotification.js";

export default {
    async addInvite(state, payload) {
        const enteredInvite = payload.text;

        if (enteredInvite.trim().length < 5) {
            showValidationError('Інвайт має бути не менше 5 символів!');
            return;
        } else if (enteredInvite.trim().length > 80) {
            showValidationError('Інвайт має бути не більше 80 символів!');
            return;
        }

        if (enteredInvite.trim() === '') {
            this.inputIsInvalid = true;
            return;
        }

        const newInvite = {
            id: Date.now().toString(),
            ladyId: payload.ladyId,
            text: enteredInvite,
            isMyMan: payload.isMyMan,
            isBirthday: payload.isBirthday,
            isPhoto: payload.isPhoto,
            isNoPhoto: payload.isNoPhoto,
        }

        const response = await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/invites/${payload.ladyId}.json`, {newInvite});

        if (response.status === 200) {
            showSuccessNotification('Було додано новий інвайт!');
        }
        state.invites.unshift(newInvite);
    },

     async removeInvite(state, index) {
         const result = await showDeleteNotification('Ви впевнені, що хочете видалити інвайт?');
         if (result.isConfirmed) {
             const inviteToRemove = state.invites[index];
             const ladyId = inviteToRemove.ladyId;
             const inviteId = inviteToRemove.id;

             const invitesResponse = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/invites/${ladyId}.json`);
             const invitesData = invitesResponse.data;

             const inviteKey = Object.keys(invitesData).find(key => invitesData[key].newInvite.id === inviteId);

             if (inviteKey) {
                 const deleteResponse = await axios.delete(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/invites/${ladyId}/${inviteKey}.json`);

                 if (deleteResponse.status === 200) {
                     // Remove the invite from the state
                     state.invites.splice(index, 1);
                     await successNotification();
                 } else {
                     showValidationError('Не вдалося видалити інвайт з сервера!');
                 }
             } else {
                 showValidationError('Інвайт не знайдено на сервері!');
             }
         }
    },
    loadInvites(state, invites) {
        state.invites = invites;
    }

}
