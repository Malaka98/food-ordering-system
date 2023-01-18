export class GetUserDto {
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public address: string
    public phoneNumber: string
    public email: string


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
