import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'OrderDetails' })
export class OrderDetails {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un decimal hasta 10 dígitos antes de la coma.',
    example: '112233,44',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'OrderDetails_Products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
