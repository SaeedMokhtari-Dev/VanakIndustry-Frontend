import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditElectionRequest from "./EditElectionRequest";


export default class EditElectionHandler
{
    public static async edit(request: EditElectionRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiElectionEdit, request, true);
        return response;
    }
}
