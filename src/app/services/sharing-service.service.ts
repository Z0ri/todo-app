import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {
  public taskSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public cardInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public cardTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public createCardSubject: Subject<void> = new Subject<void>();
  constructor() { }
}
