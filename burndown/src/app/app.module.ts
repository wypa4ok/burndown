import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ChartComponent } from './chart/chart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { firebaseConfig } from '../environments/firebase.config'

const appRoutes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ChartComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
