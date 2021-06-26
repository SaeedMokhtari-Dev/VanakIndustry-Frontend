import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListElectionCandidateTypeRequest from "./ListElectionCandidateTypeRequest";

export default class ListElectionCandidateTypeHandler
{
    public static async get(request: ListElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeList, request, true);
        return response;
    }
}
