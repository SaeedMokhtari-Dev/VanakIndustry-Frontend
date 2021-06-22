import AuthStore from "auth/stores/AuthStore";
import {makeAutoObservable} from "mobx";
import RegisterRequest from "auth/register/handlers/register/RegisterRequest";
import RegisterHandler from "auth/register/handlers/register/RegisterHandler";
import NavigationService from "app/services/NavigationService";
import i18next from "i18next";
import log from "loglevel";
import {getLocalizedString} from "app/utils/Localization";
import UserContext from "identity/contexts/UserContext";
import {message} from "antd";

export default class RegisterViewModel
{
    uploadLoading: boolean;

    isProcessing: boolean;

    errorMessage: string;

    request: RegisterRequest = new RegisterRequest();

    constructor(public auth: AuthStore)
    {
        makeAutoObservable(this);
    }

    public async register(request: RegisterRequest)
    {
        try
        {
            this.isProcessing = true;

            let response = await RegisterHandler.register(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {

            this.errorMessage = i18next.t('Users.Error.Register.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
