import { SystemCodeDtlModel } from '../genericModels/SystemCodeDtlModels';
import { ProductPartModel } from '../spareParts/ProductPartsModel';

export class StockModel {
     
    id : number;
    productType ?:number;
    brandId: number;
    modelId: number;
    sparePartId : number;
    productQuality ?: string;
    retailBuy : number;
    retailSell : number;
    wholeSaleBuy : number;
    wholeSaleSell :number;
    invoiceNumber :string;
    quantity : number;
    soldQuantity : number;
    productRefrence : string;
    notes : string;
    cretedUserId ?  : String;
    deletionStatus ? : string;
    productTypeDetails ?: SystemCodeDtlModel = new SystemCodeDtlModel();
    productQualityDetails ? : SystemCodeDtlModel = new SystemCodeDtlModel();
    productPartDetails ? : ProductPartModel = new ProductPartModel();
    constructor(){ 
    }
}