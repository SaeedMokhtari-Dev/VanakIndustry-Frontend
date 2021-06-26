import ElectionCandidateTypeStore from "../stores/ElectionCandidateTypeStore";
import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListElectionCandidateTypeRequest from "../handlers/list/ListElectionCandidateTypeRequest";
import ListElectionCandidateTypeHandler from "../handlers/list/ListElectionCandidateTypeHandler";
import ListElectionCandidateTypeResponse from "../handlers/list/ListElectionCandidateTypeResponse";

export default class ListElectionCandidateTypeViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listElectionCandidateTypeResponse: ListElectionCandidateTypeResponse = new ListElectionCandidateTypeResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getElectionCandidateTypeList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListElectionCandidateTypeRequest();
            let response = await ListElectionCandidateTypeHandler.get(request);

            if (response && response.success) {

                this.listElectionCandidateTypeResponse = new ListElectionCandidateTypeResponse();
                let result = response.data;
                //let items = result.items;
                this.listElectionCandidateTypeResponse.items = result;

                return this.listElectionCandidateTypeResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
