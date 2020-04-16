<template>
  <div class="schedule-team-container pt-3 px-3">
    <div class="schedule-team-row pl-2">
        <Scale v-model="scaleType"
        :month="month"
        @next-month="nextMonth"
        @previous-month="previousMonth"
        class=""></Scale>     
    </div>
    <div class="schedule-team-row schedule-team-body ml-2">
      
      <div class="schedule-team-tree">
        <div v-for="item in value" :key="item.id">
          <employee-item 
            :firstname="item.firstname"
            :surname="item.surname"
            :middlename="item.middlename"
            :position="item.position"
            :employes="item.employes"
            :leader="item.leader"
            :level=0
          />
        </div>
      </div>
    </div>
    <!-- test -->
    <v-row>
      <v-col>
        <v-text-field placeholder="номер месяца" type="number" v-model="monthIndex"></v-text-field>
      </v-col>
      <v-col>
        <v-select :items="scales" v-model="scaleType"></v-select>
      </v-col>
      <v-col>
        <v-btn>ок</v-btn>
      </v-col>      
    </v-row>
    <!-- ---- -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/ru";
import { Schedule, ScaleTypes } from "../types/types";
import Scale from './Scale'
import EmployeeItem from './EmployeeItem'


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
    EmployeeItem
  }
})
export default class VacationScheduleTeam extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Array<Shedule>;

  private scaleType: string = ScaleTypes[0];
  scales: Array<string> = ['months', 'days'];
  monthIndex = 0
  
  /* computed */
  get month(): Date {
    return new Date(2020, this.monthIndex)
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
  min-width: 1304px;
}

.schedule-team-tree{
  width: 350px;  
}
.schedule-team-body{
  width: 100%;
  height: 300px;
  overflow-y: auto;
  background-color: white;
  border-top: 1px solid lightgray;
}

.schedule-team-row{
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
