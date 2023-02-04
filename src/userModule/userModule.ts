import {ContainerModule, interfaces} from "inversify";

import {UserRepositoryImpl} from "./repository/impl/userRepositoryImpl";
import {UserServiceImpl} from "./service/impl/userServiceImpl";
import {UserController} from "./controller/userController";
import {UserRepository} from "./repository/userRepository";
import {UserService} from "./service/userService";
import {TYPES} from "../types";

const UserModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
  bind<UserService>(TYPES.UserService).to(UserServiceImpl);
  bind<UserController>(TYPES.UserController).to(UserController);
});

export default UserModule;
