<template>
    <div>
       <section>
       <base-card>
       
        <h1>Register as a Coach Now !</h1>
         <coachForm @save-data="saveData"></coachForm>
       </base-card>
       </section>
    </div>
</template>
<script>
import coachForm from '../../components/Coaches/coachForm.vue'
export default {
    name:'coachRegister',
    components:{coachForm},
   methods:{
    saveData(data){ 
      this.$store.dispatch('coaches/registerCoach',data);
      this.$router.replace('/coaches')
    }
   },
  
}
</script>