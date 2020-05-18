<template>
  <div class="period-container py-1">
    <div
      class="period-body caption text-center"
      v-for="(period, index) in periods"
      :key="index"
      :style="{ width: period.width, left: period.offset }"
      :title="period.fullTitle"
      v-on:click="selectMonth(period.start)"
      v-show="period.visible"
    >{{ period.title }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Period, ScaleTypes } from "../types/types";
import moment from "moment";
import "moment/locale/ru";

interface PeriodData {
  start: string;
  end: string;
  duration: number;
  offset: string;
  width: string;
  title: string;
  fullTitle: string;
  visible: boolean;
}

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

@Component
export default class VacationPeriod extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Array<Period>;
  @Prop({ required: true }) readonly year!: number;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;
  @Prop({ default: ScaleTypes[0], required: true }) readonly mode!: string;

  /* data */

  /* computed */
  get startYear(): moment.Moment {
    return moment(new Date(this.year, 0, 1));
  }

  get startMonth(): moment.Moment {
    return moment(this.month);
  }

  get periods(): Array<PeriodData> {
    const result: Array<PeriodData> = [];
    this.value.forEach((element: Period) => {
      const startDate:  moment.Moment = moment(element.start);
      const endDate: moment.Moment = moment(element.end);
      const duration = endDate.diff(startDate, "days") + 1;
      result.push({
        start: element.start,
        end: element.end,
        duration: duration,
        width:
          (this.mode == ScaleTypes[0] ? duration * 3 : duration * 30) + "px",
        offset: (this.mode == ScaleTypes[0]
          ? startDate.diff(this.startYear, "days") * 3
          : startDate.diff(this.startMonth, "days") * 30) + "px",
        title: startDate.format("DD.MM") + " - " + endDate.format("DD.MM"),
        fullTitle: `${startDate.format("DD.MM.YYYY")} - ${endDate.format("DD.MM.YYYY")}\n${duration} ${declOfNum(duration, ["день", "дня", "дней"])}`,
        visible: this.mode == ScaleTypes[0] ? true: startDate.month() == this.month.getMonth() ? true : false
      } as PeriodData);
    });
    return result;
  }

  /* metods */
  public selectMonth(date: string): void {
    this.$emit("change-month", new Date(date).getMonth());
  }
}
</script>
<style scoped>
.period-container {
  height: 48px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
}
.period-body {
  border-radius: 4px;
  border: 1px solid #2e73b2;
  background-color: #5190bd;
  color: white;
  width: 100%;
  height: 40px;
  position: absolute;
  line-height: 8px !important;
  overflow: hidden;
  cursor: pointer;
  padding-top: 8px;
}
</style>
