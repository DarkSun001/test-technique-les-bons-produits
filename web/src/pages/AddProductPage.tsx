import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Stack } from "@mui/material";
import Layout from "../components/Layout";
import { productService } from "../services/api";
import type { Product } from "../types/products";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    type: "",
    price: 0,
    rating: 0,
    warranty_years: 1,
    available: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Conversion automatique pour les nombres
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      await productService.create(form);
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du produit.");
    }
  };

  return (
    <Layout>
      <Typography variant="h4" mb={3}>
        Ajouter un produit
      </Typography>

      <Stack spacing={2} maxWidth={500}>
        <TextField
          label="Nom"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Note"
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Garantie (années)"
          name="warranty_years"
          type="number"
          value={form.warranty_years}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" onClick={handleSave}>
          Enregistrer
        </Button>
      </Stack>
    </Layout>
  );
}
