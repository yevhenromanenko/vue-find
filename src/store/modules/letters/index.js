import mutations from './mutations/index.js'
import getters from './getters/index.js'
import actions from './actions/index.js'

const lettersModule = {
    state() {
        return {
            savedLetter: null,
        }
    },
    mutations,
    actions,
    getters
}

export default lettersModule;
