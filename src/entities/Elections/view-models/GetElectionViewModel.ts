import ElectionItem from "../handlers/get/ElectionItem";
import AddElectionRequest from "../handlers/add/AddElectionRequest";
import ElectionStore from "../stores/ElectionStore";
import {makeAutoObservable} from "mobx";
import GetElectionRequest from "../handlers/get/GetElectionRequest";
import GetElectionHandler from "../handlers/get/GetElectionHandler";
import GetElectionResponse from "../handlers/get/GetElectionResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteElectionHandler from "../handlers/delete/DeleteElectionHandler";
import DeleteElectionRequest from "../handlers/delete/DeleteElectionRequest";
import {message} from "antd";

export default class GetElectionViewModel {
    columns: any[];
    electionList: ElectionItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addElectionRequest: AddElectionRequest = new AddElectionRequest();
    addedSuccessfully: boolean;

    constructor(public electionStore: ElectionStore) {
        makeAutoObservable(this);

    }

    public async getAllElection(getElectionsRequest: GetElectionRequest) {
        try {
            this.isProcessing = true;
            let response = await GetElectionHandler.get(getElectionsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.electionList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Elections.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteElection(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteElectionRequest();
            request.electionId = key;
            let response = await DeleteElectionHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllElection(new GetElectionRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Elections.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
