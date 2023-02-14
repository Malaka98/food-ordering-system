import {IsNotEmpty, IsObject} from "class-validator";

export class OrderDto {
    @IsObject()
    @IsNotEmpty()
    public orderDetails: any

    @IsObject()
    @IsNotEmpty()
    public paymentDetails: any


    constructor(orderDetails?: any, paymentDetails?: any) {
        this.orderDetails = orderDetails;
        this.paymentDetails = paymentDetails;
    }
}
