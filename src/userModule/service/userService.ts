import {LoginDto} from "../../foodModule/dto/loginDto";
import {SetUserDto} from "../dto/setUserDto";

export interface UserService {
    getUserByIdService(id: string): Promise<any>;

    userLoginService(credentials: LoginDto): Promise<any>

    addUserService(user: SetUserDto): Promise<any>

    deleteUserByEmailService(email: string): Promise<any>
}
