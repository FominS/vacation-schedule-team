import { Shedule, Period } from "./types";
import { v1 as uuid } from "uuid";

const shedule = [];
for (let i = 0; i < 7; i++) {
  const period = new Period("2020-02-0" + (i + 1), "2020-02-2" + (i + 1));
  const element = new Shedule(
    uuid(),
    "Иван " + i,
    "Иванов",
    "Иванович",
    [period],
    i == 0 ? "Самый лучший начальник" : "эксперт высшей категории #" + i,
    i > 0 ? [new Shedule(uuid(), 'SDSD', 'DFDF', 'DFDF', [period], 'dfdfdf', [], false)] : [],
    i == 0 ? true : false
  );
  shedule.push(element);
}

export default {
  shedule: shedule,
};
