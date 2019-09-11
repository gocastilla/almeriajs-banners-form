import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showAdd = true;

  constructor(public dialog: MatDialog) {}

  public data = {
    date: 'Jueves, 19 de Septiembre del 2019',
    talks: []
  };

  add() {
    this.data.talks.push({
      title: 'This is a talk',
      speaker: 'John Doe',
      avatar: 'https://github.com/john.png',
      twitter: '@johndoe',
      rank: 'He is cool'
    });
  }

  remove(talk) {
    this.data.talks.splice(this.data.talks.indexOf(talk), 1);
  }

  create() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1000px',
      data: this.data,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
}
