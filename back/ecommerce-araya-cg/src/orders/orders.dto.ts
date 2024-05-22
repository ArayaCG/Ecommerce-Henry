import { IsArray, IsNotEmpty, IsUUID, ArrayMinSize } from 'class-validator';
import { Products } from '../entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Identificador único del usuario en formato UUID.',
    example: 'a1b2c3d4-1234-5678-9876-abcdef123456',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Un array de objetos que representan productos',
    example: [
      { id: '15d9b90e-6a32-4de8-918a-87bfb0460c90' },
      { id: 'd444c5b3-bca9-4527-8ec3-92d02603a01d' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
