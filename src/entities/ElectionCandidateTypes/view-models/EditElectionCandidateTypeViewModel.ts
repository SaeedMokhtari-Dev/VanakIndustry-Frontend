import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailElectionCandidateTypeHandler from "../handlers/detail/DetailElectionCandidateTypeHandler";
import DetailElectionCandidateTypeRequest from "../handlers/detail/DetailElectionCandidateTypeRequest";
import AddElectionCandidateTypeRequest from "../handlers/add/AddElectionCandidateTypeRequest";
import EditElectionCandidateTypeRequest from "../handlers/edit/EditElectionCandidateTypeRequest";
import AddElectionCandidateTypeHandler from "../handlers/add/AddElectionCandidateTypeHandler";
import {message} from "antd";
import EditElectionCandidateTypeHandler from "../handlers/edit/EditElectionCandidateTypeHandler";
import DetailElectionCandidateTypeResponse from "../handlers/detail/DetailElectionCandidateTypeResponse";
import ElectionCandidateTypeStore from "../stores/ElectionCandidateTypeStore";

export default class EditElectionCandidateTypeViewModel
{
    isProcessing: boolean;
    calculating: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailElectionCandidateTypeResponse: DetailElectionCandidateTypeResponse = new DetailElectionCandidateTypeResponse();
    addElectionCandidateTypeRequest: AddElectionCandidateTypeRequest = new AddElectionCandidateTypeRequest();
    editElectionCandidateTypeRequest: EditElectionCandidateTypeRequest = new EditElectionCandidateTypeRequest();


    constructor(public electionCandidateTypeStore: ElectionCandidateTypeStore) {
        makeAutoObservable(this);
    }
    public async getDetailElectionCandidateType(electionCandidateTypeId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailElectionCandidateTypeRequest(electionCandidateTypeId);
            let response = await DetailElectionCandidateTypeHandler.detail(request);

            if(response && response.success)
            {

                this.detailElectionCandidateTypeResponse = new DetailElectionCandidateTypeResponse().deserialize(response.data);
                this.editElectionCandidateTypeRequest = new EditElectionCandidateTypeRequest();
                for ( let i in this.editElectionCandidateTypeRequest )
                    if ( this.detailElectionCandidateTypeResponse.hasOwnProperty( i ) )
                        this.editElectionCandidateTypeRequest[i] = this.detailElectionCandidateTypeResponse[i];


                return this.detailElectionCandidateTypeResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addElectionCandidateType(request: AddElectionCandidateTypeRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddElectionCandidateTypeHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.electionCandidateTypesStore.getElectionCandidateTypeViewModel.getAllElectionCandidateTypes(new GetElectionCandidateTypesRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editElectionCandidateType(request: EditElectionCandidateTypeRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            debugger;

            let response = await EditElectionCandidateTypeHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.electionCandidateTypesStore.getElectionCandidateTypeViewModel.getAllElectionCandidateTypes(new GetElectionCandidateTypesRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('ElectionCandidateTypes.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
