import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const productsWithStock = products.filter((product) => product.stock > 0);

    const start = (page - 1) * limit;
    const end = start + limit;
    products = productsWithStock.slice(start, end);
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'Productos agregados';
  }

  async addProduct(product: Products) {
    const categories = await this.categoriesRepository.find();
    if (categories?.find((category) => category === product.category)) {
      const newProduct = new Products();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.imgUrl = product.imgUrl;
      newProduct.stock = product.stock;
      newProduct.category = product.category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(newProduct)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    }
  }

  async updateProduct(id: string, product: Partial<Products>) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct.id;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    this.productsRepository.remove(product);
    return product.id;
  }
}
