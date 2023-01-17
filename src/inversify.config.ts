import {Container} from "inversify";

import {TYPES} from "./types";
import {UserRepositoryImpl} from "./repositories/impl/userRepositoryImpl";
import {UserServiceImpl} from "./services/impl/userServiceImpl";
import {UserController} from "./controllers/userController";
import {UserRepository} from "./repositories/userRepository";
import {UserService} from "./services/userService";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
container.bind<UserController>(TYPES.UserController).to(UserController)

export {container}
