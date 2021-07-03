import {makeAutoObservable} from "mobx";

export default class PresentElectionRequest
{
    constructor(
        public userId: number
    ) {
    }
}
