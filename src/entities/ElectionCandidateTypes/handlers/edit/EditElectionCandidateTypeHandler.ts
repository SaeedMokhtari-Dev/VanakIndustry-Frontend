import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditElectionCandidateTypeRequest from "./EditElectionCandidateTypeRequest";


export default class EditElectionCandidateTypeHandler
{
    public static async edit(request: EditElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeEdit, request, true);
        return response;
    }
}
