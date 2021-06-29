import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionListItem from "./ElectionListItem";

export default class ListElectionResponse implements IDeserialize
{
    items: ElectionListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ElectionListItem().deserialize(x));

        return this;
    }
}
