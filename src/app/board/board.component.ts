import { ICard } from './../interfaces';

import { IRow } from '../interfaces';
import { JiraApiService } from './../jira-api.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private jiraApiService: JiraApiService) { }

  board: Record<string, ICard[]> = {};

  minDueDate: Date = new Date();


  ngOnInit(): void {
    this.jiraApiService.getIssues().subscribe((res:any) => {
      console.log(res['issues']);

      var allLabelsArray = _.map(res.issues, 'fields.labels');
      var uniqueLabels = _.uniqWith(_.flatten(allLabelsArray), _.isEqual);

      let rows: { [label: string]: any[] } = {};
      uniqueLabels.forEach((element: any) => {
        rows[element] = [];
      });

      res.issues?.forEach((issue: any) => {
        uniqueLabels.forEach((element: any) => {
          if (rows[element] === undefined) rows[element];
          if (issue.fields?.labels.includes(element)) {
            rows[element].push(issue);
          }
        });
      });

      this.board = rows;
      console.log(this.board);

      this.findMinDueDate(res);
    })
  }

  findMinDueDate(res:any) {
    let dueDates :any = _.map(res.issues, 'fields.duedate');
    console.log(dueDates as Date);
    this.minDueDate = dueDates.reduce(function (a:Date, b: Date) { return a < b ? a : b; });
  }

}
