import {LoginDto} from "../dto/loginDto";
import {user} from "../model/user";

export interface UserRepository {
    getUserById(id: string): Promise<any>

    getUserByUsernameAndPassword(credentials: LoginDto): Promise<any>

    addUser(userModel: typeof user): Promise<any>

    deleteUserByEmail(email: string): Promise<any>
}
