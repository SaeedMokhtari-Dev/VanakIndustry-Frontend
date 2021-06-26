import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailElectionCandidateTypeRequest from "./DetailElectionCandidateTypeRequest";


export default class DetailElectionCandidateTypeHandler
{
    public static async detail(request: DetailElectionCandidateTypeRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionCandidateTypeDetail, request, true);
        return response;
    }
}
