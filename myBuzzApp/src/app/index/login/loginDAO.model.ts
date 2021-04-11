import { IndexModel} from '../index.model';

export class LoginDAO {
    email : string;
    password :string;
    errorText : string;
    indexObj? = new IndexModel();        

    constructor()
    {
        this.email ="";
        this.password= "";
        this.errorText ="";
    }
}