const mapStore = {
    namespaced: true,
    state: {
        aptList:null,
    },
    getters: {
        
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