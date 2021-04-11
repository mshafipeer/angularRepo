import { Injectable } from '@angular/core';
import { UserModel } from '../requestStucture/genericModels/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public  isAuthenticated () : boolean
  {
    const userData = sessionStorage.getItem("userData");
    if(userData && userData.length > 0){
      return true;
    }else{
      return false;
    }
  }

  public async getUserDate()
  {
    const userModel = await sessionStorage.getItem("userData");
    return JSON.parse(userModel);
  }


  public getUserDate1()
  {
    const userModel = sessionStorage.getItem("userData");
    return JSON.parse(userModel);
  }

 public async login(username : string){
  let userModel : UserModel = new UserModel();
  userModel.userName = username;
  userModel.id = 101;
  userModel.token = '1234DX1001';
  userModel.loginTime = new Date();
  userModel.userId = username;
  userModel.userType = 'Admin';
  userModel.erroMsg = '';
  await sessionStorage.setItem("userData",JSON.stringify(userModel));
  return true;

 }

 public signup(postData){
   
 }

 public async logout(){
  await sessionStorage.removeItem("userData");
  sessionStorage.clear;
  return true;
}

}
