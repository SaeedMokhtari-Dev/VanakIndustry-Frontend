import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailElectionRequest from "./DetailElectionRequest";


export default class DetailElectionHandler
{
    public static async detail(request: DetailElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionDetail, request, true);
        return response;
    }
}
