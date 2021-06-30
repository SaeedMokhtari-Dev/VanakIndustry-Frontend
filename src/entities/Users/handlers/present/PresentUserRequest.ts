import {makeAutoObservable} from "mobx";

export default class PresentUserRequest
{
    public barcode: string;
    public electionId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
