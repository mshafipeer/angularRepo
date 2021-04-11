import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { HomeService } from '../home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';


export interface productType {
  id: string;
  name: string;
}


export interface MobileBrand {
  id: string;
  name: string;
}


export interface MobileModel {
  id: string;
  name: string;
}


export interface SparePart {
  id: string;
  name: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {

  isWait :boolean = true;
  panelColor = new FormControl('red');

  panelOpenState : any; 

  constructor( private _snackBar: MatSnackBar) {

   } 

   openSnackBar(message: string, action: string) {
    this._snackBar.open("heloo", "asdas", {
      duration: 2000,
    });
  }

  ngOnInit() {
   
  }

}
