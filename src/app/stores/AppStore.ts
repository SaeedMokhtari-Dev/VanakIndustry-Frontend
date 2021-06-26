import AuthStore from "auth/stores/AuthStore";
import PageStore from "page/stores/PageStore";
import AdminStore from "admin/stores/AdminStore";
import CustomerStore from "../../customer/stores/CustomerStore";
import UserStore from "../../entities/Users/stores/UserStore";

export class AppStore
{
    auth: AuthStore;
    page: PageStore;
    customer: CustomerStore;
    admin: AdminStore;
    user: UserStore;

    constructor()
    {
        this.auth = new AuthStore(this);
        this.page = new PageStore(this);
        this.customer = new CustomerStore(this);
        this.admin = new AdminStore(this);
        this.user = new UserStore(this);
    }
}
