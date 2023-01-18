import {LoginDto} from "../dto/loginDto";

export interface UserRepository {
    getUserById(id: string): Promise<any>
    getUserByUsernameAndPassword(credentials: LoginDto): Promise<any>
}
