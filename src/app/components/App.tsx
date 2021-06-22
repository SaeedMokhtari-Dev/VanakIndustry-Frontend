import "antd/dist/antd.min.css";
import "app/styles/style.scss";
import React, {Component, Suspense} from "react";
import { ConfigProvider } from 'antd';
import { Router, Switch, Route, Redirect, useParams } from 'react-router-dom'
import popupContainer from "app/utils/PopupContainer";
import Routes from "app/constants/Routes";
import Login from "auth/login/components/Login";
import history from "app/utils/History";
import NotFoundPage from "app/components/not-found-page/NotFoundPage";
import AuthRoute from "app/components/routes/AuthRoute";
import ProtectedRoute from "app/components/routes/ProtectedRoute";
import ResetPassword from "auth/reset-password/components/ResetPassword";
import ChangePassword from "auth/change-password/components/ChangePassword";
import ProtectedRedirectRoute from "app/components/routes/ProtectedRedirectRoute";
import Page from "page/components/Page";
import RoleType from "identity/constants/RoleType";
import Dashboard from "app/components/common/Dashboard";
import EditCompany from "entities/companies/components/company/EditCompany";
import CompaniesList from "../../entities/companies/components/list/CompaniesList";
import en_US from 'antd/lib/locale/en_US';
import fa_IR from 'antd/lib/locale/fa_IR';
import {DirectionType} from "antd/es/config-provider";
import Register from "../../auth/register/components/Register";

const App: React.FC = () =>
{
    /*let antLang = en_US;
    let dir: DirectionType = 'ltr';
    const language = localStorage.getItem("currentLanguage");
    if(language && language != 'en') {
        antLang = ar_EG;
        dir = 'rtl';
    }*/
    let dir: DirectionType = 'rtl';
    let antLang = fa_IR;
    return (
        <ConfigProvider locale={antLang} getPopupContainer={popupContainer} direction={dir}>
            <Suspense fallback="">
                <Router history={history}>
                    <Switch>

                        <ProtectedRedirectRoute exact path="/" />

                        {/* Auth */}
                        <Route path={Routes.auth}>
                            <Switch>
                                <AuthRoute exact path={Routes.auth} component={Login} />
                                <Route exact path={Routes.register} component={Register} />
                                <Route exact path={Routes.resetPassword} component={ResetPassword} />
                                <Route exact path={Routes.changePassword} component={ChangePassword} />

                                <Route component={NotFoundPage} />
                            </Switch>
                        </Route>

                        <ProtectedRoute path={Routes.app} allRoles={true}>
                            <Page>
                                <Switch>
                                    {/* All Roles */}
                                    <Route exact path={Routes.app} component={Dashboard} />

                                    {/* Entities */}
                                    <Route exact roles={[RoleType.admin]} path={Routes.company} component={CompaniesList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editCompany} component={EditCompany} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addCompany} component={EditCompany} />

                                    <Route component={NotFoundPage} />
                                </Switch>
                            </Page>
                        </ProtectedRoute>

                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </Suspense>
        </ConfigProvider>
    );
};

export default App;
