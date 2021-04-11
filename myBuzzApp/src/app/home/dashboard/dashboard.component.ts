import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DailySalesService } from './daily-sales.service';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { DailySalesModel } from './DailySalesModel';
import { StockViewModel } from '../mobile/models/stockView/StockViewModel';
import { Constants } from 'src/app/requestStucture/Constants';
import { NotificationService } from '../mobile/services/notification.service';

let count: BehaviorSubject<number>;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
 
export class DashboardComponent implements OnInit {

  constructor(private dailySalesService : DailySalesService ,
    private notificationService : NotificationService) { }
    
  isWait :boolean = false;
  color : 'primary';
  headerSize : number = 7;
  errorMsg : string;
  searchKey : string; 
  quantity : number = 1; 
  totalBillAmount : number = 0;
  serialNumber : number = 0 ;
  dailySales : DailySalesModel = new DailySalesModel();

  //dailySalesListDataSrc : DailySalesModel[];
  dailySalesList :  Array<DailySalesModel> = new Array();
  displayedColumns: string[] = ['rowIndex','productDesc','productRefrence', 'unitPrice', 'quantity', 'total','actions'];
  dataSource = new MatTableDataSource<DailySalesModel>(this.dailySalesList);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dailySalesService.getUserDetails();
    //this.headerSize = this.displayedColumns.length;
    //const userData = sessionStorage.getItem("userData");
  }

  clearOnsearch(){
    this.searchKey ="";
 }

 getProductForSales(){
   if(this.searchKey && this.quantity > 0){
     this.isWait = true;
     this.errorMsg = null;
     this.searchKey = this.searchKey.replace(/\s/g, "");
     let totalQuantity = this.getTotalQuantities(this.searchKey,this.quantity,this.dailySalesList);
     this.dailySalesService.getProductDetailsByRefrence(this.searchKey,totalQuantity,UrlConstant.GET_STOCK_VIEW_DETAILS_BY_PRODUCT_REFERENCE).subscribe(responseObj => {
      if(responseObj){
        this.dailySalesService.responseObject =  responseObj as ResponseObject;
        if(Constants.SUCESS_RESPONSE_CODE === this.dailySalesService.responseObject.responseCode){
          let dailySales = this.mapReponseToDailySales(this.dailySalesService.responseObject.productStockViewDetails);
          this.dailySalesList.push(dailySales);
          this.dataSource.data = this.dailySalesList;
          this.totalBillAmount =  this.totalBillAmount + dailySales.total;
          // console.log("3 after push this.dailySalesList",JSON.stringify(this.dailySalesList));
          //this.searchKey = null;
        }else{
          this.errorMsg = this.dailySalesService.responseObject.responseDesc;
        }
        this.isWait = false;
      }
    },error =>{
      this.isWait = false;
      this.errorMsg = error.statusText;
      console.log("error.statusText:" , error.statusText);
      console.log("error results  sadasd:" , error);
    });
    // console.log(" 6 finally exiting getProductForSales");
  }
 }

 mapReponseToDailySales(productStockViewDetails : StockViewModel) : DailySalesModel{
  let dailySales :  DailySalesModel = new DailySalesModel();
  dailySales.productId = productStockViewDetails.id;
  dailySales.productRefrence = productStockViewDetails.productRefrence;
  dailySales.unitPrice = productStockViewDetails.retailSell;
  dailySales.quantity = this.quantity;
  dailySales.total = this.quantity * dailySales.unitPrice;
  dailySales.customerId = 1234567;
  dailySales.createdUserId = this.dailySalesService.systemUser.userId;
  dailySales.createdDate = new Date();
  dailySales.discount = 0;
  dailySales.deletionStatus ='N';
  dailySales.serialNumber = ++this.serialNumber;
  dailySales.productDesc = productStockViewDetails.brandName +" "+ productStockViewDetails.modelName +" "+ productStockViewDetails.sparePartName;
  console.log("this.dailySalesService.systemUser =>", this.dailySalesService.systemUser);
  return dailySales;
 }

 removeItemFromSalesList(row : DailySalesModel){
    let rowNumber = row.serialNumber;
    let amount = row.total;
    const index = this.dailySalesList.findIndex(rec => rec.serialNumber === rowNumber);
    if(index > -1) {
      this.dailySalesList.splice(index, 1);
      this.dataSource.data = this.dailySalesList;
      this.totalBillAmount = this.totalBillAmount - amount;
    }
   // alert("foundIndex :" + JSON.stringify(index1));
 }

 getTotalQuantities(productReference : string,requestedQuantity : number ,dailySalesList : Array<DailySalesModel>) : number{
  let totalQuantity = requestedQuantity;
  if(this.dailySalesService.isValidCollection(dailySalesList)){
    dailySalesList.forEach(row => {
      if(row.productRefrence === productReference ){
        totalQuantity = +totalQuantity + +row.quantity;
      }
    });
  }
  return totalQuantity;
 }
 
 getSalesContactsAndOffers(){ 
  let  d =  Date.now;
  
  console.log("d.getMilliseconds()",d);
  
  //  let time = new Date();
  //  console.log("time =>",time);
  //  console.log("time =>",time.getDay);
  //  console.log("time.getFullYear =>",time.getFullYear);
  //  console.log("time.getHours =>",time.getHours.toString);
  //  console.log("time.getMonth =>",time.getMonth.toString);
  //  console.log("time.getTime =>",time.getTime);
  //  console.log("time.getSeconds =>",time.getSeconds);
  //  console.log("time.getSeconds =>",time.getSeconds);
  //  console.log("time.getTime =>",time.getTime);
  //  console.log("time.getTime =>",time.getTime);

  this.notificationService.openConfirmDialog("361252,362041,481542,481552")
  .afterClosed().subscribe(res =>{
    if(res){
      this.searchKey = '481552';
    }else{
      this.searchKey = '481542';
    }
   
  });
  
  //alert("361252,362041,481542,481552");
 }

 saveSalesTranaction(){
   if(this.dailySalesService.isValidCollection(this.dailySalesList)){
    this.notificationService.openConfirmDialog(Constants.CONFIRMATION_TO_PROCEED)
      .afterClosed().subscribe(res => {
       if(res){
        this.dailySalesService.saveSalesTranactionDetails(this.dailySalesList,UrlConstant.SAVE_SALES_TRANACTION_DETAILS).subscribe(responseObj => {
          if(responseObj){   
            console.log("responseObj 32 =>", JSON.stringify(responseObj));
            this.dailySalesService.responseObject =  responseObj.body as ResponseObject;
            console.log("this.dailySalesService.responseObject.responseCode 33 =>", this.dailySalesService.responseObject.responseCode);
            if(Constants.SUCESS_RESPONSE_CODE === this.dailySalesService.responseObject.responseCode){
              let dailySales = this.mapReponseToDailySales(this.dailySalesService.responseObject.productStockViewDetails);
              this.dailySalesList.length = 0;
              this.dataSource.data =  this.dailySalesList;
              this.totalBillAmount = 0;
              this.notificationService.sucess(Constants.RECORD_UPDATED_SUCESSFULLY);
              // console.log("3 after push this.dailySalesList",JSON.stringify(this.dailySalesList));
              this.searchKey = null;
            }else{
              this.errorMsg = this.dailySalesService.responseObject.responseDesc;
            }
          } 
        },error =>{
          this.errorMsg = error.statusText;
          console.log("error.statusText:" , error.statusText);
          console.log("error results  sadasd:" , error);
        });
      }
    });
    }
 }

}// end class brace
