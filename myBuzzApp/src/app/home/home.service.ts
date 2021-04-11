import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public content =  new BehaviorSubject<string>("default string to be shown"); 
  public share = this.content.asObservable();
  constructor() { }

  updateDate(text){
    this.content.next(text);
  }
}
