import {user} from "../../model/user";
import {injectable} from "inversify";
import {UserRepository} from "../userRepository";
import {ObjectId} from 'mongodb'

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async getUserById(id: string): Promise<any> {
        try {
            return await user.findOne({_id: new ObjectId(id)})
        } catch (e) {
            throw e
        }
    }
}
