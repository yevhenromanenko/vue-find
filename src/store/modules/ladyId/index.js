import actions from "@/store/modules/ladyId/actions/index.js";
import mutations from "@/store/modules/ladyId/mutations/index.js";
import getters from "@/store/modules/ladyId/getters/index.js";

const ladyIdModule = {
    state() {
        return {
            ladyId: '',
        }
    },
    mutations,
    actions,
    getters
}

export default ladyIdModule;
