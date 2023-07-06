import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  deliveryAddress: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: {
      craft: { type: 'string' },
      quantity: { type: 'number' },
    },
    isArray: true,
  })
  orderItems: object;

  @ApiProperty()
  orderTotal: number;
}
