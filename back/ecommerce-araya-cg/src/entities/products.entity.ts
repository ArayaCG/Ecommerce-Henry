import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import { OrderDetails } from './orderDetails.entity';
import { Categories } from './categories.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Products' })
export class Products {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Celular Ejemplo Ej12',
  })
  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Debe ser un texto',
    example:
      'El Celular Ejemplo Ej123 es un dispositivo móvil de última generación con pantalla HD de 6.5 pulgadas, procesador de ocho núcleos y 8 GB de RAM para un rendimiento rápido y fluido. Con una cámara principal de 48 MP y una batería de 5000 mAh, ofrece fotos impresionantes y una duración de batería prolongada. Compatible con redes 5G para una conectividad ultrarrápida, este celular es ideal para aquellos que buscan un dispositivo elegante y potente.',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Debe ser un decimal hasta 10 dígitos antes de la coma.',
    example: '112233,44',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Debe ser un int',
    example: '12',
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description:
      'Debe ser una URL válida de Cloudinary que contenga la imagen del producto.',
    example:
      'https://res.cloudinary.com/your-account/image/upload/your-image.jpg',
  })
  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dm1gbtbuh/image/upload/v1715170897/joflhujdnavyiespqvrn.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
