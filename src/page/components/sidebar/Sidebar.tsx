import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import PageStore from "page/stores/PageStore";
import "page/components/sidebar/Sidebar.scss";
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';
import {
    DashboardOutlined, ReadOutlined, ShoppingOutlined, DollarOutlined, HomeOutlined,
    ShopOutlined, BookOutlined, CarOutlined
} from '@ant-design/icons';
import Routes from "../../../app/constants/Routes";
import i18next from "i18next";
import UserContext from "../../../identity/contexts/UserContext";
import RoleType from "../../../identity/constants/RoleType";
import {getElectionProcessRoute} from "../../../app/utils/RouteHelper";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
    pageStore?: PageStore
}

const Sidebar: React.FC<SidebarProps> = inject(Stores.pageStore)(observer(({pageStore, children}) =>
{
    const [electionLink, setElectionLink] = React.useState("");
    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    const adminMenu= (<Menu theme="dark" defaultSelectedKeys={['app']} mode="inline">
        <Menu.Item key="app" icon={<DashboardOutlined />}>
            <Link to={Routes.app}>{i18next.t('Dashboard.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="user" icon={<HomeOutlined />}>
            <Link to={Routes.user}>{i18next.t('Users.Menu.Title')}</Link>
        </Menu.Item>
        {/*<Menu.Item key="presentUser" icon={<HomeOutlined />}>
            <Link to={Routes.presentUser}>{i18next.t('Users.Present.Menu.Title')}</Link>
        </Menu.Item>*/}
        <Menu.Item key="electionCandidateType" icon={<HomeOutlined />}>
            <Link to={Routes.electionCandidateType}>{i18next.t('ElectionCandidateTypes.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="election" icon={<HomeOutlined />}>
            <Link to={Routes.election}>{i18next.t('Elections.Menu.Title')}</Link>
        </Menu.Item>
    </Menu>)

    async function onLoad() {
        pageStore.onSidebarLoad();

        if(UserContext.info.roles.includes(0)) {
            await pageStore.presentElectionViewModel.getElectionPresent(UserContext.info.id);
            if(pageStore.presentElectionViewModel?.presentElectionResponse?.electionId){
                setElectionLink(getElectionProcessRoute(
                    pageStore.presentElectionViewModel.presentElectionResponse.electionId
                ));
            }
        }
    }

    function onUnload() {
        pageStore.onSidebarUnLoad();
    }

    function toggle() {
        pageStore.isSidebarCollapsed = !pageStore?.isSidebarCollapsed
    }
    const customerMenu= (<Menu theme="dark" defaultSelectedKeys={['app']} mode="inline">
        <Menu.Item key="app" icon={<DashboardOutlined />}>
            <Link to={Routes.app}>{i18next.t('Dashboard.Menu.Title')}</Link>
        </Menu.Item>
        {
            electionLink &&
            <Menu.Item key="electionProcess" icon={<DashboardOutlined />}>
                <Link to={electionLink}>شرکت در انتخابات</Link>
            </Menu.Item>
        }
    </Menu>)
    return (
        <Sider collapsible collapsed={pageStore?.isSidebarCollapsed} onCollapse={toggle}>
            <div>
                <img src="/images/vanak-industry-logo.png" hidden={pageStore?.isSidebarCollapsed} style={{width: "100%", height: "100%"}} alt="logo"/>
            </div>
            {UserContext.info.roles.includes(RoleType.user) ? customerMenu : ""}
            {UserContext.info.roles.includes(RoleType.admin) ? adminMenu : ""}
        </Sider>
    )
}));

export default Sidebar;
