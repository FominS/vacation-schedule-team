import { Period, ScheduleModel, Schedule } from "./types";
import { v1 as uuid } from "uuid";

const year = 2020;

const schedule: Schedule[] = [
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Фокин",
      firstname: "Александр",
      middlename: "Николаевич",
      periods: [new Period("2020-02-02", "2020-02-22")],
      position: "Начальник отдела ОРПР РЦР Рязань",
      leader: true
    },
    employes: []
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Чернышев",
      firstname: "Антон",
      middlename: "Сергеевич",
      periods: [new Period("2020-04-02", "2020-04-10"), new Period("2020-05-28", "2020-06-12"), new Period("2020-08-12", "2020-08-28")],
      position: "Зам начальника отдела ОРПР РЦР Рязань",
      leader: false
    } as ScheduleModel,
    employes: []
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Овсянкин",
      firstname: "Геннадий",
      middlename: "Николаевич",
      periods: [new Period("2020-05-12", "2020-05-15")],
      position: "Зам начальника отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: []
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Рогов",
      firstname: "Дмитрий",
      middlename: "Игоревич",
      periods: [new Period("2020-06-01", "2020-06-15"), new Period("2020-09-10", "2020-09-25")],
      position: "Главный эксперт отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: [
      {
        isOpen: true, 
        data: {
          id: uuid(),
          surname: "Фомин",
          firstname: "Сергей",
          middlename: "Николаевич",
          periods: [new Period("2020-02-02", "2020-02-22")],
          position: "Ведущий эксперт отдела ОРПР РЦР Рязань",
          leader: false
        },
        employes: [
          {
            isOpen: true, 
            data: {
              id: uuid(),
              surname: "Мандельштамп",
              firstname: "Осип",
              middlename: "Эмильевич",
              periods: [new Period("2020-02-02", "2020-02-22")],
              position: "Русские поэт",
              leader: false
            },
            employes: []
          }
        ]
      }
    ]
  },
];



//       new Schedule(
//         uuid(),
//         "Терехов",
//         "Константин",
//         "",
//         [new Period("2020-04-02", "2020-04-22")],
//         "Ведущий эксперт отдела ОРПР РЦР Рязань",
//         [],
//         false
//       ),
//       new Schedule(
//         uuid(),
//         "Сергеев",
//         "Андрей",
//         "Анатольевич",
//         [new Period("2020-04-02", "2020-04-22")],
//         "Рядовой эксперт  пап ап ап апотдела ОРПР РЦР Рязань",
//         [],
//         false
//       ),
//     ],
//     false
//   ),
// ];


export default {
  schedule: schedule,
  currentYear: year
};
