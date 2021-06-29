import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddCandidateElectionRequest from "./AddCandidateElectionRequest";


export default class AddCandidateElectionHandler
{
    public static async addCandidate(request: AddCandidateElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionAddCandidate, request, true);
        return response;
    }
}
