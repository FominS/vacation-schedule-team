<template>
  <div>
    <div class="period-container py-1">
      <div
        class="period-body caption text-center"
        v-for="(period, index) in periods"
        :key="index"
        :style="period.style"
        :title="period.fullTitle"
        v-on:click="selectMonth(period.start)"
      >
        {{ period.title }}
      </div>
    </div>
    <div v-if="showChild" class="period-child">
      <vacation-period
        v-for="item in employes"
        :key="item.data.id"
        v-model="item.data"
        :mode="mode"
        :year="year"
        :month="month"
        :showChild="item.isOpen"
        :employes="item.employes"
        @change-month="changeMonth"
        @year-mode="$emit('year-mode')"
      ></vacation-period>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Period, ScaleTypes, ScheduleModel, Schedule } from "../../types/types";
import moment from "moment";
import "moment/locale/ru";

interface PeriodStyle {
  width: string;
  left: string;
  borderBottomLeftRadius: string;
  borderTopLeftRadius: string;
  borderBottomRightRadius: string;
  borderTopRightRadius: string;
}

interface PeriodData {
  start: string;
  end: string;
  style: PeriodStyle;
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

@Component({
  name: "VacationPeriod",
})
export default class VacationPeriod extends Vue {
  @Prop({ default: null, required: true }) readonly value!: ScheduleModel;
  @Prop({ default: [] }) readonly employes!: Schedule[];
  @Prop({ required: true }) readonly year!: number;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;
  @Prop({ default: ScaleTypes[0], required: true }) readonly mode!: string;
  @Prop({ default: true }) readonly showChild!: boolean;

  /* data */

  /* computed */
  get startYear(): moment.Moment {
    return moment(new Date(this.year, 0, 1));
  }

  get startMonth(): moment.Moment {
    return moment(this.month);
  }
  get endMonth(): moment.Moment {
    return moment(this.month).endOf("month");
  }
  get startMonthIndex(): number {
    return moment(this.month).month();
  }

  get periods(): Array<PeriodData> {
    const radius = "5px";
    const result: Array<PeriodData> = [];
    this.value.periods.forEach((element: Period) => {
      const startDate: moment.Moment = moment(element.start);
      const endDate: moment.Moment = moment(element.end);
      let startView = startDate;
      let endView = endDate;
      let changeStart = false;
      let changeEnd = false;

      if (this.mode == ScaleTypes[1]) {
        if (
          this.startMonthIndex >= startDate.month() &&
          this.startMonthIndex <= endDate.month()
        ) {
          if (this.startMonthIndex > startDate.month()) {
            startView = this.startMonth;
            changeStart = true;
          }
          if (this.startMonthIndex < endDate.month()) {
            endView = this.endMonth;
            changeEnd = true;
          }
        } else {
          return;
        }
      }
      const duration = endDate.diff(startDate, "days") + 1;
      const durationView = endView.diff(startView, "days") + 1;

      result.push({
        start: element.start,
        end: element.end,
        style: {
          width:
            (this.mode == ScaleTypes[0]
              ? durationView * 3
              : durationView * 30) + "px",
          left:
            (this.mode == ScaleTypes[0]
              ? startView.diff(this.startYear, "days") * 3
              : startView.diff(this.startMonth, "days") * 30) + "px",
          borderBottomLeftRadius: changeStart ? null : radius,
          borderTopLeftRadius: changeStart ? null : radius,
          borderBottomRightRadius: changeEnd ? null : radius,
          borderTopRightRadius: changeEnd ? null : radius,
        },
        title: startDate.format("DD.MM") + " - " + endDate.format("DD.MM"),
        fullTitle: `${startDate.format("DD.MM.YYYY")} - ${endDate.format(
          "DD.MM.YYYY"
        )}\n${duration} ${declOfNum(duration, ["день", "дня", "дней"])}`
      } as PeriodData);
    });
    return result;
  }

  /* metods */
  public selectMonth(date: string): void {
    if (this.mode == ScaleTypes[0]) {
      this.$emit("change-month", new Date(date).getMonth());
    } else {
      this.$emit("year-mode");
    }
  }
  public changeMonth(index: number): void{
    this.$emit("change-month", index)
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
  border: 1px solid #2e73b2;
  background-color: #5190bd;
  color: white;
  width: 100%;
  height: 40px;
  position: absolute;
  line-height: 10px !important;
  overflow: hidden;
  cursor: pointer;
  padding-top: 8px;
}
.period-child {
  position: relative;
  /* top: 48px; */
}
</style>
