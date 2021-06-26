import {makeAutoObservable} from "mobx";

export default class AddElectionCandidateTypeRequest
{
    title: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
