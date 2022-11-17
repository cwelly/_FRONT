import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
        path: "dong",
        name: "dong",
        component: () => import("@/components/map/MapDong"),
      },
      {
        path: "name",
        name: "name",
        component: () => import("@/components/map/MapName"),
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
