import { ApiProperty } from '@nestjs/swagger';

export class CraftResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  stock: number;
}
