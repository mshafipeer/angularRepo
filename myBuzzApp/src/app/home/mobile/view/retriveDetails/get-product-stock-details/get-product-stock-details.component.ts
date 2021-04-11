import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductStockService } from '../../shared/product-stock.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { ModifyStockComponent } from '../../modifyComponent/modify-stock/modify-stock.component';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';

@Component({
  selector: 'app-get-product-stock-details',
  templateUrl: './get-product-stock-details.component.html',
  styleUrls: ['./get-product-stock-details.component.scss']
}) 
export class GetProductStockDetailsComponent implements OnInit {
  displayedColumns: string [] = ['productdtls','productQuality','retailBuy','retailSell','wholeSaleBuy',
                                 'wholeSaleSell','invoiceNumber','quantity','productRefrence',
                                 'notes','actions'];
  
  hideLoadData : boolean = false;
  searchKey : string;    
  productStockDetails : any[] = [];
  brandOrModelChanged : boolean = false;
  selectedBrandId : number;
  selectedBrandName : string =""; 
  selectedModelId :number;
  selectedModelName : string =""; 
  selectedSparePartId : number;
  selectedSparePartName : string ="";
  dataSource = new MatTableDataSource<any>(this.productStockDetails);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static : true}) sort: MatSort;
 
  constructor(public  productStockService : ProductStockService,private dialog : MatDialog)
  { 
    
  }
  ngOnInit() {
    this.getBrandDetails();
    this.getproductStockDetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getproductStockDetails(){
    this.productStockService.getproductStockDetails(UrlConstant.GET_PRODUCT_STOCK_DETAILS).subscribe(responseObj => 
    {
      this.productStockService.responseObject =  responseObj as ResponseObject;
      if(this.productStockService.responseObject){
        this.dataSource.data = this.productStockService.responseObject.productStockDetailsList;
        //console.log("response uodated ==> "+JSON.stringify(this.dataSource.data));
      }
      this.hideLoadData = true;
    }, error => {
      this.hideLoadData = true;
      console.log("error results :" , error);
    });
  } 

  getBrandDetails(){
    this.productStockService.getAllBrandDetails(UrlConstant.GET_BRAND_DETAILS);
  }
   
  searchModelsByBrandOnChange(){ 
    this.selectedModelId = null;
    this.productStockService.searchModelsByBrand(this.selectedBrandId,UrlConstant.GET_MODELS_BY_BRAND_NAME);
  }

  searchSparePartsByModelOnChange(){
    this.selectedSparePartId = null;
    this.setRequiredValues();
    this.getSparePartsByModel();
  }

  getSparePartsByModel(){
    this.productStockService.searchSparePartsByModel(this.selectedModelId,UrlConstant.GET_SPARE_PARTS_BY_MODEL);
  }


  searchByBrandOrModelOrSParePart(){

    if(this.brandOrModelChanged && this.selectedBrandId && this.selectedModelId && this.selectedSparePartId){
      this.brandOrModelChanged = false;
      this.getStockByBrandModelAndSParePart(); 
    }else if(this.brandOrModelChanged && this.selectedBrandId && this.selectedModelId){ 
      this.brandOrModelChanged = false;
      this.searchStockByBrandAndModel();
    }

  }

  searchStockByBrandAndModel(){
      this.productStockService.getStockByBrandAndModel(this.selectedBrandId,this.selectedModelId,UrlConstant.GET_STOCK_BY_BRAND_AND_MODEL).subscribe(responseObj => {
        this.productStockService.responseObject = responseObj as ResponseObject;
        if(this.productStockService.responseObject){
          this.dataSource.data = this.productStockService.responseObject.productStockDetailsList;
        }
      this.hideLoadData = true;
    }, error => {
      this.hideLoadData = true;
      console.log("error results :" , error);

    });
  }

  getStockByBrandModelAndSParePart(){
      this.productStockService.getStockByBrandModelAndSpareParts(this.selectedBrandId,this.selectedModelId,this.selectedSparePartId,UrlConstant.GET_STOCK_BY_BRAND_MODEL_AND_SPARE_PART).subscribe(responseObj => {
        this.productStockService.responseObject = responseObj as ResponseObject;
        if(this.productStockService.responseObject){
          this.dataSource.data = this.productStockService.responseObject.productStockDetailsList;
        }
        this.hideLoadData = true;
    }, error => {
      this.hideLoadData = true;
      console.log("error results :" , error);

    });
  }

  setRequiredValues(){
    this.brandOrModelChanged = true; 
  }


  clearOnsearch(){
    this.searchKey ="";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){ 
    this.productStockService.addDialogCalled = true;
    this.productStockService.initilizeFromGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="85%";
    this.dialog.open(ModifyStockComponent,dialogConfig);
  }

  onEdit(row){  
    this.productStockService.addDialogCalled = false;
    this.productStockService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="85%";
    this.dialog.open(ModifyStockComponent,dialogConfig);
  }

}
