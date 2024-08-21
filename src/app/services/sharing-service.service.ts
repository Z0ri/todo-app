import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {
  public task$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public cardInfo$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public createCard$: Subject<void> = new Subject<void>();
  constructor() { }
}
