import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  /**
   * Debe ser un string de 3 a 80 caractéres
   * @example 'Celular Ejemplo Ej12'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string
   * @example 'El Celular Ejemplo Ej123 es un dispositivo móvil de última generación con pantalla HD de 6.5 pulgadas, procesador de ocho núcleos y 8 GB de RAM para un rendimiento rápido y fluido. Con una cámara principal de 48 MP y una batería de 5000 mAh, ofrece fotos impresionantes y una duración de batería prolongada. Compatible con redes 5G para una conectividad ultrarrápida, este celular es ideal para aquellos que buscan un dispositivo elegante y potente.'
   */
  @IsOptional()
  description: string;

  /**
   * Debe ser un number
   * @example 112233.44
   */
  @IsOptional()
  @IsNumber()
  price: number;

  /**
   * Debe ser un number
   * @example 12
   */
  @IsOptional()
  @IsNumber()
  stock: number;
}
