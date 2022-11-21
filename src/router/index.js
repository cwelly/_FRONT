import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "@/store";

Vue.use(VueRouter)

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("토큰확인 드가자");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};


const routes = [
  {
    path: '/',
    name: 'VueMain',
    component: () => import( '../views/VueMain.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/VueUser"),
    children: [
      {
        path: "join",
        name: "join",
        component: () => import("@/components/user/UserRegister"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin"),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserMyPage"),
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/VueMap"),
    children: [
      {
        path: "drawmap",
        name: "drawmap",
        component: () => import("@/components/map/MapDrawMap"),
      },
      {
        path: "seeall",
        name: "seeall",
        component: () => import("@/components/map/MapSeeAll"),
      },
    ],
  },
  {
    path: "/case",
    name: "case",
    component: () => import("@/views/VueAllCase"),
    children: [
      {
        path: "drawallamp",
        name: "drawallamp",
        component: () => import("@/components/case/CaseDrawAllMap"),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
