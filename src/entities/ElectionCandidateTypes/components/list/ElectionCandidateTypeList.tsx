import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./ElectionCandidateTypeList.scss";
import Stores from "app/constants/Stores";

import {
    Button,
    Pagination,
    Table, Modal, PageHeader
} from "antd";
import {
    EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined,
    ExclamationCircleOutlined, PlusCircleOutlined, CheckCircleOutlined, CarOutlined
} from '@ant-design/icons';
import i18next from "i18next";
import Routes from "../../../../app/constants/Routes";
import NavigationService from "../../../../app/services/NavigationService";
import GetElectionCandidateTypeRequest from "../../handlers/get/GetElectionCandidateTypeRequest";
import ElectionCandidateTypeStore from 'entities/ElectionCandidateTypes/stores/ElectionCandidateTypeStore';
import ElectionCandidateTypeColumns from "./ElectionCandidateTypeColumns";
import {getEditElectionCandidateTypeRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface ElectionCandidateTypeListProps {
    electionCandidateTypeStore?: ElectionCandidateTypeStore
}

const ElectionCandidateTypeList: React.FC<ElectionCandidateTypeListProps> = inject(Stores.electionCandidateTypeStore)(observer(({electionCandidateTypeStore}) => {
    ElectionCandidateTypeColumns.forEach(w => {
       w.title = i18next.t(w.title);
    });


    let columns: any[] = [...ElectionCandidateTypeColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditElectionCandidateTypeRoute(record.key)}>
                   <Button type="primary" icon={<EditOutlined/>}
                           title={i18next.t("General.Button.Edit")}/>
               </Link>
               <Button type="primary" danger icon={<DeleteOutlined/>}
               onClick={() => showDeleteConfirm(record)}
               title={i18next.t("General.Button.Delete")}/>

            </div>
        )
    }];
    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        electionCandidateTypeStore.onElectionCandidateTypeGetPageLoad();
        //electionCandidateTypeStore.onElectionCandidateTypeEditPageLoad();
        electionCandidateTypeStore.getElectionCandidateTypeViewModel.pageIndex = 0;
        electionCandidateTypeStore.getElectionCandidateTypeViewModel.pageSize = 20;

        await electionCandidateTypeStore.getElectionCandidateTypeViewModel.getAllElectionCandidateType(new GetElectionCandidateTypeRequest(
            20, 0));
    }

    let viewModel = electionCandidateTypeStore.getElectionCandidateTypeViewModel;

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
        await viewModel.deleteElectionCandidateType(key);
    }

    function onUnload() {
        electionCandidateTypeStore.onElectionCandidateTypeGetPageUnload();
        //electionCandidateTypeStore.onElectionCandidateTypeEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await electionCandidateTypeStore.getElectionCandidateTypeViewModel.getAllElectionCandidateType(new GetElectionCandidateTypeRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await electionCandidateTypeStore.getElectionCandidateTypeViewModel.getAllElectionCandidateType(new GetElectionCandidateTypeRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("ElectionCandidateTypes.Page.Title")}
                subTitle={i18next.t("ElectionCandidateTypes.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addElectionCandidateType}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.electionCandidateTypeList} columns={columns} loading={viewModel?.isProcessing}
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


export default ElectionCandidateTypeList;


