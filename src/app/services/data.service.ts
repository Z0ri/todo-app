import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public projectData = {
    id: "",
    title: "",
    description: ""
  }
  constructor() { }
}
