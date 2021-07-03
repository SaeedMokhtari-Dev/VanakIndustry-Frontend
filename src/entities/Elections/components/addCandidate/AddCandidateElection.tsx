import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    PageHeader,
    Image,
    Row,
    Select,
    Spin,
    Table,
    message,
    Upload,
    Switch,
    Space,
    Transfer
} from "antd";
import i18next from "i18next";
import DetailElectionResponse from "../../handlers/detail/DetailElectionResponse";
import AddElectionRequest from "../../handlers/add/AddElectionRequest";
import history from "../../../../app/utils/History";
import ElectionStore from "../../stores/ElectionStore";
import "./AddCandidateElection.scss";
import NavigationService from "../../../../app/services/NavigationService";
import difference from 'lodash/difference';
import AddCandidateElectionColumns from "./AddCandidateElectionColumns";

const {useEffect} = React;


interface AddCandidateElectionProps {
    electionStore?: ElectionStore;
    match?: any;
}

const AddCandidateElection: React.FC<AddCandidateElectionProps> = inject(Stores.electionStore)(observer(({electionStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [electionId, setElectionId] = React.useState(0);

    AddCandidateElectionColumns.forEach(w => {
        w.title = i18next.t(w.title);
    });
    let columns: any[] = [...AddCandidateElectionColumns];
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
    };

    useEffect(() => {
        onLoad();
        return onUnload;
    }, []);

    async function onLoad()
    {
        electionStore.onAddCandidateElectionEditPageLoad();

        let electionIdParam = +match.params?.electionId;
        let electionCandidateTypeIdParam = +match.params?.electionCandidateTypeId;

        setElectionId(electionIdParam);

        if(electionIdParam && electionCandidateTypeIdParam)
        {
            await electionStore.editElectionViewModel.getDetailElection(electionIdParam);
            electionStore.editElectionViewModel.addCandidateElectionRequest.electionId = electionIdParam;
            electionStore.editElectionViewModel.addCandidateElectionRequest.electionCandidateTypeId = electionCandidateTypeIdParam
            if(electionStore.editElectionViewModel.detailElectionResponse.electionCandidateItems &&
                electionStore.editElectionViewModel.detailElectionResponse.electionCandidateItems.length > 0)
                electionStore.editElectionViewModel.addCandidateElectionRequest.userIds =
                    electionStore.editElectionViewModel.detailElectionResponse.electionCandidateItems?.
                    filter(w => w.electionCandidateTypeId == electionCandidateTypeIdParam)?.map(w => w.userId);
        }
        else{
            NavigationService.goBack();
        }

        await electionStore.listUserViewModel.getUserList();

        /*let userOptions = [];
        for (let item of electionStore.listElectionCandidateTypeViewModel.listElectionCandidateTypeResponse.items) {
            electionCandidateTypeOptions.push(<Option key={item.key} value={item.key}>{item.title}</Option>);
        }
        setElectionCandidateTypeOptions(electionCandidateTypeOptions);*/

        setDataFetched(true);
    }

    let viewModel = electionStore.editElectionViewModel;

    if(!viewModel) return;

    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
        <Transfer {...restProps} showSelectAll={false}>
            {({
                  direction,
                  filteredItems,
                  onItemSelectAll,
                  onItemSelect,
                  selectedKeys: listSelectedKeys,
                  disabled: listDisabled,
              }) => {

                const columns = direction === 'left' ? leftColumns : rightColumns;

                const rowSelection = {
                    getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows
                            .filter(item => !item.disabled)
                            .map(({ key }) => key);
                        const diffKeys = selected
                            ? difference(treeSelectedKeys, listSelectedKeys)
                            : difference(listSelectedKeys, treeSelectedKeys);
                        onItemSelectAll(diffKeys, selected);
                    },
                    onSelect({ key }, selected) {
                        onItemSelect(key, selected);
                    },
                    selectedRowKeys: listSelectedKeys,
                };

                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        style={{ pointerEvents: listDisabled ? 'none' : null }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) return;
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                    />
                );
            }}
        </Transfer>
    );

    async function onFinish(values: any) {
        viewModel.errorMessage = "";
        await viewModel.addCandidateElection(viewModel.addCandidateElectionRequest);
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        electionStore.onAddCandidateElectionEditPageUnload();
    }
    function onSelectChanged(e, propName, key){
        
        if(electionId) {
            let election = viewModel.editElectionRequest.electionLimitItems.find(w => w.id == key);
            election[`${propName}`] = e;
            viewModel.editElectionRequest.electionLimitItems[viewModel.editElectionRequest.electionLimitItems.indexOf(election)] = election;
        }
        else
        {
            let election = viewModel.addElectionRequest.electionLimitItems.find(w => w.id == key);
            election[`${propName}`] = e;
            viewModel.addElectionRequest.electionLimitItems[viewModel.addElectionRequest.electionLimitItems.indexOf(election)] = election;
        }

    }
    function onChange(nextTargetKeys) {
        viewModel.errorMessage = "";

        //setUserIdsOptions(nextTargetKeys);
        viewModel.addCandidateElectionRequest.userIds = nextTargetKeys;
    };
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={`${i18next.t("Elections.AddCandidate.HeaderText")}`}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"electionForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Divider>{i18next.t("Elections.Section.AddCandidate")}</Divider>
                    <Col span={24}>
                        <TableTransfer
                            dataSource={electionStore.listUserViewModel?.listUserResponse?.items}
                            targetKeys={viewModel.addCandidateElectionRequest?.userIds}
                            titles={[i18next.t("Elections.Candidates.Source.Title"), `${i18next.t("Elections.Candidates.Target.Title")}`]}
                            showSearch={true}
                            onChange={onChange}
                            filterOption={(inputValue, item) =>
                                item.fullName.indexOf(inputValue) !== -1 || item.nationalId.indexOf(inputValue) !== -1
                            }
                            leftColumns={columns}
                            rightColumns={columns}
                        />
                    </Col>
                </Row>
                <Divider></Divider>
                {viewModel.errorMessage && (
                    <div className='response-error-msg'>{viewModel.errorMessage}</div>
                )}
                    <PageHeader
                        ghost={false}
                        extra={[
                            <Button type="primary" loading={viewModel.isProcessing} key="submit" size={"large"} htmlType="submit">
                                {i18next.t("General.Add.SaveButton")}
                            </Button>
                        ]}
                    />

            </Form>
            :
                <Row gutter={[24, 16]}>
                    <Col offset={11} span={8}>
                        <Spin className={"spine"} size="large" />
                    </Col>
                </Row>
                }
        </div>
    )
}));

export default AddCandidateElection;
