import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { InvoiceDetailsService } from '../../shared/invoice-details.service';

import { ModifyInvoiceComponent } from '../../modifyComponent/modify-invoice/modify-invoice.component';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { InvoiceModel } from '../../../models/invoice/InvoiceModel';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Component({
  selector: 'app-get-invoice-details',
  templateUrl: './get-invoice-details.component.html',
  styleUrls: ['./get-invoice-details.component.scss']
})
 
export class GetInvoiceDetailsComponent implements OnInit {
    // serviceName : string = "getInvoiceDetails"; 
    // serviceNameTest : string = "getInvoiceDetailsTest"; 
    invoiceModel:  InvoiceModel;
    hideLoadData : boolean = false;
    searchKey : string;

    invoiceDetails : any[] = [];
    displayedColumns: string[] = ['id','invoiceNumber','supplierName',
                                  'invoiceDetails','invoiceDate','invoiceAmount','actions'];

    dataSource = new MatTableDataSource<any>(this.invoiceDetails);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static : true}) sort: MatSort;
    

    constructor(private dialog : MatDialog,private invoiceDetailsService : InvoiceDetailsService) { 
      //this.responseObject = new ResponseObject();
      this.getInvoiceDetails();
    }
   
  
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    getInvoiceDetails(){
          this.invoiceDetailsService.getInvoiceDetails(UrlConstant.GET_INVOICE_DETAILS).subscribe(responseObj =>
          {
              this.invoiceDetailsService.responseObject = responseObj as ResponseObject; 
              this.dataSource.data = this.invoiceDetailsService.responseObject.invoiceDetailsList;        
              this.hideLoadData = true;
          },error => {  
              //this.dataSource.data = ELEMENT_DATA; 
              this.hideLoadData = true; 
              console.log("error.statusText:" , error.statusText);
              console.log("error results  sadasd:" , error);
              if("Unknown Error"=== error.statusText){
            } 
          });
    }

    applyFilter(){
        this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }

    clearOnsearch(){
      this.searchKey ="";
      this.applyFilter();
   }


   onCreate(){
    this.invoiceDetailsService.initilizeFromGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="50%";
    this.dialog.open(ModifyInvoiceComponent,dialogConfig);
  }

  onEdit(row) {   
   
    //this.dataSource.data = ELEMENT_DATA;
    // console.log("invoiceRow onEdit before :" ,invoiceRow);
    // let dateInDateFormat = new Date(invoiceRow.invoiceDate);
    // invoiceRow.invoiceDate = dateInDateFormat;
    // console.log("invoiceRow onEdit after:" ,invoiceRow);
    this.invoiceDetailsService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="50%";
    this.dialog.open(ModifyInvoiceComponent,dialogConfig);
    //this.dataSource._renderChangesSubscription;
 }

}