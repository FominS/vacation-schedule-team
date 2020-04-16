<template>
  <div>
    <div v-if="value == scaleType[0]" align="center" class="schedule-team-row flex-nowrap">
      <div class="schedule-team-scale schedule-team-scale-tree"></div>
      <div
        class="schedule-team-scale schedule-team-scale-month text-md-center white--text pa-3"
        v-for="month in months"
        :key="month"
      >
        {{ month }}
      </div>
    </div>
    <div v-else class="schedule-team-row flex-nowrap" align="center">
      <div class="schedule-team-scale schedule-team-scale-tree pa-1">
        <v-btn icon dark :disabled="monthIndex < 1" @click="decrease"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <span class="white--text text-center">{{ monthName }}</span>
        <v-btn icon dark :disabled="monthIndex > 10" @click="increase"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
      <div
        class="schedule-team-scale schedule-team-scale-day text-md-center white--text py-3"
        v-for="n in countDays"
        :key="n"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/ru";
import { ScaleTypes } from "../types/types";

const Months: Array<string> = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь"
];

@Component
export default class Scale extends Vue {
  @Prop({ default: ScaleTypes[0], required: true }) readonly value!: ScaleTypes;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;
  private scaleType: unknown = ScaleTypes;
  private months: Array<string> = Months;

  /* computed */
  get countDays(): number {
    return moment(this.month).daysInMonth();
  }
  get monthName(): string {
    return moment(this.month).format("MMMM");
  }
  get monthIndex(): number {
    return this.month.getMonth();
  }

  /* methods */
  public increase(): void {
    this.$emit("next-month");
  }
  public decrease(): void {
    this.$emit("previous-month");
  }
}
</script>

<style scoped>
.schedule-team-scale {
  background-color: #0088b2;
  height: 45px;
  border-left: 1px solid lightgray;
}
.schedule-team-scale-month {
  width: 85px;
}
.schedule-team-scale-day {
  width: 30px;
}
.schedule-team-scale-tree {
  width: 350px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.schedule-team-row{
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
</style>
