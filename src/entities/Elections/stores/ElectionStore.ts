import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditElectionViewModel from "../view-models/EditElectionViewModel";
import GetElectionViewModel from "../view-models/GetElectionViewModel";
import ListElectionCandidateTypeViewModel
    from "../../ElectionCandidateTypes/view-models/ListElectionCandidateTypeViewModel";
import ListUserViewModel from "../../Users/view-models/ListUserViewModel";


export default class ElectionStore
{
    getElectionViewModel: GetElectionViewModel;
    editElectionViewModel: EditElectionViewModel;
    listElectionCandidateTypeViewModel: ListElectionCandidateTypeViewModel;
    listUserViewModel: ListUserViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onElectionGetPageLoad()
    {
        this.getElectionViewModel = new GetElectionViewModel(this);
    }

    onElectionGetPageUnload()
    {
        this.getElectionViewModel = null;
    }

    onElectionEditPageLoad()
    {
        this.editElectionViewModel = new EditElectionViewModel(this);
        this.listElectionCandidateTypeViewModel = new ListElectionCandidateTypeViewModel();
    }

    onElectionEditPageUnload()
    {
        this.editElectionViewModel = null;
        this.listElectionCandidateTypeViewModel = null;
    }


    onAddCandidateElectionEditPageLoad()
    {
        this.editElectionViewModel = new EditElectionViewModel(this);
        this.listUserViewModel = new ListUserViewModel();
    }

    onAddCandidateElectionEditPageUnload()
    {
        this.editElectionViewModel = null;
        this.listUserViewModel = null;
    }

}
