import {IsString} from "class-validator";

export class LoginDto {
    @IsString()
    public username: string
    @IsString()
    public password: string

    constructor(username?: string, password?: string) {
        this.username = username;
        this.password = password;
    }
}
