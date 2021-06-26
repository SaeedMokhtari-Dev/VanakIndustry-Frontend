import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddElectionCandidateTypeRequest from "./AddElectionCandidateTypeRequest";


export default class AddElectionCandidateTypeHandler
{
    public static async add(request: AddElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeAdd, request, true);
        return response;
    }
}
