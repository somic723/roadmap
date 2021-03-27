import { ThemePalette } from "@angular/material/core";

export interface IRow {
  id: number;
  subrow: any;
  cards: ICard[];
}

// export interface ISubrow {
//   cards: ICard[]
// }

export interface ICard {
  fields: IFields;
  id: string;
  key: string;
  rowNumber : number;

}

export interface IFields {
  duedate: Date;
  timeoriginalestimate: number;
  labels: string[];
  project: any;
  status: any;
  summary: string;
  description: string;
  issuetype: IssueType;
}

export interface IssueType {
  iconUrl: string;
  name: string;
}


export interface ChipColor {
  name: string;
  color: ThemePalette;
}
