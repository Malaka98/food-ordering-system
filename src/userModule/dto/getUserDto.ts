import {IsString} from "class-validator";

export class GetUserDto {
    @IsString()
  public id: string;
    @IsString()
    public firstName: string;
    @IsString()
    public lastName: string;
    @IsString()
    public username: string;
    @IsString()
    public address: string;
    @IsString()
    public phoneNumber: string;
    @IsString()
    public email: string;


    constructor(id?: string, firstName?: string, lastName?: string, username?: string, address?: string,
      phoneNumber?: string, email?: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.email = email;
    }
}
