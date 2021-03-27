import { ICard, IRow } from './../interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { indexOf } from 'lodash';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input()label ='';
  @Input()cards : ICard[] = [];
  @Input() minDueDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {

    this.calculateRows(this.cards);
    console.log(this.cards)
    //this.calculateRowHeight(this.cards);
  }
  calculateRowHeight(cards: ICard[]) {
    let maxRowNumber = 0;
    cards.map((card:ICard) => {
      if(card.rowNumber&&card.rowNumber>maxRowNumber)
        maxRowNumber = card.rowNumber;
    });
    console.log('maxRowNumber' +maxRowNumber);
    return maxRowNumber * 50 + 50;
  }


  calculateRows(cards: ICard[]) {
    console.log(cards);

    cards.sort(function(a, b) {
      var c = new Date(a.fields.duedate);
      var d = new Date(b.fields.duedate);
      return c.getTime() - d.getTime();
  });


    for(let i of cards){

      let index = cards.indexOf(i)
      console.log(index);
      if(index ===0  ) continue;
      let currentCardDueDate = this.parseDate(cards[index].fields.duedate);

      // let currentCardEndDate = new Date(this.parseDate(cards[index].fields.duedate).getTime() +cards[index].fields.timeoriginalestimate);

      // let lastCardDueDate = this.parseDate(cards[index].fields.duedate);
      let lastCardEndDate = new Date(this.parseDate(cards[index-1].fields.duedate).getTime() +cards[index-1].fields.timeoriginalestimate);
      console.log(lastCardEndDate);
      console.log(currentCardDueDate);

      if(currentCardDueDate<lastCardEndDate) {
        if(!cards[index - 1].rowNumber) cards[index - 1].rowNumber = 1;
        i.rowNumber= cards[index - 1].rowNumber + 1;
      }


    }

  }

  parseDate(input:any) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }



}
