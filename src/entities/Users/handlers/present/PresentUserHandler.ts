import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import PresentUserRequest from "./PresentUserRequest";


export default class PresentUserHandler
{
    public static async present(request: PresentUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserPresent, request, true);
        return response;
    }
}
