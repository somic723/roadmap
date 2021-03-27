import { ICard } from './../interfaces';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardDetailsComponent } from './card-details/card-details.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() card: ICard = {
    id: '0',
    fields: {
      duedate: new Date(),
      labels: [],
      project: '',
      status: '',
      timeoriginalestimate: 0,
      summary: '',
      description: '',
      issuetype: {
        iconUrl:'',
        name: ''
      }
    },
    key: '0',
    rowNumber: 0,

  };

  @Input() minDueDate: Date = new Date();

  constructor(public dialog: MatDialog) {}

  distanceFromMinDueDate = 0;

  ngOnChanges(): void {
    let timestamp1 = new Date(this.card.fields.duedate).getTime();
    let timestamp2 = new Date(this.minDueDate).getTime();

    let diff = timestamp1 - timestamp2;
    //this.distanceFromMinDueDate = new Date (diff);
    this.distanceFromMinDueDate = Math.floor(diff / 10000000);
    console.log(diff / 10000000);
  }

  parseDate(input: any) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }

  calculateCardWidth(card: ICard) {
    return card.fields.timeoriginalestimate &&
      card.fields.timeoriginalestimate / 1440 > 200
      ? card.fields.timeoriginalestimate / 1440
      : 200;
  }
  calculateTopMargin(card: ICard) {
    return card.rowNumber ? card.rowNumber * 150 : 50;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      width: '80%',
      data: this.card// {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  getBackgroundColor(label: string) {
    //console.log(label);
    let color = 'mediumpurple';

    switch (label.toLocaleLowerCase()) {
      case 'bugs':
        return 'red';
      case 'backend':
        return '#7CD385';
      case 'roadmap':
        return '#F689BE';
      case 'eva':
        return '#7c73d1';
      case 'revenue':
        return '#FFEE00';

      default:
        break;
    }

    return color;
  }
}

