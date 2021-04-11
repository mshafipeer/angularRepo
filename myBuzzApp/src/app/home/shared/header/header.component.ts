import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/requestStucture/genericModels/UserModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
}) 
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userName : string;

  systemUser : UserModel;
  constructor( public authservice :AuthService,public router :Router ) {
   }

  ngOnInit() {
    // console.log("from ngOnInit of Header Component with userName ",this.userName);
    this.getUserDetails();
  }


  logOutAction() {
    if(this.authservice.logout())
    {
      this.router.navigate(['login'])
    }
 }
 
 toggleSideBar(){ 
   this.toggleSideBarForMe.emit(); 
 }

//this is not working need to check with emmiter 
 public async getUserDetails()
 {
   let user  = await sessionStorage.getItem("userData");
   //return JSON.parse(user);
   this.systemUser = JSON.parse(user);
   console.log("from getUserDetails of Header Component ", JSON.parse(user));
 }
}
