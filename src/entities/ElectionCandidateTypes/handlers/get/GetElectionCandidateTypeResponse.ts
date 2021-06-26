import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionCandidateTypeItem from "./ElectionCandidateTypeItem";

export default class GetElectionCandidateTypeResponse implements IDeserialize
{
    items: ElectionCandidateTypeItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ElectionCandidateTypeItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
