export interface UserRepository {
    getUserById(id: string): Promise<any>
}
