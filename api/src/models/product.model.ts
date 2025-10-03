import { ObjectId } from "mongodb";
export type Product = {
  _id: number | ObjectId;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
};
