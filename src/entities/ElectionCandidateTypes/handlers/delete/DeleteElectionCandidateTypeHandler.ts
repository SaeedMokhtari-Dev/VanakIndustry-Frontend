import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteElectionCandidateTypeRequest from "./DeleteElectionCandidateTypeRequest";


export default class DeleteElectionCandidateTypeHandler
{
    public static async delete(request: DeleteElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeDelete, request, true);
        return response;
    }
}
