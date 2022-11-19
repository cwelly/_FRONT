const mapStore = {
    namespaced: true,
    state: {
        aptList:null,
    },
    getters: {
        getAptList(state) {
            return state.aptList;
        }
    },
    mutations: {
        SET_APTLIST(state, aptList) {
            state.aptList = aptList;
        },
    },
    actions: {
        
    },
};

export default mapStore;