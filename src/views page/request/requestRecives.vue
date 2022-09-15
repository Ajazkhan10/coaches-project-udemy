<template>
   <div>
    <base-dialog :show="!!error" title="An Error occured!" @close="handleError">
    <p>{{error}}</p>
    </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
       <base-spinner v-if="isloading"></base-spinner>
      <ul v-else-if="hasRequests && !isloading">
        <request-items v-for="req in receivedRequest" :key="req.id" :email="req.email" :message="req.message"></request-items>
      </ul>
      <h3 v-else>You haven't received any requests yet !</h3>
    </base-card>
  </section>
   </div>
</template>
<script>
import RequestItems from '../../components/requests/RequestItems.vue'; 
export default {
  data(){
     return{
      isloading:false,
      error:null,
     }
  },
    computed:{
        receivedRequest(){
          return  this.$store.getters['requests/Requests'] 
          // console.log(this.$store.getters['requests/requests'])
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests']
        }
    },
    created(){
      this.loadRequests();
    },
    components:{
        RequestItems,
    },
    methods:{
     async loadRequests(){
       this.isloading=true;
       try {
         await this.$store.dispatch('requests/fetchRequest');
       } catch (error) {
        this.error=error.message || 'somthing went wrong' ;
       }
        this.isloading=false
      },
      handleError(){
        this.error=null;
      }
    },
 
}
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>