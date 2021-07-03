import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import Stores from "app/constants/Stores";
import CustomerStore from "../../stores/CustomerStore";
import i18next from "i18next";
import UserContext from "../../../identity/contexts/UserContext";
import {Badge, Button, Col, Descriptions, Divider, Image, Row, Spin, Table} from "antd";
import {CheckOutlined, ClockCircleOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import ImageConstants from "../../../app/constants/ImageConstants";
import {getEditElectionCandidateTypeRoute, getEditUserRoute} from "../../../app/utils/RouteHelper";

interface DashboardProps {
    customerStore?: CustomerStore
}

const CustomerDashboard: React.FC<DashboardProps> = inject(Stores.customerStore)(observer(({customerStore}) =>
{
    const [dataFetched, setDataFetched] = React.useState(false);

    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        
        customerStore.onCustomerGetPageLoad();
        await customerStore.getCustomerViewModel.getDetailUser(UserContext.info.id);

        setDataFetched(true);
    }

    let viewModel = customerStore.getCustomerViewModel;

    if (!viewModel) return;

    function onUnload() {
        customerStore.onCustomerGetPageUnload();
    }

    return (
        <div>
        {dataFetched ?
            <div>
                <h3>
                    {i18next.t("Dashboard.Customer.Title")}
                    <Link to={getEditUserRoute(UserContext.info.id)}>
                        <Button type="primary" icon={<EditOutlined/>}
                                title={i18next.t("General.Button.Edit")}/>
                    </Link>
                </h3>
                <Divider>{i18next.t("Users.Section.CertificateInformation")}</Divider>
                <Row>
                    <Col span={4}>
                        <Image style={{maxHeight: "200px"}} src={viewModel.detailUserResponse.pictureImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Col>
                    <Col span={20}>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.firstName")}>{viewModel.detailUserResponse.firstName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.lastName")}>{viewModel.detailUserResponse.lastName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.nickName")}>{viewModel.detailUserResponse.nickName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.nationalId")}>{viewModel.detailUserResponse.nationalId}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.certificateId")}>{viewModel.detailUserResponse.certificateId}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.fatherName")}>{viewModel.detailUserResponse.fatherName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.motherName")}>{viewModel.detailUserResponse.motherName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.birthDate")}>{viewModel.detailUserResponse.birthDate}</Descriptions.Item>
                    {/*<Descriptions.Item label={i18next.t("CustomerDashboard.TotalCustomerBalance")}>{viewModel?.totalCustomerBalance?.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("CustomerDashboard.TotalBranchBalance")}>{viewModel?.totalBranchBalance?.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("CustomerDashboard.TotalCarBalance")}>{viewModel?.totalCarBalance?.toLocaleString()}</Descriptions.Item>*/}
                </Descriptions>
                    </Col>
                </Row>
                <Divider>{i18next.t("Users.Section.AddressInformation")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.phoneNumber")}>{viewModel.detailUserResponse.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.mobile")}>{viewModel.detailUserResponse.mobile}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.postalCode")}>{viewModel.detailUserResponse.postalCode}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.address")}>{viewModel.detailUserResponse.address}</Descriptions.Item>
                </Descriptions>
                <Divider>{i18next.t("Users.Section.MembershipInformation")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.barcode")}>{viewModel.detailUserResponse.barcode ?? " "}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.cardImage")}>
                        <Image width={100} height={100} src={viewModel.detailUserResponse.cardImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Descriptions.Item>
                </Descriptions>
                <Divider>{i18next.t("Users.Section.MarriedInformation")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.married")}>{viewModel.detailUserResponse.married ? "متاهل" : "مجرد"}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.secondPageCertificateImage")}>
                        <Image width={100} height={100} src={viewModel.detailUserResponse.secondPageCertificateImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Descriptions.Item>
                </Descriptions>
                <Divider>{i18next.t("Users.Section.EducationInformation")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.qualification")}>{i18next.t("General.Qualification." + viewModel.detailUserResponse.qualification)}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.fieldOfStudy")}>{viewModel.detailUserResponse.fieldOfStudy}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.skillDescription")}>{viewModel.detailUserResponse.skillDescription}</Descriptions.Item>
                </Descriptions>
                <Divider>{i18next.t("Users.Section.Uploads")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.nationalCardImage")}>
                        <Image width={100} height={100} src={viewModel.detailUserResponse.nationalCardImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.firstPageCertificateImage")}>
                        <Image width={100} height={100} src={viewModel.detailUserResponse.firstPageCertificateImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Descriptions.Item>
                </Descriptions>
                {viewModel.detailUserResponse.candidatePictureImage &&
                    <React.Fragment>
                <Divider>{i18next.t("Users.Section.CandidateInformation")}</Divider>
                    <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.candidatePictureImage")}>
                    <Image width={100} height={100} src={viewModel.detailUserResponse.candidatePictureImage} fallback={ImageConstants.fallbackImage}></Image>
                    </Descriptions.Item>
                    </Descriptions>
                    </React.Fragment>
                }
                <Divider>{i18next.t("Users.Section.Description")}</Divider>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.moreDescription")}>{viewModel.detailUserResponse.moreDescription}</Descriptions.Item>
                </Descriptions>

            </div>
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

export default CustomerDashboard;
