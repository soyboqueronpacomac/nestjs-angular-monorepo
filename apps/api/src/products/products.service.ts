import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 999.99,
      description: 'High-performance laptop',
    },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
    {
      id: 3,
      name: 'Keyboard',
      price: 79.99,
      description: 'Mechanical keyboard',
    },
  ];

  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: 'New Product',
      price: 0,
      description: 'Product description',
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updateProductDto,
      };
      return this.products[productIndex];
    }
    return null;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const removed = this.products.splice(productIndex, 1);
      return removed[0];
    }
    return null;
  }
}
