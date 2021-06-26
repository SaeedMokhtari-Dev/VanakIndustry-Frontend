import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditElectionCandidateTypeViewModel from "../view-models/EditElectionCandidateTypeViewModel";
import GetElectionCandidateTypeViewModel from "../view-models/GetElectionCandidateTypeViewModel";


export default class ElectionCandidateTypeStore
{
    getElectionCandidateTypeViewModel: GetElectionCandidateTypeViewModel;
    editElectionCandidateTypeViewModel: EditElectionCandidateTypeViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onElectionCandidateTypeGetPageLoad()
    {
        this.getElectionCandidateTypeViewModel = new GetElectionCandidateTypeViewModel(this);
    }

    onElectionCandidateTypeGetPageUnload()
    {
        this.getElectionCandidateTypeViewModel = null;
    }

    onElectionCandidateTypeEditPageLoad()
    {
        this.editElectionCandidateTypeViewModel = new EditElectionCandidateTypeViewModel(this);
    }

    onElectionCandidateTypeEditPageUnload()
    {
        this.editElectionCandidateTypeViewModel = null;
    }

}
