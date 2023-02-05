import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CartDto {
    @IsString()
    @IsNotEmpty()
    public name: string

    @IsNumber()
    @IsNotEmpty()
    public itemPrice: number

    @IsNumber()
    @IsNotEmpty()
    public itemCount: number
    
    constructor(name?: string, itemPrice?: number, itemCount?: number) {
        this.name = name;
        this.itemPrice = itemPrice;
        this.itemCount = itemCount;
    }
}
