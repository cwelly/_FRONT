
import { getAllCase, } from "@/api/case";

const caseStore = {
    namespaced: true,
    state: {
        allList: null,
        clickedMaker:null,
    },
    getters: {
        checkAllList: function (state) {
            return state.allList;
        },
    },
    mutations: {
        SET_ALL_LIST: (state, allList) => {
            state.allList = allList;
        },
        SET_CLICKED_MARKER: (state, clickedMaker) => {
            state.clickedMaker = clickedMaker;
            },
    },
    actions: {
        async getAllCaseList({ commit }) {
            await getAllCase(
                ({ data }) => {
                    if (data.resMsg==="Success OK") {
                        commit("SET_ALL_LIST", data.caseList);
                        console.log("불러오기 성공!");
                    }
                    else {
                        console.log("불러올 데이터 없음");
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        },
    },

}


export default caseStore;