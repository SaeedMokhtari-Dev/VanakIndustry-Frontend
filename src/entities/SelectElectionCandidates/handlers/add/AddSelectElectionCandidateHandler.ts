import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddSelectElectionCandidateRequest from "./AddSelectElectionCandidateRequest";


export default class AddSelectElectionCandidateHandler
{
    public static async add(request: AddSelectElectionCandidateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSelectElectionCandidateAdd, request, true);
        return response;
    }
}
