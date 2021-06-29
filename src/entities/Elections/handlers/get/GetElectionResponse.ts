import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionItem from "./ElectionItem";

export default class GetElectionResponse implements IDeserialize
{
    items: ElectionItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ElectionItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
