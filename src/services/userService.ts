import {LoginDto} from "../dto/loginDto";

export interface UserService {
    getUserByIdService(id: string): Promise<any>
    userLoginService(credentials: LoginDto): Promise<any>
}
