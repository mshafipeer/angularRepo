import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig, MatDialog} from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar : MatSnackBar ,private dialog : MatDialog) {
   }

   config : MatSnackBarConfig ={
     duration : 3000,
     horizontalPosition : 'right',
     verticalPosition :'top'  
   } 
   
   sucess(msg){
     this.config['panelClass'] = ['notification','sucess'];
     this.matSnackBar.open(msg,'cancel',this.config);
   }

   openConfirmDialog(msg){ 
     return this.dialog.open(ConfirmDialogComponent ,{
       width : '350px', 
       panelClass : 'confirm-dialog-container',
       disableClose : true,
       data : {message : msg}
     });
   }
}
