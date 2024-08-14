import axios from "axios";

export default {
    addInvite({ commit }, invite) {
        setTimeout(() => {
            commit('addInvite', invite);
        }, 300);
    },
    removeInvite({ commit }, index) {
        setTimeout(() => {
            commit('removeInvite', index);
        }, 300);
    },
    async loadInvites(context) {
        const ladyId = context.rootGetters.loadedLadyId;

        const res = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/invites/${ladyId}.json`);
        const resData = await res.data;

        if (res.status !== 200) {
            const error = new Error(resData.message || 'Failed to fetch request');
            throw error;
        }

        if (resData) {
            const invites = [];

            for (const key in resData) {
                const resKey = resData[key];
                const invite = {
                    id: resKey.newInvite.id,
                    ladyId: resKey.newInvite.ladyId,
                    text: resKey.newInvite.text,
                    isMyMan: resKey.newInvite.isMyMan,
                    isBirthday: resKey.newInvite.isBirthday,
                    isPhoto: resKey.newInvite.isPhoto,
                    isNoPhoto: resKey.newInvite.isNoPhoto
                }

                invites.unshift(invite);
            }

            context.commit('loadInvites', invites);
        }
    }
}
