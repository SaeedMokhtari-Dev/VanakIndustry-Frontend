import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class UserItem implements IDeserialize
{
    key: number;
    firstName: string;
    lastName: string;
    nationalId: string;
    barcode: string;
    phoneNumber: string;
    mobile: string;
    address: string;
    fatherName: string;
    birthDate: string;
    motherName: string;
    certificateId: string;
    nickName: string;
    married: boolean;
    qualification: string;
    skillDescription: string;
    fieldOfStudy: string;
    postalCode: string;
    moreDescription: string;
    email: string;
    createdAt: string;
    modifiedAt: string;
    lastLoginAt: string;
    isActive: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
