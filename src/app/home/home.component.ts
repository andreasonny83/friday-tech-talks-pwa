// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  AngularFireDatabase,
  AngularFireList,
} from 'angularfire2/database';
import {
  style,
  animate,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('talkItem', [
      transition(':enter', [
        style({ transform: 'translateY(25px)', opacity: 0 }),
        animate('1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
      transition(':leave', [
        style({ transform: 'translateY(25px)', opacity: 1 }),
        animate('1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ]),
    trigger('spinner', [
      transition(':enter', [
        style({ transform: 'scale(0.1)', opacity: 0 }),
        animate('1s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ])
  ],
})
export class HomeComponent implements OnInit {
  public talks: Observable<any[]>;
  public comingTalks$: Observable<any[]>;
  public pastTalks$: Observable<any[]>;

  private talksRef: AngularFireList<any>;
  private nextFriday: number;

  constructor(
    public snackBar: MatSnackBar,
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.talksRef = db.list('talks');
    this.talks = this.talksRef.valueChanges();
    this.nextFriday = this.getNextTalkDate(5, 16);

    this.snackBar.open('Welcome back!', null, { duration: 3000 });
  }

  ngOnInit() {
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
  }

  addItem(newName: string): void {
    // this.authService.auth.currentUser.updateProfile({
    //   displayName: null,
    //   photoURL: this.authService.auth.currentUser.photoURL,
    // });

    this.talksRef.push({
      title: newName,
      presenter: this.authService.userDetails.displayName ||
        this.authService.userDetails.email,
      author: this.authService.userDetails.uid,
      updated: new Date().getTime(),
      talkTimestamp: this.nextFriday,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    })
    .once('value')
    .then(snapshot => {
      const invertedTimestamp = snapshot.val().timestamp * -1;
      this.talksRef.update(snapshot.key, {
        id: snapshot.key,
        invertedTimestamp,
      });
    });
  }

  public deleteItem(itemId: string): void {
    this.talksRef.remove(itemId)
      .then(_ => this.snackBar.open('item deleted!', null, { duration: 3000 }))
      .catch(_ => this.snackBar.open(
        'You don\'t have permission to delete this item', null, { duration: 3000 }));
  }

  public userHasPermission(userId: string): boolean {
    return this.authService.auth.currentUser.uid === userId;
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
}
