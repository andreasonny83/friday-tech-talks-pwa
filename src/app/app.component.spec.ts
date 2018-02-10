import { TestBed, async, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule, FirebaseApp, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireList } from 'angularfire2/database';

const FIREBASE_APP_NAME = (Math.random() + 1).toString(36).substring(7);
const COMMON_CONFIG = {
  apiKey: 'xxx',
  authDomain: 'test.firebaseapp.com',
  databaseURL: 'https://test-app.firebaseio.com',
  projectId: 'test',
};

describe('AppComponent', () => {
  let app: FirebaseApp;
  let db: AngularFireDatabase;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatSnackBarModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: false }),
        AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
        AngularFireDatabaseModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([FirebaseApp, AngularFireDatabase],
  (app_: FirebaseApp, _db: AngularFireDatabase) => {
    app = app_;
    db = _db;
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const myapp = fixture.debugElement.componentInstance;
    expect(myapp).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const myapp = fixture.debugElement.componentInstance;

    expect(myapp.title).toEqual('Friday Tech Talks PWA');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent)
      .toContain('Welcome to Friday Tech Talks PWA');
  }));
});
