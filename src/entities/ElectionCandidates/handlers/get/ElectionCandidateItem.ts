import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class ElectionCandidateItem implements IDeserialize
{
    key: number;
    userId: number;
    userFullName: string;
    candidatePictureId: number;
    src: string;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
