// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string;
  public version: string;
  public appInfo$: Observable<any>;

  constructor(
    public snackBar: MatSnackBar,
    public swUpdate: SwUpdate,
    private db: AngularFireDatabase,
  ) {
    this.title = 'Friday Tech Talks PWA';
    this.version = '0.0.9';

    swUpdate.available.subscribe(event => {
      this.snackBar
        .open('A new version is now available.', 'Refresh')
        .onAction()
        .subscribe(res => window.location.reload());
    });
  }

  ngOnInit() {
    this.appInfo$ = this.db.object('appInfo').snapshotChanges();

    if (this.swUpdate.isEnabled) {
      this.checkForUpdate();
    }
  }

  private checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }
}
