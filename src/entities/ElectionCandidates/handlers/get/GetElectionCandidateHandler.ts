import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetElectionCandidateRequest from "./GetElectionCandidateRequest";

export default class GetElectionCandidateHandler
{
    public static async get(request: GetElectionCandidateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateGet, request, true);
        return response;
    }
}
