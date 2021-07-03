import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailElectionHandler from "../handlers/detail/DetailElectionHandler";
import DetailElectionRequest from "../handlers/detail/DetailElectionRequest";
import AddElectionRequest from "../handlers/add/AddElectionRequest";
import EditElectionRequest from "../handlers/edit/EditElectionRequest";
import AddElectionHandler from "../handlers/add/AddElectionHandler";
import {message} from "antd";
import EditElectionHandler from "../handlers/edit/EditElectionHandler";
import DetailElectionResponse from "../handlers/detail/DetailElectionResponse";
import ElectionStore from "../stores/ElectionStore";
import AddCandidateElectionRequest from "../handlers/addCandidate/AddCandidateElectionRequest";
import AddCandidateElectionHandler from "../handlers/addCandidate/AddCandidateElectionHandler";

export default class EditElectionViewModel
{
    isProcessing: boolean;
    calculating: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailElectionResponse: DetailElectionResponse = new DetailElectionResponse();
    addElectionRequest: AddElectionRequest = new AddElectionRequest();
    editElectionRequest: EditElectionRequest = new EditElectionRequest();
    addCandidateElectionRequest: AddCandidateElectionRequest = new AddCandidateElectionRequest();


    constructor(public electionStore: ElectionStore) {
        makeAutoObservable(this);
    }
    public async getDetailElection(electionId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailElectionRequest(electionId);
            let response = await DetailElectionHandler.detail(request);

            if(response && response.success)
            {

                this.detailElectionResponse = new DetailElectionResponse().deserialize(response.data);
                this.editElectionRequest = new EditElectionRequest();
                for ( let i in this.editElectionRequest )
                    if ( this.detailElectionResponse.hasOwnProperty( i ) )
                        this.editElectionRequest[i] = this.detailElectionResponse[i];


                return this.detailElectionResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Elections.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addElection(request: AddElectionRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddElectionHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.electionsStore.getElectionViewModel.getAllElections(new GetElectionsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Elections.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addCandidateElection(request: AddCandidateElectionRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddCandidateElectionHandler.addCandidate(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Elections.Error.AddCandidate.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editElection(request: EditElectionRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditElectionHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.electionsStore.getElectionViewModel.getAllElections(new GetElectionsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Elections.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
