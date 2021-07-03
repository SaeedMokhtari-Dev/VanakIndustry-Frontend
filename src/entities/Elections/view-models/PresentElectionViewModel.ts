import ElectionStore from "../stores/ElectionStore";
import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import PresentElectionRequest from "../handlers/present/PresentElectionRequest";
import PresentElectionHandler from "../handlers/present/PresentElectionHandler";
import PresentElectionResponse from "../handlers/present/PresentElectionResponse";

export default class PresentElectionViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    presentElectionResponse: PresentElectionResponse = new PresentElectionResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getElectionPresent(userId: number)  {
        try {
            
            this.isProcessing = true;

            let request = new PresentElectionRequest(userId);
            let response = await PresentElectionHandler.present(request);

            if (response && response.success) {
                this.presentElectionResponse = new PresentElectionResponse();
                this.presentElectionResponse = response.data;

                return this.presentElectionResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Elections.Error.Present.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
