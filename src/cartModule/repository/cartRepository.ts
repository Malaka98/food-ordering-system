export interface CartRepository {
    getCartByUserId(userId: string): Promise<any>

    updateCartByCurrentUserId(userId: string, updateModel): Promise<any>
}
