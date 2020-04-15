<template>
  <div class="go-unit-container" ref="gantt"></div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import { Shedule } from "../types/types";
import { gantt } from "dhtmlx-gantt";

// class GanttElement {
//   private id: string
//   private text: string

// }

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
export default class UnitVacationShedule extends Vue {
  @Prop({ default: [], required: true }) readonly value!: Array<Shedule>;
  private tasks: unknown = {
    data: [
      {
        id: 1,
        text: "Фокин Александр Николаевич",
        position: "Начальник отдела ОРПР ",
        start_date: "2020-01-17",
        // duration: 5,
        end_date: '2020-01-21',
        head: true,
        open: true,
      },
      {
        id: 2,
        text: "Фомин Сергей Николаевич",
        start_date: "2020-01-20",
        duration: 21,
        parent: 3
      },
      {
        id: 3,
        text: "Рогов Дмитрий Игоревич",
        start_date: "2020-01-25",
        duration: 3,
        parent: 1
      },
      {
        id: 4,
        text: "Овсянкин Геннадий Николаевич",
        position: "Зам начальника отдела ОРПР",
        start_date: "2020-01-23",
        duration: 3,
        parent: 1
      },
      {
        id: 5,
        text: "Чернышев Антон Сергеевич",
        start_date: "2020-01-24",
        duration: 3,
        parent: 1
      },
      {
        id: 6,
        text: "Сергеев Андрей Анатольевич",
        start_date: "2020-01-25",
        duration: 3,
        parent: 3
      }
    ],
    links: []
  };
  created() {
    if(this.value){
      this.value.forEach((element: Shedule) => {
        // let ganttObject: object = {}
        
      })
    }
  }
  mounted() {

    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.row_height = 50;
    gantt.config.drag_move = false;
    gantt.config.readonly = true;
    gantt.config.start_date = new Date("2020-01-01");
    gantt.config.end_date = new Date("2020-12-31");
    gantt.config.scale_height = 50;
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%j, %D" }
    ];
    gantt.config.columns = [
      {
        name: "text",
        label: "Работник",
        tree: true,
        width: "*",
        template: (task: any) => {
          if (task.position)
            return `<div class='go-unit-employee pt-2' style='line-height:1.5' title='${task.text}&#10;${task.position}'><div class='font-weight-bold'>${task.text}</div>
              <div class='grey--text text--darken-1 text-truncate '>${task.position}</div>`;
          return `<div class='go-unit-employee' title='${task.text}'><div class='font-weight-bold' >${task.text}</div>`;
        }
      }
    ];
    gantt.templates.task_text = (start, end, item) => {
      const period: string =
        moment(start).format("DD.MM") + " - " + moment(end).subtract(1,'day').format("DD.MM");
      const title: string =
        period +
        "&#10;" +
        item.duration +
        " " +
        declOfNum(item.duration as number, ["день", "дня", "дней"]);
      return `<div class="task-task" title='${title}'>${period}</div>`;
    };
    gantt.templates.grid_file = () => "<div class='pl-3'></div>";
    gantt.templates.grid_folder = (item: any) => {
      if (item.head)
        return "<div class='gantt_tree_icon text-center title pt-2'><i class='mdi mdi-account orange--text text--darken-2'></i></div>";
      return "<div class='pl-3'></div>";
    };

    gantt.i18n.setLocale("ru");
    gantt.init(this.$refs.gantt as HTMLElement);
    gantt.parse(this.tasks);
    
    

    console.log(gantt.calculateDuration({start_date: new Date('2013-02-15'), end_date: new Date('2013-02-25')}))
  }
}
</script>
<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
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
.go-unit-head {
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
}
.go-unit-months-col {
  min-width: 80px;
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
