import {injectable} from "inversify";
import {ObjectId} from "mongodb";

import {user} from "../../model/user";
import {UserRepository} from "../userRepository";
import {LoginDto} from "../../../foodModule/dto/loginDto";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  async deleteUserByEmail(email: string): Promise<any> {
    try {
      return await user.deleteOne({email: email});
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      return await user.findOne({_id: new ObjectId(id)});
    } catch (e) {
      throw e;
    }
  }

  async getUserByUsernameAndPassword(credentials: LoginDto): Promise<any> {
    try {
      return await user.findOne({username: credentials.username, password: credentials.password});
    } catch (e) {
      throw e;
    }
  }

  async addUser(userModel): Promise<any> {
    try {
      return await userModel.save();
    } catch (e) {
      throw e;
    }
  }
}
