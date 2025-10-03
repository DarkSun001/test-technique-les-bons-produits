import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import Layout from "../components/Layout";
import { productService } from "../services/api";

export default function DeleteProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("🧩 id reçu depuis route :", id);
  const handleDelete = async () => {
    try {
      await productService.delete(id!);
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du produit.");
    }
  };

  return (
    <Layout>
      <Box textAlign="center">
        <Typography variant="h5" mb={2}>
          Supprimer le produit #{id} ?
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/products")}>
            Annuler
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Supprimer définitivement
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
