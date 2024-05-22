import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUpLoadRepository } from './file-upload.repositoy';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUpLoadRepository: FileUpLoadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(
        `Producto con id: ${productId} no encontrado`,
      );

    const response = this.fileUpLoadRepository.uploadImage(file);

    await this.productsRepository.update(productId, {
      imgUrl: (await response).secure_url,
    });

    const foundProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return foundProduct;
  }
}
