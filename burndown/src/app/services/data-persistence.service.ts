import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Sprint } from '../model/Sprint';
import { DataPoint } from '../model/DataPoint';

@Injectable({
  providedIn: 'root'
})
export class DataPersistenceService {

  private user: AngularFirestoreDocument<any>;
  private sprints: AngularFirestoreCollection<Sprint>;
  private dataPointsPers: Observable<DataPoint[]>;

  constructor(private afs: AngularFirestore) { }

  load() { 

    // this.user = this.afs.doc('users/' + 'txpstVEU85ZNA6GM3zNA');
    // this.user.collection<Sprint>('sprints', ref => ref
    //   .where('endDate', '>', Date.now())
    //   .limit(1)
    // ).valueChanges().pipe(
    //   mergeMap(sprint => sprint),
    //   mergeMap(sprint => sprint.dataPoints = newDataPoints),
    // ).subscribe(points => console.log(points));

    // const user = this.afs.doc('users/' + 'zXgvLoBiBUMpPpniIQct');
    // const sprints = this.user.collection('sprints', ref => ref
    // .where('endDate', '>', Date.now())
    // .limit(1));

  }
  
  create() { }
  
  update() { }
  
  delete() { }

}
