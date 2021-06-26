import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetElectionCandidateTypeRequest from "./GetElectionCandidateTypeRequest";

export default class GetElectionCandidateTypeHandler
{
    public static async get(request: GetElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeGet, request, true);
        return response;
    }
}
