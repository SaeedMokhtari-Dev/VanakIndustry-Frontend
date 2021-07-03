import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class GetSelectElectionCandidateResponse implements IDeserialize
{
    key: number;
    electionId: number;
    electionTitle: string;
    electionCandidateTypeId: number;
    electionCandidateTypeTitle: string;
    userId: number;
    userFullName: string;
    candidatePictureId: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
