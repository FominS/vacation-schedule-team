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
      periods: [new Period("2020-03-02", "2020-03-18"), new Period("2020-06-01", "2020-06-20"), new Period("2020-08-25", "2020-09-18")],
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
      periods: [new Period("2020-05-23", "2020-07-12"), new Period("2020-09-10", "2020-09-25")],
      position: "Главный эксперт отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: [
      {
        isOpen: true, 
        data: {
          id: uuid(),
          surname: "Терехов",
          firstname: "Константин",
          middlename: "",
          periods: [new Period("2020-04-15", "2020-05-22")],
          position: "Ведущий эксперт отдела ОРПР РЦР Рязань",
          leader: false
        },
        employes: []
      },
      {
        isOpen: true, 
        data: {
          id: uuid(),
          surname: "Сергеев",
          firstname: "Андрей",
          middlename: "Анатольевич",
          periods: [new Period("2020-04-07", "2020-04-17"), new Period("2020-06-02", "2020-06-25")],
          position: "Ведущий эксперт отдела ОРПР РЦР Рязань",
          leader: false
        },
        employes: []
      },
      {
        isOpen: true, 
        data: {
          id: uuid(),
          surname: "Фомин",
          firstname: "Сергей",
          middlename: "Николаевич",
          periods: [new Period("2020-04-17", "2020-04-30")],
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
              periods: [new Period("2020-03-05", "2020-03-22")],
              position: "Русские поэт",
              leader: false
            },
            employes: [
              {
                isOpen: true, 
                data: {
                  id: uuid(),
                  surname: "Сталин",
                  firstname: "Иосиф",
                  middlename: "Виссарионович",
                  periods: [new Period("2020-05-05", "2020-06-22")],
                  position: "Вождь",
                  leader: false
                },
                employes: [
                  {
                    isOpen: true, 
                    data: {
                      id: uuid(),
                      surname: "Красная-речка",
                      firstname: "Чингачгук",
                      middlename: "Эммануилович",
                      periods: [new Period("2020-06-05", "2020-07-20"), new Period("2020-08-01", "2020-08-19")],
                      position: "Вождь краснокожих",
                      leader: false
                    },
                    employes: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Яранцев",
      firstname: "Роман",
      middlename: "",
      periods: [new Period("2020-01-12", "2020-01-28")],
      position: "Главный эксперт отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: []
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Алимцев",
      firstname: "Максим",
      middlename: "",
      periods: [new Period("2020-12-12", "2020-12-30")],
      position: "Главный эксперт отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: []
  },
  {
    isOpen: true, 
    data: {
      id: uuid(),
      surname: "Габдулин",
      firstname: "Денис",
      middlename: "",
      periods: [new Period("2020-04-17", "2020-04-30")],
      position: "Ведущий эксперт отдела ОРПР РЦР Рязань",
      leader: false
    },
    employes: []
  },
];

export default {
  schedule: schedule,
  currentYear: year
};
