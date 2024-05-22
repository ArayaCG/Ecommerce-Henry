import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    if (page && limit) {
      return this.productsRepository.getProducts(page, limit);
    }
    return this.productsRepository.getProducts(1, 5);
  }
  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  updateProducts(id: string, product: Partial<Products>) {
    return this.productsRepository.updateProduct(id, product);
  }
  deleteProducts(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
