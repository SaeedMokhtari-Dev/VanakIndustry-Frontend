import ElectionCandidateTypeItem from "../handlers/get/ElectionCandidateTypeItem";
import AddElectionCandidateTypeRequest from "../handlers/add/AddElectionCandidateTypeRequest";
import ElectionCandidateTypeStore from "../stores/ElectionCandidateTypeStore";
import {makeAutoObservable} from "mobx";
import GetElectionCandidateTypeRequest from "../handlers/get/GetElectionCandidateTypeRequest";
import GetElectionCandidateTypeHandler from "../handlers/get/GetElectionCandidateTypeHandler";
import GetElectionCandidateTypeResponse from "../handlers/get/GetElectionCandidateTypeResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteElectionCandidateTypeHandler from "../handlers/delete/DeleteElectionCandidateTypeHandler";
import DeleteElectionCandidateTypeRequest from "../handlers/delete/DeleteElectionCandidateTypeRequest";
import {message} from "antd";

export default class GetElectionCandidateTypeViewModel {
    columns: any[];
    electionCandidateTypeList: ElectionCandidateTypeItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addElectionCandidateTypeRequest: AddElectionCandidateTypeRequest = new AddElectionCandidateTypeRequest();
    addedSuccessfully: boolean;

    constructor(public electionCandidateTypeStore: ElectionCandidateTypeStore) {
        makeAutoObservable(this);

    }

    public async getAllElectionCandidateType(getElectionCandidateTypesRequest: GetElectionCandidateTypeRequest) {
        try {
            this.isProcessing = true;
            let response = await GetElectionCandidateTypeHandler.get(getElectionCandidateTypesRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.electionCandidateTypeList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteElectionCandidateType(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteElectionCandidateTypeRequest();
            request.electionCandidateTypeId = key;
            let response = await DeleteElectionCandidateTypeHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllElectionCandidateType(new GetElectionCandidateTypeRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
