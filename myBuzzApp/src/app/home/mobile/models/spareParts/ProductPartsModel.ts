import { ProductModel } from '../modelDetails/ProductModel';

export class ProductPartModel {
   
    id: number; 
    brandId : string;
    modelId : string;
    sparePartName : string;
    spareDiscription : string;
    deletionStatus  : string;
    productModel : ProductModel = new ProductModel();
    constructor(){ 
    }
}


