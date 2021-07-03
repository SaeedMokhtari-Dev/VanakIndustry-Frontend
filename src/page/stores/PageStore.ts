import {makeAutoObservable} from "mobx";
import {AppStore} from "app/stores/AppStore";
import ChangeUserPasswordRequest from "../../auth/common/handlers/change-user-password/ChangeUserPasswordRequest";
import PresentElectionViewModel from "../../entities/Elections/view-models/PresentElectionViewModel";

export default class PageStore
{
    isSidebarCollapsed: boolean;

    currentLanguage: string;

    changeUserPasswordRequest: ChangeUserPasswordRequest;

    presentElectionViewModel: PresentElectionViewModel;

    constructor(public appStore: AppStore)
    {
        makeAutoObservable(this);
    }

    public onSidebarLoad(){
        this.presentElectionViewModel = new PresentElectionViewModel();
    }
    public onSidebarUnLoad(){
        this.presentElectionViewModel = null;
    }
}
