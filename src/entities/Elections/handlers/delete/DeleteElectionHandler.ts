import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteElectionRequest from "./DeleteElectionRequest";


export default class DeleteElectionHandler
{
    public static async delete(request: DeleteElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionDelete, request, true);
        return response;
    }
}
