import http from "@/api/http-common";

async function login(user, success, fail) {
    await http.post(`/user/login/${user.emailid}/${user.emaildomain}/${user.password}`).then(success).catch(fail);
    // await http.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userno ,success , fail) {
    http.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await http.get(`/user/info/${userno}`).then(success).catch(fail);
  
}

async function tokenRegeneration(user ,success , fail) {
    http.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await http.post(`/user/refresh`, user).then(success).catch(fail);
  
}

async function logout(userno ,success , fail) {
    await http.get(`/user/logout/${userno}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout };