import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
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
    trigger('talks', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
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
  private talksRef: AngularFireList<any>;

  constructor(
    public snackBar: MatSnackBar,
    public swUpdate: SwUpdate,
    private db: AngularFireDatabase,
  ) {
    this.title = 'Friday Tech Talks PWA';
    this.version = '0.0.8';
    this.logoSize = '150';

    this.talks = db.list('talks').valueChanges();
    this.talksRef = db.list('talks');

    swUpdate.available.subscribe(event => {
      this.showMsg('a new version is available. ' +
        'Please refresh this page to load the latest version.');
    });
  }

  ngOnInit() {
    this.appInfo$ = this.db.object('appInfo').snapshotChanges();

    this.appInfo$.subscribe(res => console.log(res));
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
    });
  }

  private checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }

  private showMsg(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 2000,
    });
  }
}
