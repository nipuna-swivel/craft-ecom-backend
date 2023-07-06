import { IsNotEmpty } from 'class-validator';

export class CreateCraftDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}
