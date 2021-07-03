import {makeAutoObservable} from "mobx";

export default class AddSelectElectionCandidateRequest
{
    electionId: number;
    userId: number;
    electionCandidateIds: number[] = [];

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
