import moment from "moment";
import "moment/locale/ru";

export enum ScaleTypes {
  "months" = 0,
  "days" = 1,
}

export class Month{
    index: number;
    name: string;
    width: string;
    days: number;

    constructor(year: number, monthIndex: number){
        const date = new Date(year, monthIndex, 1);
        this.index = monthIndex;
        this.name = moment(date).format("MMMM");
        this.days = moment(date).daysInMonth();
        this.width = this.days * 3 + 'px';
    }
}

export class Period {
  start: string;
  end: string;

  constructor(start: string, end: string) {
    this.start = start;
    this.end = end;
  }
}

export interface ScheduleModel {
  id: string;
  firstname: string;
  surname: string;
  middlename: string;
  periods: Array<Period>;
  position: string;
  leader: boolean;
}

export interface Schedule {
  isOpen: boolean;
  data: ScheduleModel;
  employes: Schedule[];
}

