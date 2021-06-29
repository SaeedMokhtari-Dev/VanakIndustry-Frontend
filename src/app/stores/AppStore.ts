import AuthStore from "auth/stores/AuthStore";
import PageStore from "page/stores/PageStore";
import AdminStore from "admin/stores/AdminStore";
import CustomerStore from "../../customer/stores/CustomerStore";
import UserStore from "../../entities/Users/stores/UserStore";
import ElectionCandidateTypeStore from "../../entities/ElectionCandidateTypes/stores/ElectionCandidateTypeStore";
import ElectionStore from "../../entities/Elections/stores/ElectionStore";

export class AppStore
{
    auth: AuthStore;
    page: PageStore;
    customer: CustomerStore;
    admin: AdminStore;
    user: UserStore;
    electionCandidateType: ElectionCandidateTypeStore;
    election: ElectionStore;

    constructor()
    {
        this.auth = new AuthStore(this);
        this.page = new PageStore(this);
        this.customer = new CustomerStore(this);
        this.admin = new AdminStore(this);
        this.user = new UserStore(this);
        this.electionCandidateType = new ElectionCandidateTypeStore(this);
        this.election = new ElectionStore(this);
    }
}
