import dotenv from "dotenv";
import { connectDB, disconnectDB } from "../src/db.js";

dotenv.config();

type Product = {
  _id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
};

(async () => {
  try {
    const db = await connectDB();
    const products = db.collection<Product>("products");

    await products.deleteMany({});
    console.log("Collection vidée");

    const initialProducts = [
      {
        _id: 1,
        name: "AC1 Phone1",
        type: "phone",
        price: 200.05,
        rating: 3.8,
        warranty_years: 1,
        available: true,
      },
      {
        _id: 2,
        name: "AC2 Phone2",
        type: "phone",
        price: 147.21,
        rating: 1,
        warranty_years: 3,
        available: false,
      },
      {
        _id: 3,
        name: "AC3 Phone3",
        type: "phone",
        price: 150,
        rating: 2,
        warranty_years: 1,
        available: true,
      },
      {
        _id: 4,
        name: "AC4 Phone4",
        type: "phone",
        price: 50.2,
        rating: 3,
        warranty_years: 2,
        available: true,
      },
    ];

    await products.insertMany(initialProducts);
    console.log("Données Mis à jours");
  } catch (err) {
    console.error("erreur lors de l'insertion", err);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
})();
