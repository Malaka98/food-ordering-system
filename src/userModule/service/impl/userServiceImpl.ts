import {UserRepositoryImpl} from "../../repository/impl/userRepositoryImpl";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../types";
import {UserService} from "../userService";
import {LoginDto} from "../../../foodModule/dto/loginDto";
import {AuthMiddleware} from "../../../middlewares/authMiddleware";
import {SetUserDto} from "../../dto/setUserDto";
import {user} from "../../model/user";
import {GetUserDto} from "../../dto/getUserDto";

@injectable()
export class UserServiceImpl implements UserService {

  private userRepository: UserRepositoryImpl;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepositoryImpl) {
    this.userRepository = userRepository;
  }

  async deleteUserByEmailService(email: string): Promise<any> {
    try {
      return await this.userRepository.deleteUserByEmail(email);
    } catch (e) {
      throw e;
    }
  }

  async getUserByIdService(id: string): Promise<any> {
    try {
      return await this.userRepository.getUserById(id);
    } catch (e) {
      throw e;
    }
  }

  async userLoginService(credentials: LoginDto): Promise<any> {
    try {
      const value = await this.userRepository.getUserByUsernameAndPassword(credentials);
      if (value) {
        const user = new GetUserDto(value._id, value.first_name, value.last_name, value.username, value.address,
          value.phone_number, value.email);
        return AuthMiddleware.generateToken({user});
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (e) {
      throw new Error(`Error in userLoginService: ${e.message}`);
    }
  }

  async addUserService(userDto: SetUserDto): Promise<any> {
    try {
      const userModel = new user({
        first_name: userDto.firstName,
        last_name: userDto.lastName,
        username: userDto.username,
        email: userDto.email,
        address: userDto.address,
        password: userDto.password,
        phone_number: userDto.phoneNumber,
      });
      return await this.userRepository.addUser(userModel);
    } catch (e) {
      throw e;
    }
  }
}
