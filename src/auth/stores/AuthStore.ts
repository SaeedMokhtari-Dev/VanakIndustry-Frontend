import {AppStore} from "app/stores/AppStore";
import LoginViewModel from "auth/login/view-models/LoginViewModel";
import {makeAutoObservable} from "mobx";
import ResetPasswordViewModel from "../reset-password/view-models/ResetPasswordViewModel";
import ChangePasswordViewModel from "../change-password/view-models/ChangePasswordViewModel";
import RegisterViewModel from "../register/view-models/RegisterViewModel";

export default class AuthStore
{
    loginViewModel: LoginViewModel;

    registerViewModel: RegisterViewModel;

    resetPasswordViewModel: ResetPasswordViewModel;

    changePasswordViewModel: ChangePasswordViewModel;

    constructor(public appStore: AppStore)
    {
        makeAutoObservable(this);
    }

    onRegisterPageLoad()
    {
        this.registerViewModel = new RegisterViewModel(this);
    }

    onRegisterPageUnload()
    {
        this.registerViewModel = null;
    }

    onLoginPageLoad()
    {
        this.loginViewModel = new LoginViewModel(this);
    }

    onLoginPageUnload()
    {
        this.loginViewModel = null;
    }

    onResetPasswordPageLoad()
    {
        this.resetPasswordViewModel = new ResetPasswordViewModel(this);
    }

    onResetPasswordPageUnload()
    {
        this.resetPasswordViewModel = null;
    }

    onChangePasswordPageLoad()
    {
        this.changePasswordViewModel = new ChangePasswordViewModel(this);
    }

    onChangePasswordPageUnload()
    {
        this.changePasswordViewModel = null;
    }
}