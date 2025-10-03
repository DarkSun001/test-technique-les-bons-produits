import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { productService } from "../services/product.service.js";
import { io } from "../index.js";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    console.error("Erreur lors de la récupération des produits :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    let id: string | number | ObjectId = req.params.id;

    if (ObjectId.isValid(id) && id.length === 24) {
      id = new ObjectId(id);
    } else if (!isNaN(Number(id))) {
      id = Number(id);
    } else {
      return res.status(400).json({ error: "ID invalide." });
    }

    const product = await productService.getOne(id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });

    return res.status(200).json(product);
  } catch (err) {
    console.error("Erreur lors de la récupération du produit :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = req.body;
    const created = await productService.create(product);
    io.emit("product:created", created);

    return res.status(201).json(created);
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    let id: string | number | ObjectId = req.params.id;

    if (ObjectId.isValid(id) && id.length === 24) {
      id = new ObjectId(id);
    } else if (!isNaN(Number(id))) {
      id = Number(id);
    } else {
      return res.status(400).json({ error: "ID invalide." });
    }

    const updates = req.body;
    const updated = await productService.update(id, updates);

    if (!updated) return res.status(404).json({ error: "Produit non trouvé" });
    io.emit("product:updated", updated);
    return res.status(200).json(updated);
  } catch (err: any) {
    console.error("Erreur lors de la mise à jour du produit :", err);
    return res.status(400).json({ error: err.message || "Erreur serveur" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    let id: string | number | ObjectId = req.params.id;

    if (ObjectId.isValid(id) && id.length === 24) {
      id = new ObjectId(id);
    } else if (!isNaN(Number(id))) {
      id = Number(id);
    } else {
      return res.status(400).json({ error: "ID invalide." });
    }

    const deleted = await productService.delete(id);
    if (!deleted) return res.status(404).json({ error: "Produit introuvable" });
    io.emit("product:deleted", { _id: id });

    return res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
