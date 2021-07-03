import {makeAutoObservable} from "mobx";
import GetSelectElectionCandidateRequest from "../handlers/get/GetSelectElectionCandidateRequest";
import GetSelectElectionCandidateHandler from "../handlers/get/GetSelectElectionCandidateHandler";
import GetSelectElectionCandidateResponse from "../handlers/get/GetSelectElectionCandidateResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";

export default class GetSelectElectionCandidateViewModel {
    isProcessing: boolean;
    errorMessage: string;
    selectElectionCandidates: GetSelectElectionCandidateResponse[];

    constructor() {
        makeAutoObservable(this);
    }

    public async getAllSelectElectionCandidate(userId: number) {
        try {
            this.isProcessing = true;
            let getSelectElectionCandidatesRequest: GetSelectElectionCandidateRequest = new GetSelectElectionCandidateRequest(userId);
            let response = await GetSelectElectionCandidateHandler.get(getSelectElectionCandidatesRequest);

            if (response && response.success) {
                let result = response.data;
                this.selectElectionCandidates = result;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('SelectElectionCandidates.Error.Get.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
