import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        settings
    },
    getters
})

export default store
