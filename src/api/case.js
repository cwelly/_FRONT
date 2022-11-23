import http from "@/api/http-common";


async function getAllCase( success, fail) {
    await http.get(`/case.do/getall`).then(success).catch(fail);
}

async function getFitCase(user, success, fail) {
    await http.get(`/case.do/getfit/${user.sex}/${user.age}/${user.trans}`).then(success).catch(fail);
}
async function getWayCase(way, success, fail) {
    await http.get(`/case.do/getway/${way.lat1}/${way.lat2}/${way.lng1}/${way.lng2}`).then(success).catch(fail);
}

export { getAllCase,getFitCase,getWayCase};