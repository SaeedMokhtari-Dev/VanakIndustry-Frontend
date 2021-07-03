import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetSelectElectionCandidateRequest from "./GetSelectElectionCandidateRequest";

export default class GetSelectElectionCandidateHandler
{
    public static async get(request: GetSelectElectionCandidateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSelectElectionCandidateGet, request, true);
        return response;
    }
}
