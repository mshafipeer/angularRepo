import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelDetailService } from '../../shared/model-detail.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ModifyModelComponent } from '../../modifyComponent/modify-model/modify-model.component';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { ProductModel } from '../../../models/modelDetails/ProductModel';

@Component({
  selector: 'app-get-model-details',
  templateUrl: './get-model-details.component.html',
  styleUrls: ['./get-model-details.component.scss']
})

export class GetModelDetailsComponent implements OnInit {
  defaultBrands: any[] = [
    {id: '101', brandName: 'SamSung'},
    {id: '102', brandName: 'Nokia'},
    {id: '103', brandName: 'Vivo'},
    {id: '104', brandName: 'general'}
  ];

  displayedColumns: string [] = ['brandName','modelName','modelDiscription','actions'];
  selectedValue : string;
  hideLoadData : boolean = false;
  searchKey : string; 
  modelDetailsList : ProductModel[] = [];
  selectedBrandId : number;
  selectedBrandName : string = ""; 
  dataSource = new MatTableDataSource<any>(this.modelDetailsList);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static : true}) sort: MatSort; 
  
  constructor(public  modelDetailService : ModelDetailService,private dialog : MatDialog) {
    //this.getModelDetails();
    this.getMobileBrands();
   }

  ngOnInit() {
    this.getModelDetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearOnsearch(){
    this.searchKey ="";
    this.applyFilter();
 }

 applyFilter(){
   this.dataSource.filter = this.searchKey.trim().toLowerCase();
 }
  
  getModelDetails(){ 
    this.modelDetailService.getModelDetails(UrlConstant.GET_MODEL_DETAILS).subscribe(responseObj =>
    {
        this.modelDetailService.responseObject =  responseObj as ResponseObject;
        this.dataSource.data = this.modelDetailService.responseObject.productModelDetailsList;
        this.hideLoadData = true;
        console.log("responseObj  :" , responseObj);
    },error => {  
        this.hideLoadData = true; 
        console.log("error.statusText:" , error.statusText);
        console.log("error results  sadasd:" , error);
        if("Unknown Error"=== error.statusText){

        } 
    });
}

getMobileBrands(){
    this.modelDetailService.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj =>
    {
      this.modelDetailService.responseObject = responseObj as ResponseObject; 
      console.log("responseObj new11 :" ,JSON.stringify(this.modelDetailService.responseObject));
      this.modelDetailService.allMobileBrands = this.modelDetailService.responseObject.brandDetailsList;
      this.hideLoadData = true;
      console.log("responseObj :" , responseObj);
    },error => { 
      this.modelDetailService.allMobileBrands = this.defaultBrands; 
      this.defaultBrands
      this.hideLoadData = true; 
      console.log("error results  sadasd:" , error);
    });
}

getModelsByBrandOnChange(){
  if(this.modelDetailService.allMobileBrands){
      this.modelDetailService.getAllModelsByBrand(this.selectedBrandId,UrlConstant.GET_MODELS_BY_BRAND_NAME).subscribe(responseObj =>
      {
        this.modelDetailService.responseObject =  responseObj as ResponseObject;
        this.dataSource.data = this.modelDetailService.responseObject.productModelDetailsList;
        this.hideLoadData = true;
        console.log("responseObj :" , responseObj);
      }, error => {
        this.hideLoadData = true; 
        console.log("error results :" , error);
      });
  }
 }

  onCreate(){
    this.modelDetailService.addDialogCalled = true;
    this.modelDetailService.initilizeFromGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="45%";
    this.dialog.open(ModifyModelComponent,dialogConfig);
  }

  onEdit(row){  
    if(this.modelDetailService.allMobileBrands){
      let rowDetails: any = this.modelDetailService.allMobileBrands.find(s => s.id == row.brandId);
      if(rowDetails){
        // used to get selets label in service variable to be accessed in dialog form
        this.modelDetailService.sharedBrandName = rowDetails.brandName;
      }
    }
    this.modelDetailService.addDialogCalled = false;
    this.modelDetailService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="45%";
    this.dialog.open(ModifyModelComponent,dialogConfig);
  }
}
