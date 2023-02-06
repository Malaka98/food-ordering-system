import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CartDto {
    @IsString()
    @IsNotEmpty()
    public foodId: string

    @IsNumber()
    @IsNotEmpty()
    public itemCount: number

    constructor(foodId?: string, itemPrice?: number, itemCount?: number) {
        this.foodId = foodId;
        this.itemCount = itemCount;
    }
}
