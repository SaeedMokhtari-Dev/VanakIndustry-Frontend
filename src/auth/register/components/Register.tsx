import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import {inject, observer} from "mobx-react";
import AuthStore from "auth/stores/AuthStore";
import "auth/register/components/Register.scss";
import {Button, Col, Divider, Form, Input, message, Row, Select, Spin, Switch, Upload} from "antd";
import i18next from "i18next";
import {withTranslation} from "react-i18next";
import {PlusOutlined} from '@ant-design/icons';
import RegisterRequest from "../handlers/register/RegisterRequest";
import MaskedInput from "antd-mask-input";
import {PasswordInput} from "antd-password-input-strength";
import Qualifications from "../../../app/constants/Qualifications";
import persianMoment from 'jalali-moment';
import GlobalRegex from "../../../app/constants/GlobalRegex";
import Routes from "../../../app/constants/Routes";
import NavigationService from "../../../app/services/NavigationService";
import Stores from 'app/constants/Stores';


const { Option } = Select;

interface RegisterProps {
    authStore?: AuthStore
}

const Register: React.FC<RegisterProps> = inject(Stores.authStore)(observer(({authStore}) =>
{
    const [married, setMarried] = React.useState(false);
    const [dateBirthDateValid, setDateBirthDateValid] = React.useState(true);

    const [qualificationsOptions, setQualificationOptions] = React.useState([]);
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 22 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 22 },
        },
    };
    useEffect(() =>
    {
        onLoad();
        return onUnload;
    }, []);

    function onLoad()
    {
        /*document.body.classList.add('auth-page');*/
        authStore.onRegisterPageLoad();
        let qualificationsOptions = [];
        for (let item of Qualifications) {
            qualificationsOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setQualificationOptions(qualificationsOptions);
    }

    function onUnload()
    {
        authStore.onRegisterPageUnload();
        /*document.body.classList.remove('auth-page');*/
    }

    let viewModel = authStore.registerViewModel;

    if(!viewModel) return null;

    async function onFinish()
    {
        viewModel.errorMessage = null;
        await viewModel.register(viewModel.request);
        if(!viewModel.errorMessage)
            NavigationService.navigate(Routes.auth);
    }

    function onSelectChanged(e, propName){
        viewModel.request[`${propName}`] = e;
    }
    function onMaskChanged(e){
        viewModel.request[`${e.target.id}`] = e.target.value.replace(/\s+/g, '');
    }

    function onChanged(e){
        viewModel.request[`${e.target.id}`] = e.target.value;
    }
    function resetEveryThing(){
        viewModel.request = new RegisterRequest();
        form.resetFields();
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file, propName) {
        viewModel.uploadLoading = true;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            viewModel.uploadLoading = false;
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            viewModel.uploadLoading = false;
            return false;
        }
        getBase64(file, imageUrl => {

            viewModel.uploadLoading = false;
            viewModel.request[`${propName}`] = imageUrl;
        });
        return true;
    }
    const uploadButton = (
        /*<div>
        {!viewModel?.detailCompanyResponse?.companyCommercialPhoto &&
            (*/
        <div className={"btn-uploader"}>
            {viewModel.uploadLoading ? <Spin /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        /*  )
      }
      </div>*/
    );
    function customRequest(){

        return true;
    }
    function onMarriedChanged(e){
        viewModel.request.married = e;
        setMarried(e);
    }
    function checkDateValidation(rule: any, value: any, callback: any) {
        debugger;
    try {
        if (persianMoment(value, 'jYYYY/jMM/jDD').isValid()) {
            callback();
            viewModel.request.birthDate = value;
        } else {
            callback(i18next.t("Users.Validation.Message.birthDate.Valid"));
        }
    } catch (e) {
        callback(i18next.t("Users.Validation.Message.birthDate.Valid"));
    }
}
    return (
        <div>
            <div>
                <img src="/images/vanak-industry-logo.png" alt="logo" className="logo"/>
            </div>
                <div className={"registerContent"}>
                    <div>
                        <Form className={"form-class"} {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}>
                            <Row>
                                <Divider>{i18next.t("Users.Section.CertificateInformation")}</Divider>
                            <Col span={8}>
                                <Form.Item name="firstName" initialValue={viewModel?.request?.firstName}
                                           key={"firstName"}
                                           label={i18next.t("Users.Label.firstName")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.firstName.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="lastName" initialValue={viewModel?.request?.lastName}
                                           key={"lastName"}
                                           label={i18next.t("Users.Label.lastName")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.lastName.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="nickName" initialValue={viewModel?.request?.nickName}
                                           key={"nickName"}
                                           label={i18next.t("Users.Label.nickName")}
                                >
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="fatherName" initialValue={viewModel?.request?.fatherName}
                                           key={"fatherName"}
                                           label={i18next.t("Users.Label.fatherName")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.fatherName.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="motherName" initialValue={viewModel?.request?.motherName}
                                           key={"motherName"}
                                           label={i18next.t("Users.Label.motherName")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.motherName.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="nationalId" initialValue={viewModel?.request?.nationalId}
                                           key={"nationalId"}
                                           label={i18next.t("Users.Label.nationalId")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.nationalId.Required")
                                               },
                                               {
                                                   pattern: GlobalRegex.persianNationalId,
                                                   message: i18next.t("Users.Validation.Message.nationalId.Valid"),
                                               }
                                           ]}>
                                    <Input onChange={onChanged} maxLength={11}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="certificateId" initialValue={viewModel?.request?.certificateId}
                                           key={"certificateId"}
                                           label={i18next.t("Users.Label.certificateId")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.certificateId.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged} maxLength={11}/>
                                </Form.Item>
                            </Col>

                                <Col span={8}>
                                    <Form.Item name="birthDate" initialValue={viewModel?.request?.birthDate}
                                               key={"birthDate"}
                                               label={i18next.t("Users.Label.birthDate")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.birthDate.Required")
                                                   },
                                                   {
                                                       validator: checkDateValidation
                                                   }

                                               ]}>
                                        {/*<Input onChange={onChanged}/>*/}
                                        <MaskedInput className={"phone-number"} mask="1111/11/11" onChange={onMaskChanged}/>
                                    </Form.Item>
                                </Col>
                                <Divider>{i18next.t("Users.Section.AddressInformation")}</Divider>
                            <Col span={8}>
                                <Form.Item name="phoneNumber" initialValue={viewModel?.request?.phoneNumber}
                                           key={"phoneNumber"}
                                           label={i18next.t("Users.Label.phoneNumber")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.phoneNumber.Required")
                                               }
                                           ]}>
                                    <Input onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="mobile" initialValue={viewModel?.request?.mobile}
                                           key={"mobile"}
                                           label={i18next.t("Users.Label.mobile")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.mobile.Required")
                                               }
                                           ]}>
                                    {/*<Input onChange={onChanged}/>*/}
                                    <MaskedInput className={"phone-number"} mask="+98 911 111 1111" onChange={onMaskChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="address" initialValue={viewModel?.request?.address}
                                           key={"address"}
                                           label={i18next.t("Users.Label.address")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.address.Required")
                                               }
                                           ]}>
                                    <Input.TextArea onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="postalCode" initialValue={viewModel?.request?.postalCode}
                                           key={"postalCode"}
                                           label={i18next.t("Users.Label.postalCode")}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.postalCode.Required")
                                               }
                                           ]}>
                                    <MaskedInput className={"phone-number"} mask="1111111111" onChange={onMaskChanged}/>
                                </Form.Item>
                            </Col>
                                <Divider>{i18next.t("Users.Section.AuthenticationInformation")}</Divider>
                                <Col span={8}>
                                    <Form.Item name="username" initialValue={viewModel?.request?.username}
                                               key={"username"}
                                               label={i18next.t("Users.Label.username")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.username.Required")
                                                   },
                                                   {
                                                       pattern: GlobalRegex.onlyEnglishCharacterAndNumbers,
                                                       message: i18next.t("Users.Validation.Message.username.Valid"),
                                                   }
                                               ]}>
                                        <Input onChange={onChanged} style={{direction: "ltr"}}/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item initialValue={viewModel?.request?.password} name="password"
                                               label={i18next.t("Users.Label.password")} required={false}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.password.Required")
                                                   },
                                                   {
                                                       pattern: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g,
                                                       message: i18next.t("Users.Validation.Message.password.Valid"),
                                                   }
                                               ]}>
                                        <PasswordInput onChange={onChanged}/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item initialValue={viewModel?.request?.confirmPassword} name="confirmPassword"
                                               label={i18next.t("Users.Label.confirmPassword")} required={false}
                                               dependencies={['password']}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.confirmPassword.Required")
                                                   },
                                                   ({ getFieldValue }) => ({
                                                       validator(_, value) {
                                                           if (!value || getFieldValue('password') === value) {
                                                               return Promise.resolve();
                                                           }
                                                           return Promise.reject(new Error(i18next.t("Users.Validation.Message.confirmPassword.Valid")));
                                                       },
                                                   }),
                                               ]}>
                                        <PasswordInput onChange={onChanged}/>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item name="email" initialValue={viewModel?.request?.email}
                                               key={"email"}
                                               label={i18next.t("Users.Label.email")}
                                               rules={[
                                                   {
                                                       type:"email",
                                                       message: i18next.t("General.Email.Valid")
                                                   },
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.email.Required")
                                                   }
                                               ]}>
                                        <Input type={"email"} onChange={onChanged} style={{direction: "ltr"}}/>
                                    </Form.Item>
                                </Col>
                                <Divider>{i18next.t("Users.Section.MarriedInformation")}</Divider>
                                <Col span={8}>
                                    <Form.Item name="married"
                                               key={"married"}
                                               label={i18next.t("Users.Label.married")}>
                                        <Switch checkedChildren="متاهل" unCheckedChildren="مجرد" onChange={onMarriedChanged} />
                                    </Form.Item>
                                </Col>
                                {married &&
                                    <Col span={8}>
                                        <Form.Item name="secondPageCertificateImage" initialValue={viewModel?.request?.secondPageCertificateImage}
                                                   key={"secondPageCertificateImage"}
                                                   label={i18next.t("Users.Label.secondPageCertificateImage")}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: i18next.t("Users.Validation.Message.secondPageCertificateImage.Required")
                                                       }
                                                   ]}>
                                        <Upload
                                            key={"secondPageCertificateImage"}
                                            className={"avatar-uploader"}
                                            maxCount={1}
                                            beforeUpload={(file) => beforeUpload(file, "secondPageCertificateImage")}
                                            customRequest={customRequest}
                                            showUploadList={false}
                                        >
                                            {viewModel?.request?.secondPageCertificateImage ? (
                                                <div>
                                                    <img src={viewModel?.request?.secondPageCertificateImage}
                                                         alt="secondPageCertificateImage"
                                                         style={{width: '100%', height: '150px'}}/>
                                                    <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                                </div>
                                            ) : uploadButton}
                                        </Upload>
                                        </Form.Item>
                                    </Col>
                                }
                                <Divider>{i18next.t("Users.Section.EducationInformation")}</Divider>
                                <Col span={8}>
                                    <Form.Item name="qualification" initialValue={viewModel?.request?.qualification}
                                               key={"qualification"}
                                               label={i18next.t("Users.Label.qualification")}
                                               /*rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.qualification.Required")
                                                   }
                                               ]}*/>
                                        <Select showSearch={true} onChange={(e) => onSelectChanged(e, "qualification")} >
                                            {qualificationsOptions}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item name="fieldOfStudy" initialValue={viewModel?.request?.fieldOfStudy}
                                               key={"fieldOfStudy"}
                                               label={i18next.t("Users.Label.fieldOfStudy")}
                                               /*rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.fieldOfStudy.Required")
                                                   }
                                               ]}*/>
                                        <Input onChange={onChanged}/>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item name="skillDescription" initialValue={viewModel?.request?.skillDescription}
                                               key={"skillDescription"}
                                               label={i18next.t("Users.Label.skillDescription")}
                                               /*rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.skillDescription.Required")
                                                   }
                                               ]}*/>
                                        <Input.TextArea onChange={onChanged}/>
                                    </Form.Item>
                                </Col>
                                <Divider>{i18next.t("Users.Section.Uploads")}</Divider>
                                <Col span={8}>
                                    <Form.Item name="cardImage" initialValue={viewModel?.request?.cardImage}
                                               key={"cardImage"}
                                               label={i18next.t("Users.Label.cardImage")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.cardImage.Required")
                                                   }
                                               ]}>
                                    <Upload
                                        key={"cardImage"}
                                        className={"avatar-uploader"}
                                        maxCount={1}
                                        beforeUpload={(file) => beforeUpload(file, "cardImage")}
                                        customRequest={customRequest}
                                        showUploadList={false}
                                    >
                                        {viewModel?.request?.cardImage ? (
                                            <div>
                                                <img src={viewModel?.request?.cardImage}
                                                     alt="cardImage"
                                                     style={{width: '100%', height: '150px'}}/>
                                                <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                            </div>
                                        ) : uploadButton}
                                    </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="pictureImage" initialValue={viewModel?.request?.pictureImage}
                                               key={"pictureImage"}
                                               label={i18next.t("Users.Label.pictureImage")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.pictureImage.Required")
                                                   }
                                               ]}>
                                    <Upload
                                        key={"pictureImage"}
                                        className={"avatar-uploader"}
                                        maxCount={1}
                                        beforeUpload={(file) => beforeUpload(file, "pictureImage")}
                                        customRequest={customRequest}
                                        showUploadList={false}
                                    >
                                        {viewModel?.request?.pictureImage ? (
                                            <div>
                                                <img src={viewModel?.request?.pictureImage}
                                                     alt="pictureImage"
                                                     style={{width: '100%', height: '150px'}}/>
                                                <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                            </div>
                                        ) : uploadButton}
                                    </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="nationalCardImage" initialValue={viewModel?.request?.nationalCardImage}
                                               key={"nationalCardImage"}
                                               label={i18next.t("Users.Label.nationalCardImage")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.nationalCardImage.Required")
                                                   }
                                               ]}>
                                    <Upload
                                        key={"nationalCardImage"}
                                        className={"avatar-uploader"}
                                        maxCount={1}
                                        beforeUpload={(file) => beforeUpload(file, "nationalCardImage")}
                                        customRequest={customRequest}
                                        showUploadList={false}
                                    >
                                        {viewModel?.request?.nationalCardImage ? (
                                            <div>
                                                <img src={viewModel?.request?.nationalCardImage}
                                                     alt="nationalCardImage"
                                                     style={{width: '100%', height: '150px'}}/>
                                                <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                            </div>
                                        ) : uploadButton}
                                    </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="firstPageCertificateImage" initialValue={viewModel?.request?.firstPageCertificateImage}
                                               key={"firstPageCertificateImage"}
                                               label={i18next.t("Users.Label.firstPageCertificateImage")}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: i18next.t("Users.Validation.Message.firstPageCertificateImage.Required")
                                                   }
                                               ]}>
                                    <Upload
                                        key={"firstPageCertificateImage"}
                                        className={"avatar-uploader"}
                                        maxCount={1}
                                        beforeUpload={(file) => beforeUpload(file, "firstPageCertificateImage")}
                                        customRequest={customRequest}
                                        showUploadList={false}
                                    >
                                        {viewModel?.request?.firstPageCertificateImage ? (
                                            <div>
                                                <img src={viewModel?.request?.firstPageCertificateImage}
                                                     alt="firstPageCertificateImage"
                                                     style={{width: '100%', height: '150px'}}/>
                                                <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                            </div>
                                        ) : uploadButton}
                                    </Upload>
                                    </Form.Item>
                                </Col>
                                <Divider>{i18next.t("Users.Section.Description")}</Divider>
                                <Col span={8}>
                                    <Form.Item name="moreDescription" initialValue={viewModel?.request?.moreDescription}
                                               key={"moreDescription"}
                                               label={i18next.t("Users.Label.moreDescription")}>
                                        <Input.TextArea onChange={onChanged}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {viewModel.errorMessage && (
                                <div className='response-error-msg'>{viewModel.errorMessage}</div>
                            )}
                            <Button type="primary" className={"button"} loading={viewModel.isProcessing} htmlType="submit">
                                {i18next.t("Users.Button.Register")}
                            </Button>
                            <Link to={Routes.auth}>
                                <Button type="primary" danger className={"button"} loading={viewModel.isProcessing} htmlType="reset">
                                    {i18next.t("Users.Button.Cancel")}
                                </Button>
                            </Link>
                        </Form>
                    </div>
                </div>
        </div>
    );
}));

export default withTranslation()(Register);
