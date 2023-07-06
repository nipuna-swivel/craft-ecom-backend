import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface OrderItem {
  craft: string;
  quantity: number;
}

export class PlaceOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  postalCode: string;

  @IsNotEmpty()
  @IsPhoneNumber('LK')
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: {
      craft: { type: 'string' },
      quantity: { type: 'number' },
    },
    isArray: true,
  })
  orderItems: OrderItem[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  orderTotal: number;
}
