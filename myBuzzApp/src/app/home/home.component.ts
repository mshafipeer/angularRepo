import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MediaObserver,MediaChange} from '@angular/flex-layout';
import{Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 
export class HomeComponent implements OnInit,OnDestroy { 
  mediaSub : Subscription;
  devicesXs : boolean;
  public userName :string;
  sideBarOpen = false;
  constructor( public authservice :AuthService,public router :Router,
    private mediaObserver : MediaObserver ) {

   }
   name : any; 
   public responseData = {
    "name": '',
    "id": "",
    "token": "", 
    "erroMsg": ""
  };

  
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result :MediaChange) => {
      console.log(result.mqAlias);
      this.devicesXs =result.mqAlias === 'xs' ? true : false;
      this.sideBarOpen = !this.devicesXs;
    });
    this.responseData = this.authservice.getUserDate1();
    this.userName = this.responseData.name;
  }
  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  logOutAction() {
     if(this.authservice.logout()){
       this.router.navigate(['login'])
     }
  }

  sideBarToggler()
  {
    this.sideBarOpen =!this.sideBarOpen; 
  } 
}
