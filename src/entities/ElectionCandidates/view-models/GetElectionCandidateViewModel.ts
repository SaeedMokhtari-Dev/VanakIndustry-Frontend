import ElectionCandidateItem from "../handlers/get/ElectionCandidateItem";
import {makeAutoObservable} from "mobx";
import GetElectionCandidateRequest from "../handlers/get/GetElectionCandidateRequest";
import GetElectionCandidateHandler from "../handlers/get/GetElectionCandidateHandler";
import GetElectionCandidateResponse from "../handlers/get/GetElectionCandidateResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import {message} from "antd";

export default class GetElectionCandidateViewModel {
    electionCandidates: GetElectionCandidateResponse[];
    isProcessing: boolean;
    errorMessage: string;

    constructor() {
        makeAutoObservable(this);
    }

    public async getAllElectionCandidate(electionId: number) {
        try {
            this.isProcessing = true;
            let getElectionCandidateRequest: GetElectionCandidateRequest = new GetElectionCandidateRequest(electionId);
            let response = await GetElectionCandidateHandler.get(getElectionCandidateRequest);

            if (response && response.success) {
                this.electionCandidates = response.data;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('ElectionCandidates.Error.Get.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
