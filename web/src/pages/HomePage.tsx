import { Typography, Box } from "@mui/material";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Bienvenue sur LesBonsProduits
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gérez vos produits simplement avec une interface moderne et intuitive.
        </Typography>
      </Box>
    </Layout>
  );
}
