import {UserServiceImpl} from "../services/impl/userServiceImpl";
import {inject} from "inversify";
import {TYPES} from "../types";
import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    request,
    requestBody,
    response
} from "inversify-express-utils";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import express from "express";
import {LoginDto} from "../dto/loginDto";

@controller("/user")
export class UserController extends BaseHttpController {
    private userService: UserServiceImpl;

    constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        super();
        this.userService = userService
    }

    @httpPost("/")
    public async logIn(@requestBody() credentials: LoginDto, @response() res: express.Response) {
        try {
            const token = await this.userService.userLoginService(credentials)
            this.httpContext.response.cookie("access_token", token, {
                httpOnly: true,
                sameSite: 'none',
                path: "/api"
            })
            return this.ok()
        } catch (e) {
            this.statusCode(500)
            return this.json({message: e.message})
        }
    }

    @httpGet("/:userId", AuthMiddleware.authenticate)
    public async getUserByIdController(@request() req: express.Request, @response() res: express.Response) {
        try {
            const id: string = req.params.userId
            const user = await this.userService.getUserByIdService(id)
            this.statusCode(200)
            return this.json({message: user})
        } catch (e: any) {
            this.statusCode(500)
            return this.json({message: e.message})
        }
    }
}
