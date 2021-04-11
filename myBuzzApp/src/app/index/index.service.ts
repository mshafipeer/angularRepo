import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  apiURL: string = 'http://localhost:8080/signUp';
  constructor(private httpClient: HttpClient) {
    
   }
   
  getUserDetsils() : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.apiURL);  
  } 
  // private handleError(errorResponse :HttpErrorResponse){
  //   if(errorResponse.error instanceof ErrorEvent){
  //     console.log("client Side error" ,errorResponse.error.message)
  //   }else{
  //     console.log("Server Side error" ,errorResponse)
  //   }
  //   return throwError('there is problem with service! we are notifying and working in it');
  // }

  registration(registrationData: any) : Observable<any> {
    return  this.httpClient.post<any>(this.apiURL,registrationData,{observe: 'response'});
  }


}
