import { createStore } from 'vuex'
import coachesModules from './Modules/coaches/index.js'
import requestsModules from './Modules/request/index.js'
import authModules from './Modules/Auth/index.js'
const store=createStore({
  modules: {
    coaches:coachesModules,
    requests:requestsModules,
    auth:authModules
  },
  // state(){
  //   return{
  //     userId:'c3'
  //   }
  // },
  // getters:{
  //   userId(state){
  //     return state.userId
  //   }
  // }
  //  ,
  // state() {
  //   return {
  //     name:'ijaz'
  //   }
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
export default store;