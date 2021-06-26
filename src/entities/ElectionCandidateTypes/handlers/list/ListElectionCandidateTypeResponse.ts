import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionCandidateTypeListItem from "./ElectionCandidateTypeListItem";

export default class ListElectionCandidateTypeResponse implements IDeserialize
{
    items: ElectionCandidateTypeListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ElectionCandidateTypeListItem().deserialize(x));

        return this;
    }
}
