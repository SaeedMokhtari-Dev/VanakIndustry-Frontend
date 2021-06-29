import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListElectionRequest from "./ListElectionRequest";

export default class ListElectionHandler
{
    public static async get(request: ListElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionList, request, true);
        return response;
    }
}
