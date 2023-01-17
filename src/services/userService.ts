export interface UserService {
    getUserByIdService(id: string): Promise<any>
}
