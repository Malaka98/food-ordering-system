export interface CheckoutRepository {
    addCheckout(checkoutModel: any, userId: string, updateModel: any): Promise<any>
}
