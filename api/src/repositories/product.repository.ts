import { connectDB } from "../db.js";
import { Product } from "../models/product.model.js";
import { ObjectId } from "mongodb";

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const db = await connectDB();
    const products = db.collection<Product>("products");
    return await products.find({}).toArray();
  }

  async findById(id: number | ObjectId): Promise<Product | null> {
    const db = await connectDB();
    const products = db.collection<Product>("products");
    return await products.findOne({ _id: id });
  }

  async create(product: Product): Promise<void> {
    const db = await connectDB();
    const products = db.collection<Product>("products");
    await products.insertOne(product);
  }

  async update(
    id: number | ObjectId,
    updates: Partial<Product>
  ): Promise<boolean> {
    const db = await connectDB();
    const products = db.collection<Product>("products");

    const result = await products.updateOne({ _id: id }, { $set: updates });
    return result.matchedCount > 0;
  }

  async delete(id: number | ObjectId): Promise<boolean> {
    const db = await connectDB();
    const products = db.collection<Product>("products");
    const result = await products.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}

export const productRepository = new ProductRepository();
