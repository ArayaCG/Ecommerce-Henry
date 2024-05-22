import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { UserRole } from '../users/roles.enum';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Users' })
export class Users {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Lisandro Ejemplo',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'lisandro@ejemplo.com',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description:
      'Debe ser un string de 15 caracteres máximo ya que se contempla el jwt y debe tener mayúscula, minúscula y algún caracter especial',
    example: 'Li$4ndrO',
  })
  @Column({ type: 'varchar', length: 80, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: 155112233,
  })
  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Perú',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Lima',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @ApiProperty({
    description: 'Debe ser un string de 50 caracteres máximo',
    example: 'Calle Ejemplo 123',
  })
  @Column({ nullable: true, type: 'text' })
  address: string;

  @ApiHideProperty()
  @Column({
    default: UserRole.User,
  })
  role: UserRole;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
