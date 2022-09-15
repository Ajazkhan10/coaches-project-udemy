export default {
 async contactCoach(context,data){
        const newRequests ={
        //    id: new Date().toISOString(),
        //    coachId:data.coachId,
           email:data.email,
           message:data.message
        };
       const respone= await fetch(`https://mini-project-vue-js-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,{
            method:'POST',
            body:JSON.stringify(newRequests)
        });
        const responseData= await respone.json();
        if(!respone.ok){
            const error=new Error(responseData.message || 'Fail to send Data !')
            throw error;
        }
        newRequests.id=responseData.name; 
        newRequests.coachId=data.coachId;
        context.commit('addRequests',newRequests)
    },
    async fetchRequest(context){
        const coachId=context.rootGetters.userId;
        const token=context.rootGetters.token;
       const response= await fetch(`https://mini-project-vue-js-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+token)
       const responseData= await response.json();
       if(!response.ok){
        const error=new Error(responseData.message || 'Fail to fetch data')
        throw error
       }
       const requests=[];
       for(const key in responseData){
        const request={
            id:key,
            coachId:coachId,
            email:responseData[key].email,
            password:responseData[key].password
        };
        requests.push(request)
       }
       context.commit('setRequests',requests)
    }
}