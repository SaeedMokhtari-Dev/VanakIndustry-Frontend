import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./ElectionList.scss";
import Stores from "app/constants/Stores";

import {
    Button,
    Pagination,
    Table, Modal, PageHeader
} from "antd";
import {
    EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, CarryOutOutlined,
    ExclamationCircleOutlined, PlusCircleOutlined, CheckCircleOutlined, CarOutlined
} from '@ant-design/icons';
import i18next from "i18next";
import Routes from "../../../../app/constants/Routes";
import GetElectionRequest from "../../handlers/get/GetElectionRequest";
import ElectionStore from 'entities/Elections/stores/ElectionStore';
import ElectionColumns from "./ElectionColumns";
import {getEditElectionRoute, getPresentElectionRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface ElectionListProps {
    electionStore?: ElectionStore
}

const ElectionList: React.FC<ElectionListProps> = inject(Stores.electionStore)(observer(({electionStore}) => {
    ElectionColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "finalize")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });


    let columns: any[] = [...ElectionColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                {!record.finalize &&
                    <React.Fragment>
                <Link to={getEditElectionRoute(record.key)}>
                    <Button type="primary" icon={<EditOutlined/>}
                            title={i18next.t("General.Button.Edit")}/>
                </Link>
                <Link to={getPresentElectionRoute(record.key)}>
                    <Button type="link" icon={<CarryOutOutlined />}
                            title={i18next.t("General.Button.Present")}/>
                </Link>
                    <Button type="primary" danger icon={<DeleteOutlined/>}
                    onClick={() => showDeleteConfirm(record)}
                    title={i18next.t("General.Button.Delete")}/>
                    </React.Fragment>
                }
            </div>
        )
    }];
    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        electionStore.onElectionGetPageLoad();
        //electionStore.onElectionEditPageLoad();
        electionStore.getElectionViewModel.pageIndex = 0;
        electionStore.getElectionViewModel.pageSize = 20;

        await electionStore.getElectionViewModel.getAllElection(new GetElectionRequest(
            20, 0));
    }

    let viewModel = electionStore.getElectionViewModel;

    if (!viewModel) return;

    async function showDeleteConfirm(e) {
        console.log(e.key);
        confirm({
            title: i18next.t("General.Confirm.Delete"),
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                console.log(e.key);
                await onDelete(e.key);
            },
            onCancel() {},
        });
    }

    async function onDelete(key: number){
        await viewModel.deleteElection(key);
    }

    function onUnload() {
        electionStore.onElectionGetPageUnload();
        //electionStore.onElectionEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await electionStore.getElectionViewModel.getAllElection(new GetElectionRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await electionStore.getElectionViewModel.getAllElection(new GetElectionRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Elections.Page.Title")}
                subTitle={i18next.t("Elections.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addElection}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.electionList} columns={columns} loading={viewModel?.isProcessing}
                   bordered={true} pagination={false} scroll={{ x: 1500 }} sticky/>
            <br/>
            <Pagination
                total={viewModel?.totalSize}
                showSizeChanger
                showQuickJumper
                defaultPageSize={20}
                onChange={pageIndexChanged}
                onShowSizeChange={pageSizeChanged}
                showTotal={total => `Total ${total} items`}
            />
        </div>
    )
}));


export default ElectionList;


