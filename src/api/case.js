import http from "@/api/http-common";


async function getAllCase( success, fail) {
    await http.get(`/case.do/getall`).then(success).catch(fail);
}


export { getAllCase};