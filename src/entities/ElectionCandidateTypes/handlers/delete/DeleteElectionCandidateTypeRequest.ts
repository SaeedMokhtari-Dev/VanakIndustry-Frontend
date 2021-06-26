import {makeAutoObservable} from "mobx";

export default class DeleteElectionCandidateTypeRequest
{
    public electionCandidateTypeId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
