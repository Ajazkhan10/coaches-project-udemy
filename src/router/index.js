import { createRouter, createWebHistory } from "vue-router";
import coachDeatils from "../views page/coaches/coachDeatils.vue";
import coachList from "../views page/coaches/coachList.vue";
import coachRegister from "../views page/coaches/coachRegister.vue";

import contactCoach from "../views page/request/contactCoach.vue";
import requestRecives from "../views page/request/requestRecives.vue";

import PageNotFound from "../views page/PageNotFound.vue";

import UserAuth from '../views page/Auth/UserAuth.vue'


import store from "@/store/index.js";
const routes = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "coaches",
    component: coachList,
  },
  {
    path: "/coaches/:id",
    component: coachDeatils,
    props: true,
    children: [{ path: "contact", component: contactCoach }],
  },

  {
    path: "/requests",
    name: "requests",
    component: requestRecives,
    meta:{requiresAuth:true}
  },
  {
    path: "/register",
    name: "register",
    component: coachRegister,
    meta:{requiresAuth:true}
  },
  {
    path: "/:notFound(.*)",
    name: "pageNotFound",
    component: PageNotFound,
  },
  {
    path: "/auth",
    name: "userAuth",
    component: UserAuth,
    meta:{requiresUauth:true}

  },
  // {
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     // import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function(to , _ ,next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
  }else if(to.meta.requiresUauth && store.getters.isAuthenticated){
    next('/coaches')
  }else{
    next();
  }
})

export default router;
