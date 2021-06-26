import {makeAutoObservable} from "mobx";

export default class EditElectionCandidateTypeRequest
{
    electionCandidateTypeId: number;
    title: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
