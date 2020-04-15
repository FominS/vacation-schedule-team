<template>
  <div class="go-unit-container pt-3 px-3">
    <v-row>
      <v-col>
        <Scale v-model="scaleType" 
        :month="month"
        @next-month="nextMonth"
        @previous-month="previousMonth"></Scale>
      </v-col>
      
    </v-row>
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
      
  
      <!-- <v-col cols="12" md="3" class="go-unit-tree px-3">
        <v-row>
          <v-col class="go-unit-head"></v-col>
        </v-row>
        <v-row class="go-unit-leader">
          <v-col class="go-unit-col">
            <v-list-item dense class="px-0">
              <v-list-item-icon>
                <v-icon color="orange darken-2" v-if="value[0].leader"
                  >mdi-account</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content class="py-0">
                <v-list-item-title
                  :title="
                    value[0].surname +
                      ' ' +
                      value[0].firstname +
                      ' ' +
                      value[0].middlename
                  "
                  >{{ value[0].surname }} {{ value[0].firstname }}
                  {{ value[0].middlename }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  value[0].position
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <div class="go-unit-team">
          <v-row v-for="(item, idx) in value" :key="item.id">
            <template v-if="idx > 0">
              <v-col class="go-unit-col">
                <v-list-item dense class="px-0">
                  <v-list-item-icon>
                    <v-icon color="orange darken-2" v-if="item.leader"
                      >mdi-account</v-icon
                    >
                    <v-btn v-if="item.employes.length > 0" small icon>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                  <v-list-item-content class="py-0">
                    <v-list-item-title
                      :title="
                        item.surname +
                          ' ' +
                          item.firstname +
                          ' ' +
                          item.middlename
                      "
                      >{{ item.surname }} {{ item.firstname }}
                      {{ item.middlename }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      item.position
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </template>
          </v-row>
        </div>
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
        <v-row v-for="item in value" :key="item.id">
          <v-col
            class="go-unit-col go-unit-months-col"
            v-for="month in months"
            :key="month"
          ></v-col>
        </v-row>
      </v-col> -->
    <!-- </v-row> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/ru";
import { Shedule, ScaleTypes } from "../types/types";
import Scale from './Scale'


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
    Scale
  }
})
export default class VacationSheduleTeam extends Vue {
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
.go-unit-container {
  width: 100%;
  background-color: lightgray;
  height: 100%;
}
.go-unit-container {
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
