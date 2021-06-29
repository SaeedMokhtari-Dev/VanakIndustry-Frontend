import {makeAutoObservable} from "mobx";
import ElectionLimitItem from "../models/ElectionLimitItem";

export default class EditElectionRequest
{
    electionId: number;
    title: string;
    startDate: string;
    endDate: string;
    iplimit: boolean;
    iplist: string;

    electionLimitItems: ElectionLimitItem[];


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
