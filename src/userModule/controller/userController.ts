import {inject} from "inversify";
import express from "express";
import {
    BaseHttpController,
    controller,
    httpDelete,
    httpGet,
    httpPost,
    request,
    requestBody,
    response,
} from "inversify-express-utils";

import {UserServiceImpl} from "../service/impl/userServiceImpl";
import {TYPES} from "../../types";
import {AuthMiddleware} from "../../middlewares/authMiddleware";
import {LoginDto} from "../../foodModule/dto/loginDto";
import {SetUserDto} from "../dto/setUserDto";

@controller("/user")
export class UserController extends BaseHttpController {
    private userService: UserServiceImpl;

    constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        super();
        this.userService = userService;
    }

    @httpPost("/login")
    public async logIn(@requestBody() credentials: LoginDto, @response() res: express.Response) {
        try {
            const token = await this.userService.userLoginService(credentials);
            this.httpContext.response.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                path: "/api",
            });
            return this.json({message: "Ok"}, 200)
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpGet("/:userId", AuthMiddleware.authenticate)
    public async getUserByIdController(@request() req: express.Request, @response() res: express.Response) {
        try {
            // const id: string = req.params.userId;
            const id: string = this.httpContext.request.params.userId
            const user = await this.userService.getUserByIdService(id);
            return this.json({message: user}, 200);
        } catch (e: any) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpPost("/")
    public async addUserController(@requestBody() user: SetUserDto, @response() res: express.Response) {
        try {
            const result = await this.userService.addUserService(user)
            return this.json({message: result}, 200);
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpDelete("/:email")
    public async deleteUserByEmailController(@request() req: express.Request, @response() res: express.Response) {
        try {
            // const email: string = req.params.email;
            const email: string = this.httpContext.request.params.email
            const result = await this.userService.deleteUserByEmailService(email)
            return this.json({message: result}, 200);
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

    @httpGet("/", AuthMiddleware.authenticate)
    public async isLogged(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = this.httpContext.request.user
            if (user) {
                return this.json({message: user}, 200)
            }
            return this.badRequest()
        } catch (e) {
            return this.json({message: e.message}, 500);
        }
    }

}
