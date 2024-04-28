import {
  COMPLETED,
  CONFIRMED,
  NEW_CASE,
  REJECTED,
  READY_FOR_COMPLETION,
  WORK_IN_PROGRESS,
} from "../components/Chip";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const states = [
  {
    id: 0,
    stage: NEW_CASE,
    name: "New case",
  },
  {
    id: 1,
    stage: CONFIRMED,
    name: "Confirmed",
  },
  {
    id: 2,
    stage: WORK_IN_PROGRESS,
    name: "Work in progress",
  },
  {
    id: 3,
    stage: COMPLETED,
    name: "Completed",
  },
];

export const readyState = [
  {
    id: 0,
    stage: CONFIRMED,
    name: "Confirmed",
  },
  {
    id: 1,
    stage: WORK_IN_PROGRESS,
    name: "Work in progress",
  },
  {
    id: 2,
    stage: READY_FOR_COMPLETION,
    name: "Ready for Completion",
  },
  {
    id: 3,
    stage: COMPLETED,
    name: "Completed",
  },
];

export const rejectedState = [
  {
    id: 0,
    stage: NEW_CASE,
    name: "New case",
  },
  {
    id: 1,
    stage: CONFIRMED,
    name: "Confirmed",
  },
  {
    id: 2,
    stage: WORK_IN_PROGRESS,
    name: "Work in progress",
  },
  {
    id: 3,
    stage: REJECTED,
    name: "Rejected",
  },
];
export const departmants = {
  Water: "https://img.icons8.com/?size=256&id=26264&format=png",
  Road: "https://img.icons8.com/?size=256&id=DKG5EanykiIZ&format=png",

  Railways: "https://img.icons8.com/?size=256&id=u1DomTMEHl1A&format=png",

  Electricity: "https://img.icons8.com/?size=256&id=69682&format=png",

  Eduction: "https://img.icons8.com/?size=256&id=12197&format=png",

  Medical: "https://img.icons8.com/?size=256&id=EtrvEl4qafJw&format=png",

  Others: "https://img.icons8.com/?size=256&id=13746&format=png",
};
