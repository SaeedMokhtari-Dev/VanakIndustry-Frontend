import {makeAutoObservable} from "mobx";
import ElectionLimitItem from "../models/ElectionLimitItem";

export default class AddCandidateElectionRequest
{
    electionId: number;
    electionCandidateTypeId: number;
    userIds: number[];

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
