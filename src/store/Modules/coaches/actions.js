export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      // id:new Date().toISOString(),
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      areas: data.areas,
      hourlyRate: data.rate,
    };
    const token=context.rootGetters.token;
    const response = await fetch(
      `https://mini-project-vue-js-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=`+token,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    // const responseData=await response.json()
    if (!response.ok) {
      // errror!
    }

    context.commit("registercoach", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context,paylaod) {
    if(!paylaod.forceRefresh && !context.getters.shouldUpdate){
      return;
    }
    const response = await fetch(
      `https://mini-project-vue-js-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error =new Error(responseData.message || 'feail to fetch!')
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit('SetCoaches', coaches);
    context.commit('setFetchNewTime')
  }
  
};
