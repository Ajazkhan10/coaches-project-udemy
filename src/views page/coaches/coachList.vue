<template>
  <div>
    <base-dialog :show="!!error" title="An Error occured!" @close="handleError">
    <p>{{error}}</p>
    </base-dialog>
    <section>
      <coachesFilter @change-filter="setChange"></coachesFilter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login To Register as a Coach</base-button>
          <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">Register as a Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coachItem
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coachItem>
        </ul>
        <p v-else>Coaches is not Found</p>
      </base-card>
    </section>
  </div>
</template>
<script>
// import baseButton from '../../ui/baseButton.vue';
import coachItem from "../../components/Coaches/coachItem.vue";
import coachesFilter from "../../components/Coaches/coachesFilter.vue";
// import base-card from "@/ui/base-card.vue";
export default {
  name: "coachComponent",
  data() {
    return {
      isLoading: false,
      error:null,
      activesFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  components: {
    coachItem,
    coachesFilter
    // base-card,
    // baseButton
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.isAuthenticated;
    },
    filterCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(abc => {
        if (this.activesFilters.frontend && abc.areas.includes("frontend")) {
          return true;
        }
        if (this.activesFilters.backend && abc.areas.includes("backend")) {
          return true;
        }
        if (this.activesFilters.career && abc.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    // ;;;;;
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    }
    // namefirst(){
    //   return this.$store.getters['coaches/name']
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setChange(updatedFilters) {
      this.activesFilters = updatedFilters;
    },
    async loadCoaches(refresh=false) {
      this.isLoading = true;
      try{
      await this.$store.dispatch('coaches/loadCoaches' ,{forceRefresh:refresh});
      } catch(error){
        this.error = error.message || 'somthing Went Wrong'
      }  
      this.isLoading = false;
    },
    handleError(){
      this.error=null;
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>