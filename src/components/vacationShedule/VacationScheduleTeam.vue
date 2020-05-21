<template>
  <div
    class="schedule-team ma-2"
    style="height: calc( 100% - 20px);"
    v-resize="resizeComponent"
    v-on:wheel="handleWheel"
  >
    <div
      class="schedule-team-row flex-nowrap my-2">
      <v-btn color="primary" class="mr-2" rounded small @click="yearMode">На год</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" rounded outlined small v-on="on">На месяц</v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="month in months"
            :key="month.index"
            @click="changeMonth(month.index)">
            <v-list-item-title>{{ month.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>    
    <div
      class="schedule-team-container"
      ref="container"
      :style="{ height: containerHeight, width: containerWidth }"
    >
      <div class="schedule-team-row flex-nowrap schedule-team-top"
        :style="{ }">
        <div
          class="schedule-team-corner"
        >
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
        <div class="schedule-team-panel-top" :style="{ left: scrollLeft }">
          <scale
            v-model="scaleType"
            :month="month"
            :year="year"
            @change-month="changeMonth"
          ></scale>
          <grid
            :scale="scaleType"
            :month="month"
            :employes="leader.employes"
            :showChild="leader.isOpen"
            :year="year"
          ></grid>
          <div class="schedule-team-vacations-leader">
            <vacation-period  
              v-model="leader.data"
              :mode="scaleType"
              :year="year"
              :month="month"
              :showChild="leader.isOpen"
              :employes="leader.employes"
              @change-month="changeMonth"
              @year-mode="yearMode"
            ></vacation-period>
          </div>
        </div>
      </div>
      <div class="schedule-team-row flex-nowrap schedule-team-grid" :style="{ top: scrollTop }">
        <div class="schedule-team-panel-left">
          <div v-for="item in employes" :key="item.data.id">
            <employee-item
              v-model="item.data"
              :employes="item.employes"
              :level="0"
              :showChild="item.isOpen"
              @toggle-child="item.isOpen = !item.isOpen"
            />
          </div>
        </div>
        <div class="schedule-team-master" ref="master" :style="{ left: scrollLeft }">
          <grid
            v-for="item in employes"
            :key="item.data.id"
            :scale="scaleType"
            :month="month"
            :employes="item.employes"
            :showChild="item.isOpen"
            :year="year"
          ></grid>
          <div class="schedule-team-vacations">
            <vacation-period 
              v-for="item in employes" 
              :key="item.data.id"
              v-model="item.data"
              :mode="scaleType"
              :year="year"
              :month="month"
              :showChild="item.isOpen"
              :employes="item.employes"
              @change-month="changeMonth"
              @year-mode="yearMode"
            ></vacation-period>
          </div>
        </div>        
      </div>
    </div>
    <div class="schedule-team-horizontal-scroll"  ref="horizontalScroll"
      :style="{ left: containerWidth != 'auto' ? containerWidth : scrollWidth }"
      v-on:scroll="handleHorizontalScroll"
      >
      <div class="horizontal-scroll" :style="{ height: scrollHeight }"></div>
    </div>
    <div class="schedule-team-vertical-scroll" ref="verticalScroll"
      v-on:scroll="handleVerticalScroll"
      >
      <div class="vertical-scroll" :style="{ width: scrollWidth }"></div>
    </div>    
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Schedule, ScaleTypes, Month } from "../../types/types";
import Scale from "./Scale.vue";
import Corner from "./Corner.vue";
import Grid from "./Grid.vue";
import EmployeeItem from "./EmployeeItem.vue";
import VacationPeriod from "./VacationPeriod.vue";

@Component({
  components: {
    Scale,
    Corner,
    EmployeeItem,
    Grid,
    VacationPeriod
  },
})
export default class VacationScheduleTeam extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Schedule[];
  @Prop({ required: true }) readonly year!: number;

  private scaleType: string = ScaleTypes[0];
  private scrollTop = "0px";
  private scrollLeft = "250px";
  private containerHeight = "auto";
  private containerWidth = "auto";
  private months: Array<Month> = [];
  scrollHeight = '0px';
  scrollWidth = '0px';
  scales: Array<string> = ["months", "days"];
  monthIndex = 0;

  created() {
    for (let i = 0; i < 12; i++) {
      this.months.push(new Month(this.year, i));
    }
  }

  mounted() {
    this.changeMasterWidth();
  }

  /* computed */
  get month(): Date {
    return new Date(this.year, this.monthIndex);
  }
  get leader(): Schedule {
    return this.value[0];
  }
  get employes(): Array<Schedule> {
    return this.value.slice(1, this.value.length);
  }

  /* methods */
  public nextMonth(): void {
    this.monthIndex++;
    this.recountContainerSize();
  }
  public previousMonth(): void {
    this.monthIndex--;
    this.recountContainerSize();
  }

  public changeMonth(index: number): void {
    this.monthIndex = index;
    this.scaleType = ScaleTypes[1];
    this.recountContainerSize();   
  }

  public yearMode(): void {
    this.scaleType = ScaleTypes[0];
    this.recountContainerSize();
  }

  public handleHorizontalScroll(event: UIEvent): void {
    if (event && event.target) {
       this.scrollTop = -((event.target as HTMLElement).scrollTop ) + "px";
    }
  }

  public handleVerticalScroll(event: UIEvent): void {
    if (event && event.target) {
       this.scrollLeft = -((event.target as HTMLElement).scrollLeft - 250 ) + "px";
    }
  }

  public handleWheel(event: WheelEvent): void{
    (this.$refs.horizontalScroll as HTMLElement).scrollTop += event.deltaY;
  }

  /**
   * Пересчет габаритов контейнера при изменении компонента 
   */
  public resizeComponent(): void {
    const master: HTMLElement = this.$refs.master as HTMLElement;
    const component: HTMLElement = this.$el as HTMLElement;
    const offsetHeightFromTop = 140;
    const offsetWidthFromLeft = 250;
    const offsetBtnPanel = 52;
    const offsetScroll = 15;
    if (master && component) {
      if (master.offsetHeight + offsetHeightFromTop > component.offsetHeight) {
        this.containerHeight = component.offsetHeight - offsetBtnPanel + "px";
      } else {
        this.containerHeight = "auto";
      }
      if (master.offsetWidth + offsetWidthFromLeft > component.offsetWidth) {
        this.containerWidth = component.offsetWidth - offsetScroll + "px";
      } else {
        this.containerWidth = "auto";
      }
    }
  }

  /**
   * Пересчет длинны мастера
   */
  public changeMasterWidth(): void {
    const master: HTMLElement = this.$refs.master as HTMLElement;
    this.scrollHeight = master.offsetHeight + 100 + 'px';
    this.scrollWidth = master.offsetWidth + 250 + 'px';
  }

  /**
   * Пересчет размеров контейнера для правильного позиционирования скроллов 
   */
  public recountContainerSize(): void {
    setTimeout(() => {
      this.changeMasterWidth();
      this.resizeComponent();
    })
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
.schedule-team-grid,
.schedule-team-corner,
.schedule-team-panel-left {
  position: relative;
}

.schedule-team-panel-top,
.schedule-team-master{
  position: absolute;
}
.schedule-team-top{
  position: relative;
}
.schedule-team-container {
  width: calc( 100% - 16px );
  background-color: lightgray;
  overflow-x: hidden;
  overflow-y: hidden;
}
.schedule-team-master {
}
.schedule-team-vacations {
  position: absolute;
  top: 0px;
  left: 0px;
}
.schedule-team-vacations-leader {
  position: absolute;
  top: 45px;
  left: 0px;
}

.schedule-team-corner {
  top: 0px;
  z-index: 4;
  width: 250px;
  min-width: 250px;
}
.schedule-team-panel-top {
  z-index: 3;
}
.schedule-team-panel-left {
  width: 250px;
  min-width: 250px;
  z-index: 3;
}

.schedule-team-row {
  display: flex;
  flex: 1 1 auto;
}

.schedule-team-horizontal-scroll {
  position: absolute;
  top: 36px;
  right: 0px;
  height: calc( 100% - 36px );
  width: 15px;
  z-index: 10;
  overflow-y: auto;
}
.schedule-team-vertical-scroll {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 15px;
  width: 100%;
  z-index: 10;
  overflow-x: auto;
}
.schedule-team-vertical-scroll > div{
  height: 1px;
}
.schedule-team-horizontal-scroll > div{
  width: 1px;
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
