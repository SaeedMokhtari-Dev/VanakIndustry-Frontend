import {makeAutoObservable} from "mobx";

export default class AddCompanyRequest
{
    companyName: string;
    companyCommercialNumber: string;
    companyCommercialPhoto: string;
    companyType: string;
    companyAdminUserName: string;
    companyAdminUserPassword: string;
    companyCountry: string;
    companyRegion: string;
    companyAddress: string;
    companyAdminName: string;
    companyAdminPosition: string;
    companyAdminPhone: string;
    companyAdminEmail: string;
    companyBalnce: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
