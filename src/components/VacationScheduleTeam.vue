<template>
  <div class="schedule-team-container pt-3 px-3">
    <!-- test -->
    <v-row>
      <v-col>
        <v-text-field
          placeholder="номер месяца"
          type="number"
          v-model="monthIndex"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select :items="scales" v-model="scaleType"></v-select>
      </v-col>
    </v-row>
    <!-- ---- -->

    <!-- <div class="ml-2">
             
    </div> -->
    <div class="schedule-team-row flex-nowrap schedule-team-body ml-2">
      <div class="schedule-team-tree">
        <tree-scale
          v-model="scaleType"
          :month="month"
          @next-month="nextMonth"
          @previous-month="previousMonth"
        ></tree-scale>

        <div v-for="item in value" :key="item.data.id">
          <employee-item
            v-model="item.data"
            :employes="item.employes"
            :level="0"
            :showChild="item.isOpen"
            @toggle-child="item.isOpen = !item.isOpen"
          />
        </div>
      </div>
      <div class="schedule-team-grid">
        <Scale v-model="scaleType" :month="month" :year="year"></Scale>
        <grid
          v-for="item in value"
          :key="item.id"
          :scale="scaleType"
          :month="month"
          :employes="item.employes"
          :showChild="item.isOpen"
          :year="year"
        ></grid>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/ru";
import { Schedule, ScaleTypes } from "../types/types";
import Scale from "./Scale.vue";
import TreeScale from "./TreeScale.vue";
import Grid from "./Grid.vue";
import EmployeeItem from "./EmployeeItem.vue";

/**
 * Функция склонения числительных
 * @param {number} num Число к которому необходимо сделать склонение
 * @param {Array} titles Массив вариантов склонения
 * @returns {String} Результат склонения
 */
const declOfNum = (num: number, titles: Array<string>) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

@Component({
  components: {
    Scale,
    TreeScale,
    EmployeeItem,
    Grid,
  },
})
export default class VacationScheduleTeam extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Schedule[];
  @Prop({ required: true }) readonly year!: number;

  private scaleType: string = ScaleTypes[0];
  scales: Array<string> = ["months", "days"];
  monthIndex = 0;

  /* computed */
  get month(): Date {
    return new Date(2020, this.monthIndex);
  }

  /* methods */
  public moment(): moment.Moment {
    return moment();
  }
  public nextMonth(): void {
    this.monthIndex++;
  }
  public previousMonth(): void {
    this.monthIndex--;
  }
}
</script>
<style scoped>
.schedule-team-container {
  width: 100%;
  background-color: lightgray;
  height: 100%;
  /* min-width: 1420px; */
}

.schedule-team-tree {
  width: 300px;
}
.schedule-team-grid {
  width: 100%;
  overflow-x: auto;
}
.schedule-team-body {
  /* width: 100%; */
  /* height: 300px; */
  overflow-y: auto;
  border-top: 1px solid lightgray;
}

.schedule-team-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
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
