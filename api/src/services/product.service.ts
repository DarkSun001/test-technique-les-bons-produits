import { Product } from "../models/product.model.js";
import { ObjectId } from "mongodb";
import { productRepository } from "../repositories/product.repository.js";

export class ProductService {
  async getAll(): Promise<Product[]> {
    return await productRepository.findAll();
  }

  async getOne(id: number | ObjectId): Promise<Product | null> {
    return await productRepository.findById(id);
  }

  async create(product: Product): Promise<void> {
    const existing = await productRepository.findById(product._id);
    if (existing) {
      throw new Error("Un produit avec cet ID existe déja");
    }

    await productRepository.create(product);
  }

  async update(
    id: number | ObjectId,
    updates: Partial<Product>
  ): Promise<boolean> {
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new Error("Produit introuvable");
    }

    return await productRepository.update(id, updates);
  }

  async delete(id: number | ObjectId): Promise<boolean> {
    return await productRepository.delete(id);
  }
}

export const productService = new ProductService();
