<template>
  <div class="go-unit-container">
    <v-row class="mx-3">
      <v-col cols="12" md="3" class="go-unit-tree px-3">
        <v-row>
          <v-col class="go-unit-head"></v-col>
        </v-row>
        <v-row v-for="(item, idx) in value" :key="item.id">
            <template v-if="idx == 0">
                <v-col class="go-unit-col">
                    <v-list-item dense class="px-0">
                    <v-list-item-icon>
                        <v-icon color="orange darken-2" v-if="item.head">mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="py-0">
                        <v-list-item-title
                        :title="
                            item.surname + ' ' + item.firstname + ' ' + item.middlename
                        "
                        >{{ item.surname }} {{ item.firstname }}
                        {{ item.middlename }}</v-list-item-title
                        >
                        <v-list-item-subtitle>{{ item.position }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-col>
            </template>
            <template v-else>
                <v-col class="go-unit-col">
                    <v-list-item dense class="px-0">
                    <v-list-item-icon>
                        <v-icon color="orange darken-2" v-if="item.head"
                        >mdi-account</v-icon
                        >
                        <v-btn v-if="item.employes.length > 0" small icon>
                        <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                    <v-list-item-content class="py-0">
                        <v-list-item-title
                        :title="
                            item.surname + ' ' + item.firstname + ' ' + item.middlename
                        "
                        >{{ item.surname }} {{ item.firstname }}
                        {{ item.middlename }}</v-list-item-title
                        >
                        <v-list-item-subtitle>{{ item.position }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-col>
            </template>
          
        </v-row>
      </v-col>
      <v-col cols="12" md="9" class="go-unit-chart-months">
        <v-row>
          <v-col
            class="go-unit-head go-unit-months-col text-md-center white--text"
            v-for="month in months"
            :key="month"
            >{{ month }}</v-col
          >
        </v-row>
        <v-row v-for="item in value" :key="item.id">
          <v-col
            class="go-unit-col go-unit-months-col"
            v-for="month in months"
            :key="month"
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Shedule } from "../types/types";

// import GSTC from 'vue-gantt-schedule-timeline-calendar';

const Months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

@Component
export default class UnitVacationShedule extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Array<Shedule>;
  private months: Array<string> = Months;
}
</script>
<style scoped>
.go-unit-container {
  width: 100%;
  background-color: lightgray;
  height: 100%;
}
.go-unit-container{
    min-width: 1304px;
}
.go-unit-container > .row {
  min-width: 1280px;
}
.go-unit-head {
  background-color: #0088b2;
  height: 50px;
}
.go-unit-col {
  border-bottom: 1px dashed lightgray;
  border-left: 1px solid lightgray;
  background-color: white;
  height: 65px;
}
.go-unit-head {
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
}
.go-unit-months-col {
  min-width: 80px;
}

.v-input--selection-controls {
  margin-top: 0px;
}
.v-input--checkbox .v-messages {
  display: none !important;
}
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 12px;
}

</style>
