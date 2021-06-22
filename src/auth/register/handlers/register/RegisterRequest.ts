import {makeAutoObservable} from "mobx";

export default class RegisterRequest
{
    firstName: string;
    lastName: string;
    nationalId: string;
    username: string;
    password: string;
    confirmPassword: string;
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

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
