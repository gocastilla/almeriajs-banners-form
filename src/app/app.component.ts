import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public bannerSrc = '';
  public showAdd = true;

  constructor(private service: AppService) {}

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

  send() {
    this.service
      .getBanner(this.data)
      .then((banner: any) => {
        this.bannerSrc = `data:image/jpeg;base64,${banner.base64}`;
      })
      .catch(error => console.log(error));
  }
}
