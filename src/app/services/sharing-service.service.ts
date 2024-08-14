import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {
  public taskSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor() { }
}
