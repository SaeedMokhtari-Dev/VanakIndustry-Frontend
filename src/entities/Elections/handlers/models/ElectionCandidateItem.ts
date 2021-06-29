import {makeAutoObservable} from "mobx";

export default class ElectionCandidateItem {
    id: number;
    userId: number;
    userFullName: string;
    electionId: number;
    electionCandidateTypeId: number;
    electionCandidateTypeTitle: string;

    constructor() {
        makeAutoObservable(this);
    }
}