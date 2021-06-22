import RegisterRequest from "auth/register/handlers/register/RegisterRequest";
import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";

export default class RegisterHandler
{
    public static async register(request: RegisterRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiAuthRegister, request, false);
        return response;
    }
}