import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import * as firebase from 'firebase';
import {
  style,
  animate,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('talkItem', [
      transition(':enter', [
        style({ transform: 'translateY(25px)', opacity: 0 }),
        animate('1s 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
      transition(':leave', [
        style({ transform: 'translateY(25px)', opacity: 1 }),
        animate('1s 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ]),
    trigger('spinner', [
      transition(':enter', [
        style({ transform: 'scale(0.1)', opacity: 0 }),
        animate('1s 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ])
  ],
})
export class AppComponent implements OnInit {
  public title: string;
  public version: string;
  public logoSize: string;
  public appInfo$: Observable<any>;
  public talks: Observable<any[]>;
  public comingTalks$: Observable<any[]>;
  public pastTalks$: Observable<any[]>;

  private talksRef: AngularFireList<any>;
  private nextFriday: number;

  constructor(
    public snackBar: MatSnackBar,
    public swUpdate: SwUpdate,
    private db: AngularFireDatabase,
  ) {
    this.title = 'Friday Tech Talks PWA';
    this.version = '0.0.8';

    this.talks = db.list('talks').valueChanges();
    this.nextFriday = this.getNextTalkDate(5, 16);
    this.talksRef = db.list('talks');

    swUpdate.available.subscribe(event => {
      this.showMsg('a new version is available. ' +
        'Please refresh this page to load the latest version.', 10000);
    });
  }

  ngOnInit() {
    this.appInfo$ = this.db.object('appInfo').snapshotChanges();

    this.comingTalks$ = this.db
      .list('talks', ref => ref.orderByChild('talkTimestamp').startAt(this.nextFriday))
      .valueChanges()
      .delay(1000);

      this.pastTalks$ = this.db
        .list('talks', ref => ref.orderByChild('invertedTimestamp'))
        .valueChanges()
        .delay(1000)
        .map(talks => talks.filter(talk =>
          talk['talkTimestamp'] !== this.nextFriday));

    if (this.swUpdate.isEnabled) {
      this.checkForUpdate();
    }

    setTimeout(() => this.showMsg('Welcome!'), 1000);
  }

  addItem(newName: string) {
    this.talksRef.push({
      title: newName,
      presenter: 'No Name',
      updated: new Date().getTime(),
      talkTimestamp: this.nextFriday,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    })
    .once('value')
    .then(snapshot => {
      const invertedTimestamp = snapshot.val().timestamp * -1;
      this.talksRef.update(snapshot.key, { invertedTimestamp });
    });
  }

  private checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }

  private getNextTalkDate(dayOfWeek: number, timeOfTheDay: number) {
    const now: Date = new Date();
    const utcDate: Date = new Date(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes());

    let offset = (7 + dayOfWeek - now.getUTCDay()) % 7;

    if (!offset && now.getUTCHours() >= timeOfTheDay) {
      offset += 7;
    }

    utcDate.setDate(now.getUTCDate() + offset);
    utcDate.setHours(timeOfTheDay, 0, 0);
    utcDate.setSeconds(0, 0);

    return utcDate.valueOf();
  }

  private showMsg(msg: string, duraton: number = 1000): void {
    this.snackBar.open(msg, '', { duration: duraton });
  }
}
