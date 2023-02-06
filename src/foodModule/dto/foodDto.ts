import {IsDataURI, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class FoodDto {
    @IsString()
    @IsNotEmpty()
    public name: string

    @IsNumber()
    @IsNotEmpty()
    public price: number

    @IsString()
    @IsNotEmpty()
    public category: string

    @IsDataURI()
    @IsNotEmpty()
    public imgUri: string

    @IsString()
    @IsNotEmpty()
    public description: string

    constructor(name?: string, price?: number, category?: string, imgUri?: string, description?: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.imgUri = imgUri;
        this.description = description;
    }
}
