import {makeAutoObservable} from "mobx";
import Sizes from "page/constants/Sizes";
import {AppStore} from "app/stores/AppStore";
import ChangeUserPasswordRequest from "../../auth/common/handlers/change-user-password/ChangeUserPasswordRequest";

export default class PageStore
{
    isSidebarCollapsed: boolean;

    currentLanguage: string;

    changeUserPasswordRequest: ChangeUserPasswordRequest;

    constructor(public appStore: AppStore)
    {
        makeAutoObservable(this);
    }
}
