import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Space
} from "antd";
import i18next from "i18next";
import DetailElectionResponse from "../../handlers/detail/DetailElectionResponse";
import AddElectionRequest from "../../handlers/add/AddElectionRequest";
import history from "../../../../app/utils/History";
import ElectionStore from "../../stores/ElectionStore";
import "./EditElection.scss";
import {PlusOutlined, MinusCircleOutlined, UserAddOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ElectionLimitItem from "../../handlers/models/ElectionLimitItem";
import MaskedInput from "antd-mask-input";
import persianMoment from "jalali-moment";
import {getAddCandidateElectionRoute} from "../../../../app/utils/RouteHelper";

const {useEffect} = React;
const { Option } = Select;


interface EditElectionProps {
    electionStore?: ElectionStore;
    match?: any;
}

const EditElection: React.FC<EditElectionProps> = inject(Stores.electionStore)(observer(({electionStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [electionId, setElectionId] = React.useState(0);
    const [electionCandidateTypeOptions, setElectionCandidateTypeOptions] = React.useState([]);
    const [electionLimitItems, setElectionLimitItems] = React.useState([]);
    const [iplimit, setIplimit] = React.useState(false);
    const [keyId, setKeyId] = React.useState(-100000);

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
        electionStore.onElectionEditPageLoad();

        let electionIdParam = +match.params?.electionId;

        setElectionId(electionIdParam);

        if(electionIdParam)
        {
            await electionStore.editElectionViewModel.getDetailElection(electionIdParam);
            electionStore.editElectionViewModel.editElectionRequest.electionId = electionIdParam;
            setElectionLimitItems(electionStore.editElectionViewModel.detailElectionResponse.electionLimitItems);
            setIplimit(electionStore.editElectionViewModel.detailElectionResponse.iplimit);
        }
        else{
            electionStore.editElectionViewModel.addElectionRequest = new AddElectionRequest();
            electionStore.editElectionViewModel.detailElectionResponse = new DetailElectionResponse();
            setElectionLimitItems([]);
        }

        await electionStore.listElectionCandidateTypeViewModel.getElectionCandidateTypeList();

        let electionCandidateTypeOptions = [];
        for (let item of electionStore.listElectionCandidateTypeViewModel.listElectionCandidateTypeResponse.items) {
            electionCandidateTypeOptions.push(<Option key={item.key} value={item.key}>{item.title}</Option>);
        }
        setElectionCandidateTypeOptions(electionCandidateTypeOptions);

        setDataFetched(true);
    }

    let viewModel = electionStore.editElectionViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(electionId)
        {
            await viewModel.editElection(viewModel.editElectionRequest);
        }
        else
        {
            await viewModel.addElection(viewModel.addElectionRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        electionStore.onElectionEditPageUnload();
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
    function onChanged(e){
        if(electionId)
            viewModel.editElectionRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addElectionRequest[`${e.target.id}`] = e.target.value;
    }

    function onMaskChanged(e) {
        if(electionId)
            viewModel.editElectionRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addElectionRequest[`${e.target.id}`] = e.target.value;
    }
    function submitRage({ start, end }) {
        console.log("start ", start);
        console.log("end ", end);
        
        if(electionId) {
            viewModel.editElectionRequest.startDate = start;
            viewModel.editElectionRequest.endDate = end;
        }
        else
        {
            viewModel.addElectionRequest.startDate = start;
            viewModel.addElectionRequest.endDate = end;
        }

    }
    function onIpLimitChanged(e){
        
        setIplimit(e);
        if(electionId)
        {
            viewModel.editElectionRequest.iplimit = e;
        }
        else{
            viewModel.addElectionRequest.iplimit = e;
        }
    }
    function onLimitCountChanged(e, key){
        
        if(electionId)
        {
            let election = viewModel.editElectionRequest.electionLimitItems.find(w => w.id == key);
            election.limitCount = e;
            viewModel.editElectionRequest.electionLimitItems[viewModel.editElectionRequest.electionLimitItems.indexOf(election)] = election;
        }
        else{
            let election = viewModel.addElectionRequest.electionLimitItems.find(w => w.id == key);
            election.limitCount = e;
            viewModel.addElectionRequest.electionLimitItems[viewModel.addElectionRequest.electionLimitItems.indexOf(election)] = election;
        }
    }
    function add(){
        
        let newKeyId = keyId + 1;
        setKeyId(newKeyId);
        let electionLimitItem: ElectionLimitItem = new ElectionLimitItem();
        electionLimitItem.id = newKeyId;
        if(electionId)
        {
            viewModel.editElectionRequest.electionLimitItems.push(electionLimitItem);
            setElectionLimitItems(viewModel.editElectionRequest.electionLimitItems);
        }
        else{
            viewModel.addElectionRequest.electionLimitItems.push(electionLimitItem);
            setElectionLimitItems(viewModel.addElectionRequest.electionLimitItems);
        }
    }
    function remove(key){
        
        if(electionId)
        {
            viewModel.editElectionRequest.electionLimitItems =
                viewModel.editElectionRequest.electionLimitItems.filter(w => w.id != key);
            setElectionLimitItems(viewModel.editElectionRequest.electionLimitItems);
        }
        else{
            viewModel.addElectionRequest.electionLimitItems =
                viewModel.addElectionRequest.electionLimitItems.filter(w => w.id != key);
            setElectionLimitItems(viewModel.addElectionRequest.electionLimitItems);
        }
    }
    function checkDateTimeValidation(rule: any, value: any, callback: any, propName: string) {
        
        try {
            if (persianMoment(value, 'jYYYY/jMM/jDD HH:mm:ss').isValid()) {
                if(electionId) {
                    viewModel.editElectionRequest[`${propName}`] = value;
                }
                else{
                    viewModel.addElectionRequest[`${propName}`] = value;
                }
                callback();
            } else {
                callback(i18next.t(`Elections.Validation.Message.${propName}.Valid`));
            }
        } catch (e) {
            callback(i18next.t(`Elections.Validation.Message.${propName}.Valid`));
        }
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={electionId ? `${i18next.t("Elections.Edit.HeaderText")} ${electionId}` : i18next.t("Elections.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"electionForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailElectionResponse?.title}
                                   key={"title"}
                                   label={i18next.t("Elections.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Elections.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="startDate" initialValue={viewModel?.detailElectionResponse?.startDate}
                                   key={"startDate"}
                                   label={i18next.t("Elections.Label.startDate")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Elections.Validation.Message.startDate.Required")
                                       },
                                       {
                                           validator: (rule, value, callback) =>
                                               checkDateTimeValidation(rule, value, callback, 'startDate')
                                       }
                                   ]}>
                            <MaskedInput style={{direction: "ltr"}} onChange={onMaskChanged} mask={"1111/11/11 11:11:11"}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="endDate" initialValue={viewModel?.detailElectionResponse?.endDate}
                                   key={"endDate"}
                                   label={i18next.t("Elections.Label.endDate")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Elections.Validation.Message.endDate.Required")
                                       },
                                       {
                                           validator: (rule, value, callback) =>
                                               checkDateTimeValidation(rule, value, callback, 'endDate')
                                       }
                                   ]}>
                            <MaskedInput style={{direction: "ltr"}} onChange={onMaskChanged} mask={"1111/11/11 11:11:11"}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="iplimit"
                                   key={"iplimit"}
                                   label={i18next.t("Elections.Label.iplimit")}>
                            <Switch defaultChecked={viewModel.detailElectionResponse?.iplimit} onChange={onIpLimitChanged} />
                        </Form.Item>
                    </Col>
                    {
                        (iplimit) &&
                        (<Col span={8}>
                            <Form.Item name="iplist" initialValue={viewModel?.detailElectionResponse?.iplist}
                                       key={"iplist"}
                                       label={i18next.t("Elections.Label.iplist")}
                                       rules={[
                                           {
                                               required: true,
                                               message: i18next.t("Elections.Validation.Message.iplist.Required")
                                           }
                                       ]}>
                                <Input onChange={onChanged} />
                            </Form.Item>
                        </Col>)
                    }
                </Row>
                <Row gutter={[24, 16]}>
                        {electionLimitItems.map(w => (
                            <React.Fragment>
                                <Col offset={4} span={8}>
                                    <Form.Item initialValue={w.electionCandidateTypeId}
                                        label={i18next.t("Elections.Label.electionCandidateTypeId")}
                                        name={`electionCandidateTypeId-${w.id}`}
                                        key={`electionCandidateTypeId-${w.id}`}
                                        rules={[{ required: true, message: i18next.t("Elections.Validation.Message.electionCandidateTypeId.Required") }]}
                                    >
                                        <Select defaultValue={w.electionCandidateTypeId}
                                                showSearch={true} onChange={(e) => onSelectChanged(e, "electionCandidateTypeId", w.id)}>
                                            {electionCandidateTypeOptions}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item initialValue={w.limitCount}
                                        label={i18next.t("Elections.Label.limitCount")}
                                        name={`limitCount-${w.id}`}
                                        key={`limitCount-${w.id}`}
                                        rules={[{ required: true, message: i18next.t("Elections.Validation.Message.limitCount.Required") }]}
                                    >
                                        <InputNumber onChange={(e) => onLimitCountChanged(e, w.id)} />
                                    </Form.Item>

                                </Col>
                                <Col span={1}>
                                    <Form.Item label={i18next.t("General.Button.Delete")}>
                                        <MinusCircleOutlined onClick={() => remove(w.id)} />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item label={i18next.t("Elections.Button.AddCandidate")}>
                                        {w.id > 0 &&
                                        <Link
                                            to={getAddCandidateElectionRoute(w.electionId, w.electionCandidateTypeId)}>
                                            <Button type="primary" icon={<UserAddOutlined />}
                                                    title={i18next.t("General.Button.Edit")}/>
                                        </Link>
                                        }
                                    </Form.Item>
                                </Col>
                            </React.Fragment>
                        ))}
                    <br/>
                    <Col span={2}>
                        <Form.Item label={i18next.t("Elections.Button.NewLimit")}>
                            <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                            </Button>
                        </Form.Item>
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

export default EditElection;
