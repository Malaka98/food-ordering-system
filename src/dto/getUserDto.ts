import {IsString} from "class-validator";

export class GetUserDto {
    @IsString()
  public firstName: string;
    @IsString()
    public lastName: string;
    @IsString()
    public username: string;
    @IsString()
    public password: string;
    @IsString()
    public address: string;
    @IsString()
    public phoneNumber: string;
    @IsString()
    public email: string;


    constructor(firstName?: string, lastName?: string, username?: string, password?: string,
      address?: string, phoneNumber?: string, email?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.password = password;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.email = email;
    }
}
