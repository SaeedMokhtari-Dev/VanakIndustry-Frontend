import {makeAutoObservable} from "mobx";

export default class EditUserRequest
{
    userId: number;
    firstName: string;
    lastName: string;
    nationalId: string;
    username: string;
    passwordChanged: boolean;
    password: string;
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
    candidatePictureImageChanged: boolean;
    candidatePictureImage: string;
    cardImageChanged: boolean;
    cardImage: string;
    pictureImageChanged: boolean;
    pictureImage: string;
    firstPageCertificateImageChanged: boolean;
    firstPageCertificateImage: string;
    nationalCardImageChanged: boolean;
    nationalCardImage: string;
    secondPageCertificateImageChanged: boolean;
    secondPageCertificateImage: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
