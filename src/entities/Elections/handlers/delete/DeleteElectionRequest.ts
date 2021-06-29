import {makeAutoObservable} from "mobx";

export default class DeleteElectionRequest
{
    public electionId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
