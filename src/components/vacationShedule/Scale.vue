<template>
  <div>
    <div
      v-if="value == scaleType[0]"
      align="center"
      class="schedule-team-row flex-nowrap"
    >
      <div
        class="scale scale-month text-md-center white--text pa-3 subtitle-2"
        :style="{ minWidth: month.width }"
        v-for="month in months"
        :key="month.index"
        v-on:click="selectMonth(month.index)"
      >
        {{ month.name }}
      </div>
    </div>
    <div v-else class="schedule-team-row flex-nowrap" align="center">
      <div
        class="scale scale-day text-md-center white--text py-3 subtitle-2"
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
import { ScaleTypes, Month } from "../../types/types";

@Component
export default class Scale extends Vue {
  @Prop({ default: ScaleTypes[0], required: true }) readonly value!: string;
  @Prop({ required: true }) readonly year!: number;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;

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
    return this.months[this.month.getMonth()].days;
  }

  /* metods */
  public selectMonth(index: number): void {
    this.$emit("change-month", index);
  }
}
</script>

<style scoped>
.scale {
  background-color: #0088b2;
  height: 45px;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.scale-month {
  cursor: pointer;
}
.scale-month:hover {
  background-color: #00ACC1;
}
.scale-day {
  width: 30px;
  min-width: 30px;
}

.schedule-team-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
</style>
