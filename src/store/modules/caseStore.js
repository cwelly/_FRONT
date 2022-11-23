
import { getAllCase,getFitCase } from "@/api/case";

const caseStore = {
    namespaced: true,
    state: {
        allList: null,
        clickedMaker: null,
        fitList:null,
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
        SET_FIT_LIST: (state, fitList) => {
            state.fitList = fitList;
        }
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
        async getFitCaseList({ commit }, user) {
            console.log("getFitCaseList에 들어왔음 ",user);
            await getFitCase(
                user ,
                ({ data }) => {
                    if (data.resMsg==="Success OK") {
                        commit("SET_FIT_LIST", data.fitList);
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
        }
    },

}


export default caseStore;