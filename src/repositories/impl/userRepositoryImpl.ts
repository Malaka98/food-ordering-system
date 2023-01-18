import {user} from "../../model/user";
import {injectable} from "inversify";
import {UserRepository} from "../userRepository";
import {ObjectId} from 'mongodb'
import {LoginDto} from "../../dto/loginDto";

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async getUserById(id: string): Promise<any> {
        try {
            return await user.findOne({_id: new ObjectId(id)})
        } catch (e) {
            throw e
        }
    }

    async getUserByUsernameAndPassword(credentials: LoginDto): Promise<any> {
        try {
            return await user.findOne({username: credentials.username, password: credentials.password})
        } catch (e) {
            throw e
        }
    }
}
