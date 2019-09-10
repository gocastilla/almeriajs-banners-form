import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showAdd = true;

  constructor(private app: AppService) {}

  public data = {
    date: '',
    talks: []
  };

  add() {
    this.data.talks.push({
      title: '',
      speaker: '',
      avatar: '',
      twitter: '',
      rank: ''
    });
  }

  remove(talk) {
    this.data.talks.splice(this.data.talks.indexOf(talk), 1);
  }

  send() {
    this.app.getBanner(this.data);
  }
}
