  <template>
   <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{error}}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="authentication..." fixed>
     <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model.trim="password" />
    </div>
      <p v-if="!formIsValid">Please Enter Valid Email and password must be (at least 6 charachter long)</p>
    <base-button>{{submitButtonCaption}}</base-button>
    <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
  </form>
</base-card>
   </div>
</template>
  <script>
export default {
    data(){
        return{
            email:'',
            password:'',
            mode:'login',
            formIsValid:true,
            isLoading:false,
            error:null
        }
    },
    computed:{
        submitButtonCaption(){
          if(this.mode==='login'){
            return 'login'
          }else{
            return 'SignUp'
          }
        },
        switchModeButtonCaption(){
           if(this.mode === 'login'){
            return 'SignUp Instead'
           }else{
            return 'Login Instead'
           }
        }
    },
    methods:{
      async submitForm(){
            this.formIsValid=true;
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid=false;
                return;
            }
            this.isLoading=true;
            const acationPayload= {
                  email:this.email,
                  password:this.password
                }
           try{
            if(this.mode === 'login'){
                this.$store.dispatch('login',acationPayload)
            }else{
             await this.$store.dispatch("signup",acationPayload)
            //  {
            //         email:this.email,
            //         password:this.password
            //     })
            }
            const  redirectUrl= '/' +(this.$route.query.redirect || 'coaches') // or '/coaches'
            this.$router.replace(redirectUrl)
            }catch(err){
                this.error= err.message || 'fail to Authenticate'
            }
            this.isLoading=false;
        },
        switchAuthMode(){
            if(this.mode === 'login'){
                this.mode ='signup'
            }else{
                this.mode = 'login'
            }
        },
        handleError(){
            this.error=null
        }
    }
};
</script>
<style scope>
form {
  margin: 1rem;
  /* border: 1px solid #ccc;
  border-radius: 12px; */
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>