import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch
} from "antd";
import i18next from "i18next";
import DetailElectionCandidateTypeResponse from "../../handlers/detail/DetailElectionCandidateTypeResponse";
import AddElectionCandidateTypeRequest from "../../handlers/add/AddElectionCandidateTypeRequest";
import {
    PlusOutlined
} from '@ant-design/icons';
import history from "../../../../app/utils/History";
import moment from 'moment';
import ElectionCandidateTypeStore from "../../stores/ElectionCandidateTypeStore";
import "./EditElectionCandidateType.scss";
import persianMoment from "jalali-moment";
import Qualifications from "../../../../app/constants/Qualifications";
import GlobalRegex from "../../../../app/constants/GlobalRegex";
import MaskedInput from "antd-mask-input";
import {PasswordInput} from "antd-password-input-strength";
import {findAllInRenderedTree} from "react-dom/test-utils";
import ImageConstants from "../../../../app/constants/ImageConstants";
const {useEffect} = React;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface EditElectionCandidateTypeProps {
    electionCandidateTypeStore?: ElectionCandidateTypeStore;
    match?: any;
}

const EditElectionCandidateType: React.FC<EditElectionCandidateTypeProps> = inject(Stores.electionCandidateTypeStore)(observer(({electionCandidateTypeStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [electionCandidateTypeId, setElectionCandidateTypeId] = React.useState(0);

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
        electionCandidateTypeStore.onElectionCandidateTypeEditPageLoad();

        let electionCandidateTypeIdParam = +match.params?.electionCandidateTypeId;

        setElectionCandidateTypeId(electionCandidateTypeIdParam);

        if(electionCandidateTypeIdParam)
        {
            await electionCandidateTypeStore.editElectionCandidateTypeViewModel.getDetailElectionCandidateType(electionCandidateTypeIdParam);
            electionCandidateTypeStore.editElectionCandidateTypeViewModel.editElectionCandidateTypeRequest.electionCandidateTypeId = electionCandidateTypeIdParam;
        }
        else{
            electionCandidateTypeStore.editElectionCandidateTypeViewModel.addElectionCandidateTypeRequest = new AddElectionCandidateTypeRequest();
            electionCandidateTypeStore.editElectionCandidateTypeViewModel.detailElectionCandidateTypeResponse = new DetailElectionCandidateTypeResponse();
        }

        setDataFetched(true);
    }

    let viewModel = electionCandidateTypeStore.editElectionCandidateTypeViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(electionCandidateTypeId)
        {
            await viewModel.editElectionCandidateType(viewModel.editElectionCandidateTypeRequest);
        }
        else
        {
            await viewModel.addElectionCandidateType(viewModel.addElectionCandidateTypeRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        electionCandidateTypeStore.onElectionCandidateTypeEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(electionCandidateTypeId)
            viewModel.editElectionCandidateTypeRequest[`${propName}`] = e;
        else
            viewModel.addElectionCandidateTypeRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(electionCandidateTypeId)
            viewModel.editElectionCandidateTypeRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addElectionCandidateTypeRequest[`${e.target.id}`] = e.target.value;
    }

    function onMaskChanged(e) {
        if(electionCandidateTypeId)
            viewModel.editElectionCandidateTypeRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addElectionCandidateTypeRequest[`${e.target.id}`] = e.target.value;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={electionCandidateTypeId ? `${i18next.t("ElectionCandidateTypes.Edit.HeaderText")} ${electionCandidateTypeId}` : i18next.t("ElectionCandidateTypes.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"electionCandidateTypeForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailElectionCandidateTypeResponse?.title}
                                   key={"title"}
                                   label={i18next.t("ElectionCandidateTypes.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("ElectionCandidateTypes.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
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

export default EditElectionCandidateType;
