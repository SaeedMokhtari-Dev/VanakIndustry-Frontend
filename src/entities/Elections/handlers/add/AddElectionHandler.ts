import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddElectionRequest from "./AddElectionRequest";


export default class AddElectionHandler
{
    public static async add(request: AddElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionAdd, request, true);
        return response;
    }
}
