import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../decorators/matchPassword.decorator';
import { UserRole } from './roles.enum';

export class CreateUserDto {
  /**
   * Debe ser un string de 3 a 80 caractéres
   * @example 'Lisandro Ejemplo'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string con email válido
   * @example 'lisandro@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string de 8 a 15 caractéres y contener una mínuscula, una mayúscula y un caracter especial
   * @example 'Li$4ndrO'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  password: string;

  /**
   * Debe ser un string igual al password
   * @example 'Li$4ndrO'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un number
   * @example '155112233'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string de 4 a 20 caractéres
   * @example 'Perú'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string de 4 a 20 caractéres
   * @example 'Lima'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  /**
   * Debe ser un string de 3 a 80 caractéres
   * @example 'Calle Ejemplo 1234'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: UserRole;
}

export class UpdateUserDto{
   /**
   * Debe ser un string de 3 a 80 caractéres
   * @example 'Lisandro Ejemplo'
   */
   @IsOptional()
   @IsString()
   @MinLength(3)
   @MaxLength(80)
   name: string;
 
   /**
    * Debe ser un string con email válido
    * @example 'lisandro@example.com'
    */
   @IsOptional()
   @IsEmail()
   email: string;
 
   /**
    * Debe ser un string de 8 a 15 caractéres y contener una mínuscula, una mayúscula y un caracter especial
    * @example 'Li$4ndrO'
    */
   @IsOptional()
   @IsString()
   @MinLength(8)
   @MaxLength(15)
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
   password: string;

   /**
    * Debe ser un number
    * @example '2611223344'
    */
   @IsOptional()
   @IsNumber()
   phone: number;
 
   /**
    * Debe ser un string de 4 a 20 caractéres
    * @example 'Perú'
    */
   @IsOptional()
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   country: string;
 
   /**
    * Debe ser un string de 4 a 20 caractéres
    * @example 'Lima'
    */
   @IsOptional()
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   city: string;
 
   /**
    * Debe ser un string de 3 a 80 caractéres
    * @example 'Calle Ejemplo 1234'
    */
   @IsOptional()
   @IsString()
   @MinLength(3)
   @MaxLength(80)
   address: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
