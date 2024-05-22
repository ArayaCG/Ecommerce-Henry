import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Categories' })
export class Categories {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Cómedia',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
