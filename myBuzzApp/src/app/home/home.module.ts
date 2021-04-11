import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsComponent } from './products/products.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { AddNewBrandComponent } from './mobile/add-new-brand/add-new-brand.component';
import { AddNewModelComponent } from './mobile/add-new-model/add-new-model.component';
import { AddNewMobilePartComponent } from './mobile/add-new-mobile-part/add-new-mobile-part.component';
import { AddNewStockComponent } from './mobile/add-new-stock/add-new-stock.component';
import { InvoiceComponent } from './mobile/invoice/invoice.component';
import { MobileService } from './mobile/services/mobile.service';
import { MaterialModule } from './material/material.module';
import { SharedmobileService } from './mobile/view/shared/sharedmobile.service';
import { GetInvoiceDetailsComponent } from './mobile/view/retriveDetails/get-invoice-details/get-invoice-details.component';
import { ModifyInvoiceComponent } from './mobile/view/modifyComponent/modify-invoice/modify-invoice.component';
import { GetBrandDetailsComponent } from './mobile/view/retriveDetails/get-brand-details/get-brand-details.component';
import { ModifybrandComponent } from './mobile/view/modifyComponent/modifybrand/modifybrand.component';
import { GetModelDetailsComponent } from './mobile/view/retriveDetails/get-model-details/get-model-details.component';
import { ModifyModelComponent } from './mobile/view/modifyComponent/modify-model/modify-model.component';
import { GetMobilePartsDetailsComponent } from './mobile/view/retriveDetails/get-mobile-parts-details/get-mobile-parts-details.component';
import { ModifyMobilePartsComponent } from './mobile/view/modifyComponent/modify-mobile-parts/modify-mobile-parts.component';
import { GetProductStockDetailsComponent } from './mobile/view/retriveDetails/get-product-stock-details/get-product-stock-details.component';
import { ModifyStockComponent } from './mobile/view/modifyComponent/modify-stock/modify-stock.component';
import { GetProductStockViewDetailsComponent } from './mobile/view/retriveDetails/get-product-stock-view-details/get-product-stock-view-details.component';
import { GenericService } from './mobile/services/generic.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SystemCodeComponent } from './shared/commonPages/system-code/system-code.component';
import { SystemCode1Component } from './shared/commonPages/system-code1/system-code1.component';
@NgModule({
  declarations: [
       DashboardComponent,
       SettingsComponent,
       ProductsComponent,
       SidebarComponent,
       FooterComponent,
       HeaderComponent,
       AddNewBrandComponent,
       AddNewModelComponent,
       AddNewMobilePartComponent,
       AddNewStockComponent,
       InvoiceComponent,
       GetBrandDetailsComponent,
       ModifybrandComponent,
       GetInvoiceDetailsComponent,
       ModifyInvoiceComponent,
       GetModelDetailsComponent,
       ModifyModelComponent,
       GetMobilePartsDetailsComponent,
       ModifyMobilePartsComponent,
       GetProductStockDetailsComponent,
       ModifyStockComponent,
       GetProductStockViewDetailsComponent,
       ConfirmDialogComponent,
       SystemCodeComponent,
       SystemCode1Component,
      ], 
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ], 
  exports :[
    HeaderComponent,
    SidebarComponent, 
    FooterComponent
  ],
  providers: [MobileService,SharedmobileService,GenericService], 
  entryComponents :[ 
    ModifybrandComponent,  
    ModifyInvoiceComponent,
    ModifyModelComponent,
    ModifyMobilePartsComponent,
    ModifyStockComponent,
    ConfirmDialogComponent
  ]
})  
 
export class HomeModule { } 
