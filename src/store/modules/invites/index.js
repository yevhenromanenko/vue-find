import mutations from './mutations/index.js'
import getters from './getters/index.js'
import actions from './actions/index.js'

const invitesModule = {
    state() {
        return {
            invites: []
        }
    },
    mutations,
    actions,
    getters
}

export default invitesModule;
