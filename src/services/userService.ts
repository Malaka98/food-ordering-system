import {LoginDto} from "../dto/loginDto";
import {GetUserDto} from "../dto/getUserDto";

export interface UserService {
    getUserByIdService(id: string): Promise<any>;

    userLoginService(credentials: LoginDto): Promise<any>

    addUserService(user: GetUserDto): Promise<any>

    deleteUserByEmailService(email: string): Promise<any>
}
