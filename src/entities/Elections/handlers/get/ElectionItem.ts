import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ElectionLimitItem from "../models/ElectionLimitItem";

export default class ElectionItem implements IDeserialize
{
    key: number;
    title: string;
    startDate: string;
    endDate: string;
    iplimit: boolean;
    iplist: string;
    finalize: boolean;
    finalizeDate: string;

    electionLimitItems: ElectionLimitItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
