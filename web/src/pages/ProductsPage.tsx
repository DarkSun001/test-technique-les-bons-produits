import { useEffect } from "react";

import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import Layout from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/productsSlice";
import type { RootState, AppDispatch } from "../store";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    //  Charger les produits depuis Redux
    dispatch(fetchProducts());

    // connecter au serveur WebSocket
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:8080");

    socket.on("product:created", (newProduct) => {
      dispatch(addProduct(newProduct));
    });

    socket.on("product:updated", (updated) => {
      dispatch(updateProduct(updated));
    });

    socket.on("product:deleted", ({ _id }) => {
      dispatch(deleteProduct(_id));
    });

    // Nettoyage
    return () => {
      socket.off("product:created");
      socket.off("product:updated");
      socket.off("product:deleted");
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Layout>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Les des produits
      </Typography>

      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
          <Typography mt={2}> Chargement des produits...</Typography>
        </Box>
      )}

      {error && (
        <Box textAlign="center" mt={5}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {products.map((p, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p._id ?? index}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && products.length === 0 && (
        <Typography align="center" color="text.secondary" mt={5}>
          Aucun produit disponible.
        </Typography>
      )}
    </Layout>
  );
}
