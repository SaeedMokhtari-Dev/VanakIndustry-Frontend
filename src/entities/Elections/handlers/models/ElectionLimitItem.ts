import {makeAutoObservable} from "mobx";

export default class ElectionLimitItem
{
    id?: number;
    electionId: number;
    electionCandidateTypeId: number;
    electionCandidateTypeTitle: string;
    limitCount: number;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
