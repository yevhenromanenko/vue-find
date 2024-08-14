import { createStore } from "vuex";
import invitesModule from "@/store/modules/invites/index.js";
import lettersModule from "@/store/modules/letters/index.js";
import ladyIdModule from "@/store/modules/ladyId/index.js";


const store = createStore({
    modules: {
        invitesModule,
        lettersModule,
        ladyIdModule
    },
})

export default store;
