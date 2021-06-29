import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetElectionRequest from "./GetElectionRequest";

export default class GetElectionHandler
{
    public static async get(request: GetElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionGet, request, true);
        return response;
    }
}
