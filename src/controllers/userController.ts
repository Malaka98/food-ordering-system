import {UserServiceImpl} from "../services/impl/userServiceImpl";
import {inject} from "inversify";
import {TYPES} from "../types";
import {controller, httpGet, request, response} from "inversify-express-utils";

@controller("/user")
export class UserController {
    private userService: UserServiceImpl;

    constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        this.userService = userService
    }

    @httpGet("/:userId")
    public async getUserByIdController(@request() req, @response() res) {
        try {
            const id: string = req.params.userId
            const user = await this.userService.getUserByIdService(id)
            res.status = 200
            res.json({
                message: user
            })
        } catch (e: any) {
            res.status = 500
            res.send({
                error: e.message
            })
        }
    }
}
