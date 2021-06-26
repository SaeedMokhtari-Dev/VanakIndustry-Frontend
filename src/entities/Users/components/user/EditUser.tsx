import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch
} from "antd";
import i18next from "i18next";
import DetailUserResponse from "../../handlers/detail/DetailUserResponse";
import AddUserRequest from "../../handlers/add/AddUserRequest";
import {
    PlusOutlined
} from '@ant-design/icons';
import history from "../../../../app/utils/History";
import moment from 'moment';
import UserStore from "../../stores/UserStore";
import "./EditUser.scss";
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

interface EditUserProps {
    userStore?: UserStore;
    match?: any;
}

const EditUser: React.FC<EditUserProps> = inject(Stores.userStore)(observer(({userStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [userId, setUserId] = React.useState(0);
    const [married, setMarried] = React.useState(false);
    const [qualificationsOptions, setQualificationOptions] = React.useState([]);

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

        let userIdParam = +match.params?.userId;

        setUserId(userIdParam);

        if(userIdParam)
        {
            await userStore.editUserViewModel.getDetailUser(userIdParam);
            setMarried(userStore.editUserViewModel.detailUserResponse.married);
            userStore.editUserViewModel.editUserRequest.userId = userIdParam;
        }
        else{
            userStore.editUserViewModel.addUserRequest = new AddUserRequest();
            userStore.editUserViewModel.detailUserResponse = new DetailUserResponse();
        }

        let qualificationsOptions = [];
        for (let item of Qualifications) {
            qualificationsOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setQualificationOptions(qualificationsOptions);

        setDataFetched(true);
    }

    let viewModel = userStore.editUserViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(userId)
        {
            await viewModel.editUser(viewModel.editUserRequest);
        }
        else
        {
            await viewModel.addUser(viewModel.addUserRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        userStore.onUserEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(userId)
            viewModel.editUserRequest[`${propName}`] = e;
        else
            viewModel.addUserRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(userId)
            viewModel.editUserRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addUserRequest[`${e.target.id}`] = e.target.value;
    }

    function onMaskChanged(e) {
        if(userId)
            viewModel.editUserRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addUserRequest[`${e.target.id}`] = e.target.value;
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function beforeUpload(file, propName) : Promise<boolean> {
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
        let imageUrl = await toBase64(file);
        viewModel.detailUserResponse[`${propName}`] = imageUrl;
        if(userId)
        {
            viewModel.editUserRequest[`${propName}`] = imageUrl;
            viewModel.editUserRequest[`${propName}Changed`] = true;
        }
        else{
            viewModel.addUserRequest[`${propName}`] = imageUrl;
        }
        viewModel.uploadLoading = false;
        return true;
    }
    function reloadImages(image){
        debugger;
        viewModel.detailUserResponse.cardImage = image;
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
        debugger;
        if(userId)
        {
            viewModel.editUserRequest.married = e;
            setMarried(e);
        }
        else{
            viewModel.addUserRequest.married = e;
            setMarried(e);
        }
    }
    function checkDateValidation(rule: any, value: any, callback: any) {
        try {
            if (persianMoment(value, 'jYYYY/jMM/jDD').isValid()) {
                callback();
                if (userId) {
                    viewModel.editUserRequest.birthDate = value;
                } else {
                    viewModel.addUserRequest.birthDate = value;
                }
            } else {
                callback(i18next.t("Users.Validation.Message.birthDate.Valid"));
            }
        } catch (e) {
            callback(i18next.t("Users.Validation.Message.birthDate.Valid"));
        }
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={userId ? `${i18next.t("Users.Edit.HeaderText")} ${userId}` : i18next.t("Users.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"userForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Divider>{i18next.t("Users.Section.CertificateInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="firstName" initialValue={viewModel?.detailUserResponse?.firstName}
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
                        <Form.Item name="lastName" initialValue={viewModel?.detailUserResponse?.lastName}
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
                        <Form.Item name="nickName" initialValue={viewModel?.detailUserResponse?.nickName}
                                   key={"nickName"}
                                   label={i18next.t("Users.Label.nickName")}
                        >
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="fatherName" initialValue={viewModel?.detailUserResponse?.fatherName}
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
                        <Form.Item name="motherName" initialValue={viewModel?.detailUserResponse?.motherName}
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
                        <Form.Item name="nationalId" initialValue={viewModel?.detailUserResponse?.nationalId}
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
                        <Form.Item name="certificateId" initialValue={viewModel?.detailUserResponse?.certificateId}
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
                        <Form.Item name="birthDate" initialValue={viewModel?.detailUserResponse?.birthDate}
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
                    <Divider>{i18next.t("Users.Section.MembershipInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="barcode" initialValue={viewModel?.detailUserResponse?.barcode}
                                   key={"barcode"}
                                   label={i18next.t("Users.Label.barcode")}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                        {/*<Col span={8}>
                            <Form.Item name="cardImage" initialValue={viewModel?.detailUserResponse?.cardImage}
                                       key={"cardImage"}
                                       label={i18next.t("Users.Label.cardImage")}>
                                <Upload
                                    key={"cardImage"}
                                    className={"avatar-uploader"}
                                    maxCount={1}
                                    beforeUpload={(file) => beforeUpload(file, "cardImage")}
                                    customRequest={customRequest}
                                    showUploadList={false}
                                >
                                    {viewModel?.detailUserResponse?.cardImage ? (
                                        <div>
                                            <img src={viewModel?.detailUserResponse?.cardImage}
                                                 alt="cardImage"
                                                 style={{width: '100%', height: '150px'}}/>
                                            <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                        </div>
                                    ) : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>*/}
                    </Col>
                    <Divider>{i18next.t("Users.Section.AddressInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="phoneNumber" initialValue={viewModel?.detailUserResponse?.phoneNumber}
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
                        <Form.Item name="mobile" initialValue={viewModel?.detailUserResponse?.mobile}
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
                        <Form.Item name="address" initialValue={viewModel?.detailUserResponse?.address}
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
                        <Form.Item name="postalCode" initialValue={viewModel?.detailUserResponse?.postalCode}
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
                        <Form.Item name="username" initialValue={viewModel?.detailUserResponse?.username}
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
                    {!userId &&
                        <React.Fragment>
                            <Col>
                                <Form.Item name="password"
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
                                <Form.Item name="confirmPassword"
                                label={i18next.t("Users.Label.confirmPassword")} required={false}
                                dependencies={['password']}
                                rules={[
                            {
                                required: true,
                                message: i18next.t("Users.Validation.Message.confirmPassword.Required")
                            },
                                ({getFieldValue}) => ({
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
                        </React.Fragment>
                    }
                    <Col span={8}>
                        <Form.Item name="email" initialValue={viewModel?.detailUserResponse?.email}
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
                            <Switch defaultChecked={viewModel.detailUserResponse?.married} checkedChildren="متاهل" unCheckedChildren="مجرد" onChange={onMarriedChanged} />
                        </Form.Item>
                    </Col>
                    {married &&
                    (
                        <Col span={8}>
                        <Form.Item name="secondPageCertificateImage" initialValue={viewModel?.detailUserResponse?.secondPageCertificateImage}
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
                                beforeUpload={async (file) => {await beforeUpload(file, "secondPageCertificateImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.secondPageCertificateImage ? (
                                    <div>
                                        <Image src={viewModel?.detailUserResponse?.secondPageCertificateImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="secondPageCertificateImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    )
                    }
                    <Divider>{i18next.t("Users.Section.EducationInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="qualification" initialValue={viewModel?.detailUserResponse?.qualification}
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
                        <Form.Item name="fieldOfStudy" initialValue={viewModel?.detailUserResponse?.fieldOfStudy}
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
                        <Form.Item name="skillDescription" initialValue={viewModel?.detailUserResponse?.skillDescription}
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
                        <Form.Item name="cardImage" initialValue={viewModel?.detailUserResponse?.cardImage}
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
                                beforeUpload={async (file) =>{await beforeUpload(file, "cardImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.cardImage ? (
                                    <div>
                                        <Image src={viewModel.detailUserResponse.cardImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="cardImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="pictureImage" initialValue={viewModel?.detailUserResponse?.pictureImage}
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
                                beforeUpload={async (file) => {await beforeUpload(file, "pictureImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.pictureImage ? (
                                    <div>
                                        <Image src={viewModel?.detailUserResponse?.pictureImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="pictureImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="nationalCardImage" initialValue={viewModel?.detailUserResponse?.nationalCardImage}
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
                                beforeUpload={async (file) => {await beforeUpload(file, "nationalCardImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.nationalCardImage ? (
                                    <div>
                                        <Image src={viewModel?.detailUserResponse?.nationalCardImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="nationalCardImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="firstPageCertificateImage" initialValue={viewModel?.detailUserResponse?.firstPageCertificateImage}
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
                                beforeUpload={async (file) => {await beforeUpload(file, "firstPageCertificateImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.firstPageCertificateImage ? (
                                    <div>
                                        <Image src={viewModel?.detailUserResponse?.firstPageCertificateImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="firstPageCertificateImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("Users.Section.CandidateInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="candidatePictureImage" initialValue={viewModel?.detailUserResponse?.candidatePictureImage}
                                   key={"candidatePictureImage"}
                                   label={i18next.t("Users.Label.candidatePictureImage")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.candidatePictureImage.Required")
                                       }
                                   ]}>
                            <Upload
                                key={"candidatePictureImage"}
                                className={"avatar-uploader"}
                                maxCount={1}
                                beforeUpload={async (file) => {await beforeUpload(file, "candidatePictureImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailUserResponse?.candidatePictureImage ? (
                                    <div>
                                        <Image src={viewModel?.detailUserResponse?.candidatePictureImage}
                                               fallback={ImageConstants.fallbackImage}
                                             alt="candidatePictureImage"
                                             style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("Users.Section.Description")}</Divider>
                    <Col span={8}>
                        <Form.Item name="moreDescription" initialValue={viewModel?.detailUserResponse?.moreDescription}
                                   key={"moreDescription"}
                                   label={i18next.t("Users.Label.moreDescription")}>
                            <Input.TextArea onChange={onChanged}/>
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

export default EditUser;
