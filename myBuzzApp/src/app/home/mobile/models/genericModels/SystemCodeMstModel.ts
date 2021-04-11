import { SystemCodeDtlModel } from './SystemCodeDtlModels';

export class SystemCodeMstModel { 
   
    systemCodeId: number;
    systemCodeType : string; 
    systemCodeDesc : string;
    deletionStatus  : string;
    dtlSystemCodeDetails : SystemCodeDtlModel[] = [];
    constructor(){ 
    }
}