import { Route} from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsComponent } from './products/products.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../guards/auth.guard';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddNewBrandComponent } from './mobile/add-new-brand/add-new-brand.component';
import { AddNewStockComponent } from './mobile/add-new-stock/add-new-stock.component';
import { AddNewModelComponent } from './mobile/add-new-model/add-new-model.component';
import { AddNewMobilePartComponent } from './mobile/add-new-mobile-part/add-new-mobile-part.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InvoiceComponent } from './mobile/invoice/invoice.component';
import { GetBrandDetailsComponent } from './mobile/view/retriveDetails/get-brand-details/get-brand-details.component';
import { GetInvoiceDetailsComponent } from './mobile/view/retriveDetails/get-invoice-details/get-invoice-details.component';
import { GetModelDetailsComponent } from './mobile/view/retriveDetails/get-model-details/get-model-details.component';
import { GetMobilePartsDetailsComponent } from './mobile/view/retriveDetails/get-mobile-parts-details/get-mobile-parts-details.component';
import { GetProductStockDetailsComponent } from './mobile/view/retriveDetails/get-product-stock-details/get-product-stock-details.component';
import { GetProductStockViewDetailsComponent } from './mobile/view/retriveDetails/get-product-stock-view-details/get-product-stock-view-details.component';
import { SystemCodeComponent } from './shared/commonPages/system-code/system-code.component';
import { UserloginComponent } from '../index/userlogin/userlogin.component';

export const HomeRoutes : Route [] = 
[
    {
        path : "" ,
        component : HomeComponent,
        canActivate :[AuthGuard],
        children :
        [ 
            {
                path : "" ,
                component : DashboardComponent
            },
            {
                path : "settings" ,
                component : SettingsComponent
            },
            {
                path : "products" ,
                component : ProductsComponent
            },
            {
                path :"logout",
                component : IndexComponent
            },
            {
                path : "dashboard" ,
                component : DashboardComponent
            },
            {
                path : "header" ,
                component : HeaderComponent
            },
            {
                path : "sidebar" ,
                component : SidebarComponent
            },
            {
                path : "addnewBrand",
                component :AddNewBrandComponent
            },
            {
                path : "addnewstock",
                component :AddNewStockComponent
            },
            {
                path : "addnewModel",
                component :AddNewModelComponent
            },
            {
                path : "addNewMobileParts",
                component :AddNewMobilePartComponent
            },
            {
                path :"footer",
                component :FooterComponent
            },
            {
                path : "invoice",
                component : InvoiceComponent
            },
            {
                path : "viewBrandDetails",
                component : GetBrandDetailsComponent
            },
            {
                path : "getInvoiceDetailsLink",
                component : GetInvoiceDetailsComponent
            },
            {
                path : "getModelDetailsLink",
                component : GetModelDetailsComponent
            },
            {
                path : "getSparePatrtsLink",
                component : GetMobilePartsDetailsComponent
            },
            { 
                path : "getProductStocksLink",
                component : GetProductStockDetailsComponent                
            },
            {
                path : "getProductStocksViewLink",
                component : GetProductStockViewDetailsComponent                
            },
            {
                path : "getAndUpdateSystemCode",
                component : SystemCodeComponent                
            },
            {
                path : "useLoginPage",
                component : UserloginComponent
            }
        ]
    }
    ]