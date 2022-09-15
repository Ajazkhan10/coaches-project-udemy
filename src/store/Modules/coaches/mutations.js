export default {
    registercoach(state,payload){
        state.coaches.push(payload);
    },
    SetCoaches(state,payload){
        state.coaches=payload;
    },
    setFetchNewTime(state){
        state.lastFetch=new Date().getTime();
    }
}
