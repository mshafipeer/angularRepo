import { InvoiceModel } from '../home/mobile/models/invoice/InvoiceModel';
import { ProductModel } from '../home/mobile/models/modelDetails/ProductModel';
import { BrandModel } from '../home/mobile/models/brand/BrandModel';
import { ProductPartModel } from '../home/mobile/models/spareParts/ProductPartsModel';
import { StockModel } from '../home/mobile/models/stock/StockModel';
import { StockViewModel } from '../home/mobile/models/stockView/StockViewModel';
import { SystemCodeMstModel } from '../home/mobile/models/genericModels/SystemCodeMstModel';


export class ResponseObject {

    invoiceDetails ? : InvoiceModel;
    invoiceDetailsList ?  : InvoiceModel[];

    brandDetails ? : BrandModel;
    brandDetailsList ? : BrandModel[];

    productModelDetails ? : ProductModel;
    productModelDetailsList ? : ProductModel[];

    productPartDetails ? : ProductPartModel;
    productPartDetailsList ? : ProductPartModel[];

    productStockDetails ? : StockModel;
    productStockDetailsList ? : StockModel[];

    productStockViewDetails ? : StockViewModel;
    productStockViewDetailsList ? : StockViewModel[];

    mstSystemCodeDetails ? : SystemCodeMstModel;
    mstSystemCodeDetailsList ? : SystemCodeMstModel[];


    responseCode :string;
    responseDesc :string;
 
    constructor() 
    { 
    
    }
}