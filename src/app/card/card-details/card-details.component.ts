import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICard } from 'src/app/interfaces';



@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent  {

  constructor(
    public dialogRef: MatDialogRef<CardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public card: ICard) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getChipBackgroundColor(label: string) {
    console.log(label);
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

