import IDeserialize from "app/interfaces/deserialize";

export default class DetailUserResponse implements IDeserialize
{
    key: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    barcode: string;
    username: string;
    password: string;
    phoneNumber: string;
    mobile: string;
    address: string;
    fatherName: string;
    birthDate: string;
    cardImage: string;
    pictureImage: string;
    motherName: string;
    certificateId: string;
    nickName: string;
    firstPageCertificateImage: string;
    nationalCardImage: string;
    married: boolean;
    secondPageCertificateImage: string;
    qualification: string;
    skillDescription: string;
    fieldOfStudy: string;
    postalCode: string;
    moreDescription: string;
    email: string;
    candidatePictureImage: string;
    createdAt: string;
    modifiedAt: string;
    lastLoginAt: string;
    isActive: boolean;
    roleId: number;
    present: boolean;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
