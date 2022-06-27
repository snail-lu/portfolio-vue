import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            isScreenFull: false
        };
    },
    mutations: {
        CHANGE_SETTING: (state, { key, value }) => {
            if (state.hasOwnProperty(key)) {
                state[key] = value;
            }
        }
    },
    actions: {
        changeSetting({ commit }, data) {
            commit('CHANGE_SETTING', data);
        }
    }
});

export default store;
