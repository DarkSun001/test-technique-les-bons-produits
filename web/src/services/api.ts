import axios from "axios";
import type { Product } from "../types/products";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  },

  getOne: async (id: string | number): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  create: async (product: Omit<Product, "_id">): Promise<Product> => {
    const res = await api.post("/products", product);
    return res.data;
  },

  update: async (
    id: string | number,
    product: Partial<Omit<Product, "_id">>
  ): Promise<Product> => {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
  },

  delete: async (id: string | number): Promise<{ message: string }> => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
