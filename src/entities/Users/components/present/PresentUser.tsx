import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin
} from "antd";
import i18next from "i18next";
import UserStore from "../../stores/UserStore";
import "./PresentUser.scss";
const {useEffect} = React;

interface EditUserProps {
    userStore?: UserStore;
    match?: any;
}

const PresentUser: React.FC<EditUserProps> = inject(Stores.userStore)(observer(({userStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);

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
        userStore.onUserEditPageLoad();

        let electionId = +match.params?.electionId;

        userStore.editUserViewModel.presentUserRequest.electionId = electionId;

        setDataFetched(true);
    }

    let viewModel = userStore.editUserViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        setDataFetched(false);
        await viewModel.presentUser(viewModel.presentUserRequest);
        if(!viewModel.errorMessage)
        {
            viewModel.presentUserRequest.barcode = "";
            form.resetFields(['barcode']);
        }
        setDataFetched(true);
        //history.goBack();
    }

    function onUnload() {
        userStore.onUserEditPageUnload();
    }
    /*function onSelectChanged(e, propName){

        if(userId)
            viewModel.editUserRequest[`${propName}`] = e;
        else
            viewModel.addUserRequest[`${propName}`] = e;
    }*/
    function onChanged(e){
        viewModel.presentUserRequest[`${e.target.id}`] = e.target.value;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Users.Present.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"userForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Divider>{i18next.t("Users.Section.Barcode")}</Divider>
                    <Col offset={8} span={8}>
                        <Form.Item name="barcode" initialValue={viewModel.presentUserRequest.barcode}
                                   key={"barcode"}
                                   label={i18next.t("Users.Label.barcode")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.barcode.Required")
                                       }
                                   ]}>
                            <Input allowClear onChange={onChanged} value={viewModel.presentUserRequest.barcode}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider></Divider>
                {viewModel.errorMessage && (
                    <div className='response-error-msg'>{viewModel.errorMessage}</div>
                )}
                    <PageHeader
                        ghost={false}
                        style={{textAlign: "center"}}
                        extra={[
                            <Button type="primary" loading={viewModel.isProcessing} key="submit" size={"large"} htmlType="submit">
                                {i18next.t("General.Add.SaveAndContinueButton")}
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

export default PresentUser;
