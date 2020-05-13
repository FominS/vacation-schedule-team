<template>
  <div>
    <div v-if="scale == scaleType[0]" class="schedule-grid-row">
      <div
        class="schedule-team-grid-col cell-month"
        :style="{minWidth: month.width}"
        v-for="month in months"
        :key="month.index"
      ></div>
    </div>
    <div v-else class="schedule-grid-row">
      <div
        class="schedule-team-grid-col cell-day"
        v-for="n in countDays"
        :key="n"
      ></div>
    </div>
    <div v-if="showChild">
        <grid
        v-for="item in employes"
        :key="item.id"
        :scale="scale"
        :month="month"
        :employes="item.employes"
        :showChild="item.isOpen"
        :year="year"
        ></grid>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Schedule,  ScaleTypes, Month } from "../types/types";
import moment from "moment";
import "moment/locale/ru";

@Component({
  name: "Grid",
})
export default class Grid extends Vue {
  @Prop({ default: [] }) readonly employes!: Schedule[];
  @Prop({ default: ScaleTypes[0], required: true }) readonly scale!: ScaleTypes;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;
  @Prop({ required: true }) readonly year!: number;
  @Prop({ default: true }) readonly showChild!: boolean;

  /* data */
  private scaleType: unknown = ScaleTypes;
  private months: Array<Month> = [];

  created() {
    for (let i = 0; i < 12; i++) {
      this.months.push(new Month(this.year, i));    
    }
  }

  /* computed */
  get countDays(): number {
    return moment(this.month).daysInMonth();
  }
}
</script>
<style scoped>
.schedule-team-grid-col {
  height: 48px;
  border-bottom: 1px dashed lightgray;
  border-left: 1px solid lightgray;
  background-color: white;
}
.schedule-team-grid-col.cell-month {
  width: 85px;
}
.schedule-team-grid-col.cell-day {
  width: 30px;
}

.schedule-grid-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
</style>
