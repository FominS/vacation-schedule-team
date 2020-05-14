<template>
  <div
    class="schedule-team ma-2"
    style="height: calc( 100% - 16px)"
    v-resize="resizeComponent"
  >
    <div
      class="schedule-team-container"
      v-on:scroll="handleScroll"
      ref="container"
      :style="{ height: containerHeight }"
    >
      <div class="schedule-team-row flex-nowrap" >
        <div class="schedule-team-corner" :style="{ top: scrollTop, left: scrollLeft }">
          <corner
            v-model="scaleType"
            :month="month"
            @next-month="nextMonth"
            @previous-month="previousMonth"
          ></corner>
          <employee-item
              v-model="leader.data"
              :employes="leader.employes"
              :level="0"
              :showChild="leader.isOpen"
              @toggle-child="leader.isOpen = !leader.isOpen"
            />
        </div>
        <div class="schedule-team-panel-top" :style="{ top: scrollTop }">
          <scale v-model="scaleType" :month="month" :year="year"></scale>
          <grid
            :scale="scaleType"
            :month="month"
            :employes="leader.employes"
            :showChild="leader.isOpen"
            :year="year"
          ></grid>
        </div>
      </div>
      <div class="schedule-team-row flex-nowrap">
        <div class="schedule-team-panel-left" :style="{ left: scrollLeft }">
          <div v-for="item in employees" :key="item.data.id">
            <employee-item
              v-model="item.data"
              :employes="item.employes"
              :level="0"
              :showChild="item.isOpen"
              @toggle-child="item.isOpen = !item.isOpen"
            />
          </div>
        </div>
        <div class="schedule-team-master" id="schedule-master" ref="master">
          <grid
            v-for="item in employees"
            :key="item.id"
            :scale="scaleType"
            :month="month"
            :employes="item.employes"
            :showChild="item.isOpen"
            :year="year"
          ></grid>
        </div>
      </div>

      <!-- test -->
      <!-- <v-row>
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
    </v-row> -->
      <!-- ---- -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/ru";
import { Schedule, ScaleTypes } from "../types/types";
import Scale from "./Scale.vue";
import Corner from "./Corner.vue";
import Grid from "./Grid.vue";
import EmployeeItem from "./EmployeeItem.vue";

/**
 *
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
    Corner,
    EmployeeItem,
    Grid,
  },
})
export default class VacationScheduleTeam extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Schedule[];
  @Prop({ required: true }) readonly year!: number;

  private scaleType: string = ScaleTypes[0];
  private scrollLeftNegative = "0px";
  private scrollTop = "0px";
  private scrollLeft = "0px";
  private scrollHeight = "0px";
  private scrollWidth = "0px";
  private containerHeight = "auto";
  scales: Array<string> = ["months", "days"];
  monthIndex = 0;

  /* computed */
  get month(): Date {
    return new Date(2020, this.monthIndex);
  }
  get leader(): Schedule {
    return this.value[0];
  }
  get employees(): Array<Schedule> {
    return this.value.slice(1, this.value.length);
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

  public handleScroll(event: UIEvent): void {
    if (event && event.target) {
      this.scrollLeft = (event.target as HTMLElement).scrollLeft + "px";
      this.scrollLeftNegative =
        -(event.target as HTMLElement).scrollLeft + "px";
      this.scrollTop = (event.target as HTMLElement).scrollTop + "px";
    }
    event;
  }

  public resizeComponent(): void {
    const master: HTMLElement = this.$refs.master as HTMLElement;
    const component: HTMLElement = this.$el as HTMLElement;
    if (master && component) {
      if (master.offsetHeight + 60 > component.offsetHeight) {
        this.containerHeight = component.offsetHeight + "px";
      } else {
        this.containerHeight = "auto";
      }
    }
  }
}
</script>
<style>
html,
body,
.v-application,
.v-content {
  height: 100%;
}
</style>

<style scoped>
.schedule-team,
.schedule-team-master,
.schedule-team-corner,
.schedule-team-panel-top,
.schedule-team-panel-left {
  position: relative;
}
.schedule-team-container {
  width: 100%;
  background-color: lightgray;
  overflow-x: auto;
  overflow-y: auto;
}
.schedule-team-master {
  width: 100%;
}

.schedule-team-corner {
  top: 0px;
  z-index: 4;
}
.schedule-team-panel-top {
  z-index: 3;
}
.schedule-team-panel-left {
  width: 300px;
  min-width: 300px;
  z-index: 3;
}

.schedule-team-row {
  display: flex;
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
