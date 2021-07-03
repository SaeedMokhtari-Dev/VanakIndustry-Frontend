import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button,
    Col,
    Divider,
    Form,
    Image,
    PageHeader,
    Row,
    Spin,
    Steps, Card, message
} from "antd";
import i18next from "i18next";
import history from "../../../../app/utils/History";
import ElectionProcessStore from "../../stores/ElectionProcessStore";
import "./SelectElectionProcess.scss";
import NavigationService from "../../../../app/services/NavigationService";
import UserContext from "../../../../identity/contexts/UserContext";
import ImageConstants from "../../../../app/constants/ImageConstants";
import {
    CheckCircleOutlined, PlusCircleOutlined
} from '@ant-design/icons';

const {useEffect} = React;
const { Step } = Steps;
const { Meta } = Card;


interface SelectElectionProcessProps {
    electionProcessStore?: ElectionProcessStore;
    match?: any;
}

const SelectElectionProcess: React.FC<SelectElectionProcessProps> = inject(Stores.electionProcessStore)(observer(({electionProcessStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [electionCandidateIds, setElectionCandidateIds] = React.useState([]);

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
        electionProcessStore.onElectionProcessSelectionPageLoad();
        

        let electionIdParam = +match.params?.electionId;

        if(electionIdParam)
        {
            electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionId = electionIdParam;
            electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.userId = UserContext.info.id;

            await electionProcessStore.getElectionCandidateViewModel.getAllElectionCandidate(electionIdParam);
            await electionProcessStore.getSelectElectionCandidateViewModel.getAllSelectElectionCandidate(UserContext.info.id);
            
            if(electionProcessStore.getSelectElectionCandidateViewModel?.selectElectionCandidates && electionProcessStore.getSelectElectionCandidateViewModel.selectElectionCandidates.length > 0)
                electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds =
                    electionProcessStore.getSelectElectionCandidateViewModel.selectElectionCandidates.map(w => w.key);
            setElectionCandidateIds(electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds);

            for (let electionCandidate of electionProcessStore.getElectionCandidateViewModel.electionCandidates) {
                electionCandidate.selectedCount = +(electionCandidate.selectedCount ?? 0) + 1;
                for (const w of electionCandidate.items) {
                    await electionProcessStore.detailAttachmentViewModel.detailAllAttachment(w.candidatePictureId);
                    if(electionProcessStore.detailAttachmentViewModel?.attachment?.image) {
                        w.src = electionProcessStore.detailAttachmentViewModel.attachment.image;
                    }
                    else{
                        w.src = ImageConstants.fallbackImage;
                    }
                }
            }
        }
        else{
            NavigationService.goBack();
        }

        setDataFetched(true);
    }

    let viewModel = electionProcessStore.addSelectElectionCandidateViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        await viewModel.addAllSelectElectionCandidate(viewModel.addSelectElectionCandidatesRequest);
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        electionProcessStore.onElectionProcessSelectionPageUnload();
    }
    function onCandidateSelect(e, key, typeId){
        
        console.log(e);
        let election = electionProcessStore.getElectionCandidateViewModel.electionCandidates.find(w => w.electionCandidateTypeId === typeId);
        debugger;
        if(e.currentTarget.className == "unchecked"){
            if(election){
                if(election.limitCount <= election.selectedCount) {
                    message.error("شما حداکثر تعداد انتخاب خود را انجام داده اید.");
                    return false;
                }
                election.selectedCount = election.selectedCount + 1;
                electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds.push(key);
                e.target.className = "checked";
            }
        }
        else {
            electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds =
                electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds.filter(w => w !== key);
            election.selectedCount = election.selectedCount - 1;
            e.target.className = "unchecked";
        }
        setElectionCandidateIds(electionProcessStore.addSelectElectionCandidateViewModel.addSelectElectionCandidatesRequest.electionCandidateIds);
    }
    /*function remove(key){
        
        if(electionProcessId)
        {
            viewModel.editElectionProcessRequest.electionProcessLimitItems =
                viewModel.editElectionProcessRequest.electionProcessLimitItems.filter(w => w.id != key);
            setElectionProcessLimitItems(viewModel.editElectionProcessRequest.electionProcessLimitItems);
        }
        else{
            viewModel.addElectionProcessRequest.electionProcessLimitItems =
                viewModel.addElectionProcessRequest.electionProcessLimitItems.filter(w => w.id != key);
            setElectionProcessLimitItems(viewModel.addElectionProcessRequest.electionProcessLimitItems);
        }
    }*/
    /*async function getImage(attachmentId: number) : string {

        if(electionProcessStore.detailAttachmentViewModel?.attachment?.image){
           return  electionProcessStore.detailAttachmentViewModel.attachment.image;
        }
        else
            return "error";
    }*/
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("ElectionProcess.Select.HeaderText")}
            />
            <Steps current={1}>
                <Step title="حاضر" description="شما در جلسه حضور دارید" />
                <Step title="انتخاب کاندید" description="در حال انتخاب کاندیدای مورد نظر" />
                <Step title="تائید نهایی" description="تائید نهایی" />
                <Step title="نمایش نتایج" description="نمایش نتایج" />
            </Steps>
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"electionProcessForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    {electionProcessStore.getElectionCandidateViewModel.electionCandidates.map((item, index) => {
                        return (<React.Fragment>
                        <Divider key={"Divider-" + (index+500000)}>{item.electionCandidateTypeTitle} ----- {item.selectedCount ?? 0} کاندید را از حداکثر {+item.limitCount} انتخاب کرده اید.  </Divider>
                        {item.items?.map((candid, index) => {
                            return <Col key={"Col-" + candid.key} span={6}>
                                <Card
                                    key={"Card-" + candid.key}
                                    cover={
                                        <Image
                                            alt={candid.userFullName}
                                            src={candid.src}
                                            height={300}
                                        />
                                    }
                                    actions={[
                                        /*<CheckboxButton action={onCandidateSelect} value={electionCandidateIds?.includes(candid.key)} id={candid.key} typeId={item.electionCandidateTypeId}
                                                labelSelect="انتخاب شده" labelUnselect="انتخاب نمائید." />,*/
                                        <button type="button" key={"Button-" + candid.key} onClick={(e) =>
                                            onCandidateSelect(e, candid.key, item.electionCandidateTypeId)} className={electionCandidateIds?.includes(candid.key) ? "checked" : "unchecked"}>
                                            {electionCandidateIds?.includes(candid.key) ?
                                                <div> انتخاب شده <CheckCircleOutlined /> </div>
                                                :
                                                <div>
                                                    انتخاب نمائید
                                                    <PlusCircleOutlined />
                                                </div>
                                            }
                                        </button>
                                    ]}
                                >
                                    <Meta key={"Meta-" + candid.key}
                                        title={candid.userFullName}
                                    />
                                </Card>
                            </Col>
                        })}
                        </React.Fragment>)
                    })}
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

export default SelectElectionProcess;
