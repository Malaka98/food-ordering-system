import {UserRepositoryImpl} from "../../repositories/impl/userRepositoryImpl";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {UserService} from "../userService";

@injectable()
export class UserServiceImpl implements UserService {

    private userRepository: UserRepositoryImpl;

    constructor(@inject(TYPES.UserRepository) userRepository: UserRepositoryImpl) {
        this.userRepository = userRepository
    }

    async getUserByIdService(id: string): Promise<any> {
        try {
            return await this.userRepository.getUserById(id)
        } catch (e) {
            throw e
        }
    }
}
