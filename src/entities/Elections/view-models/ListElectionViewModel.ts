import ElectionStore from "../stores/ElectionStore";
import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListElectionRequest from "../handlers/list/ListElectionRequest";
import ListElectionHandler from "../handlers/list/ListElectionHandler";
import ListElectionResponse from "../handlers/list/ListElectionResponse";

export default class ListElectionViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listElectionResponse: ListElectionResponse = new ListElectionResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getElectionList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListElectionRequest();
            let response = await ListElectionHandler.get(request);

            if (response && response.success) {

                this.listElectionResponse = new ListElectionResponse();
                let result = response.data;
                //let items = result.items;
                this.listElectionResponse.items = result;

                return this.listElectionResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Elections.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
