<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <VacationScheduleTeam v-model="schedule" :year="year"/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import VacationScheduleTeam from './components/vacationShedule/VacationScheduleTeam.vue';
import fake from "./types/fake";
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    VacationScheduleTeam,
  },

  data: () => ({
    schedule: fake.schedule,
    year: fake.currentYear
  }),
});
</script>
<style>
.v-application{
    background: lightgray !important;
}

</style>