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

import {UserServiceImpl} from "../services/impl/userServiceImpl";
import {TYPES} from "../types";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {LoginDto} from "../dto/loginDto";
import {GetUserDto} from "../dto/getUserDto";

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
            return this.ok();
        } catch (e) {
            this.statusCode(500);
            return this.json({message: e.message});
        }
    }

    @httpGet("/:userId", AuthMiddleware.authenticate)
    public async getUserByIdController(@request() req: express.Request, @response() res: express.Response) {
        try {
            const id: string = req.params.userId;
            const user = await this.userService.getUserByIdService(id);
            this.statusCode(200);
            return this.json({message: user});
        } catch (e: any) {
            this.statusCode(500);
            return this.json({message: e.message});
        }
    }

    @httpPost("/")
    public async addUserController(@requestBody() user: GetUserDto, @response() res: express.Response) {
        try {
            const result = await this.userService.addUserService(user)
            this.statusCode(200);
            return this.json({message: result});
        } catch (e) {
            this.statusCode(500);
            return this.json({message: e.message});
        }
    }

    @httpDelete("/:email")
    public async deleteUserByEmailController(@request() req: express.Request, @response() res: express.Response) {
        try {
            const email: string = req.params.email;
            const result = await this.userService.deleteUserByEmailService(email)
            this.statusCode(200);
            return this.json({message: result});
        } catch (e) {
            this.statusCode(500);
            return this.json({message: e.message});
        }
    }

}
