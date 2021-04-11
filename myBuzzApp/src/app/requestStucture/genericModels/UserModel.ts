import { Data } from '@angular/router';

export class UserModel{
    id: number;;
    userName : string;
    userId : string;
    userType : string;
    token : string;
    loginTime : Data;
    erroMsg  : string;
    constructor(){ 
    }
}