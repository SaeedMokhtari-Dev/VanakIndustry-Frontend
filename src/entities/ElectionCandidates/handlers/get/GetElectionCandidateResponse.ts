import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionCandidateItem from "./ElectionCandidateItem";

export default class GetElectionCandidateResponse implements IDeserialize
{
    items: ElectionCandidateItem[] = [];
    electionId: number;
    electionTitle: string;
    electionCandidateTypeId: number;
    electionCandidateTypeTitle: string;
    limitCount: number;
    selectedCount: number = 0;


    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        return this;
    }
}
