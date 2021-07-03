import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import PresentElectionRequest from "./PresentElectionRequest";


export default class PresentElectionHandler
{
    public static async present(request: PresentElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionPresent, request, true);
        return response;
    }
}
