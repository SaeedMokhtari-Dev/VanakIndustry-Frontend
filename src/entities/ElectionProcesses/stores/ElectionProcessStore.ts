import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import GetElectionCandidateViewModel from "../../ElectionCandidates/view-models/GetElectionCandidateViewModel";
import AddSelectElectionCandidateViewModel
    from "../../SelectElectionCandidates/view-models/AddSelectElectionCandidateViewModel";
import GetSelectElectionCandidateViewModel
    from "../../SelectElectionCandidates/view-models/GetSelectElectionCandidateViewModel";
import DetailAttachmentViewModel from "../../Attachments/view-models/DetailAttachmentViewModel";


export default class ElectionProcessStore
{
    getElectionCandidateViewModel: GetElectionCandidateViewModel;
    addSelectElectionCandidateViewModel: AddSelectElectionCandidateViewModel;

    getSelectElectionCandidateViewModel: GetSelectElectionCandidateViewModel;
    detailAttachmentViewModel: DetailAttachmentViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onElectionProcessSelectionPageLoad()
    {
        this.getElectionCandidateViewModel = new GetElectionCandidateViewModel();
        this.addSelectElectionCandidateViewModel = new AddSelectElectionCandidateViewModel();
        this.detailAttachmentViewModel = new DetailAttachmentViewModel();
        this.getSelectElectionCandidateViewModel = new GetSelectElectionCandidateViewModel();
    }

    onElectionProcessSelectionPageUnload()
    {
        this.getElectionCandidateViewModel = null;
        this.addSelectElectionCandidateViewModel = null;
        this.detailAttachmentViewModel = null;
        this.getSelectElectionCandidateViewModel = null;
    }

    onElectionProcessFinalizePageLoad()
    {
        this.getSelectElectionCandidateViewModel = new GetSelectElectionCandidateViewModel();
        this.detailAttachmentViewModel = new DetailAttachmentViewModel();
    }

    onElectionProcessFinalizePageUnload()
    {
        this.getSelectElectionCandidateViewModel = null;
        this.detailAttachmentViewModel = null;
    }

}
