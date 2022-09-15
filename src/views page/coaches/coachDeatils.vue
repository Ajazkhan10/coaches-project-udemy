<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }} Hi</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested ? Reach out now!</h2>
          <base-button link :to="conatctlink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{description}}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
// import baseCard from "../../ui/baseCard.vue";
// import baseButton from "../../ui/baseButton.vue";
// import baseBadge from "../../ui/baseBadge.vue";-
export default {
  name: "coachDetails",
  //  props: ["id", "firstname", "lastname", "rate", "areas","description"],

  props: ["id"],
  // components: { baseButton, baseBadge, baseCard },
  data() {
    return {
      selectedCoach: null
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    conatctlink() {
      // return this.$route.path + '/' +this.id + '/contact';
      return "/coaches/" + this.id + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },

    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    }
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(coach => coach.id === this.id);
    // console.log(this.$store.getters["coaches/coaches"].find(coach => coach.id === this.id))
  }
};
</script>