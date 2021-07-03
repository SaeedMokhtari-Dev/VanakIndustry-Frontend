import {makeAutoObservable} from "mobx";
import AddSelectElectionCandidateRequest from "../handlers/add/AddSelectElectionCandidateRequest";
import AddSelectElectionCandidateHandler from "../handlers/add/AddSelectElectionCandidateHandler";
import AddSelectElectionCandidateResponse from "../handlers/add/AddSelectElectionCandidateResponse";
import i18next from "i18next";
import log from "loglevel";
import {getLocalizedString} from "../../../app/utils/Localization";
import {message} from "antd";

export default class AddSelectElectionCandidateViewModel {
    isProcessing: boolean;
    errorMessage: string;
    selectElectionCandidates: AddSelectElectionCandidateResponse[];
    addSelectElectionCandidatesRequest: AddSelectElectionCandidateRequest = new AddSelectElectionCandidateRequest();

    constructor() {
        makeAutoObservable(this);
    }

    public async addAllSelectElectionCandidate(addSelectElectionCandidatesRequest: AddSelectElectionCandidateRequest) {
        try {
            this.errorMessage = "";
            this.isProcessing = true;
            let response = await AddSelectElectionCandidateHandler.add(addSelectElectionCandidatesRequest);

            if (response && response.success) {
                message.success(getLocalizedString(response.message));
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('SelectElectionCandidates.Error.Add.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
