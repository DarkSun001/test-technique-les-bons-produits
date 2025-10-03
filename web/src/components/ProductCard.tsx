import { Box, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { Product } from "../types/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Box
      p={2}
      border={2}
      sx={{
        transition: " all 0.2s ease",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        Type : {product.type}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Prix : {product.price} €
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Note : {product.rating}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Garantie : {product.warranty_years}
      </Typography>
      <Typography variant="body2" color={product.available ? "green" : "error"}>
        {product.available ? "Disponible" : "Indisponible"}
      </Typography>

      <Stack direction="row" spacing={1} mt={2}>
        <Button
          component={Link}
          to={`/products/edit/${product._id}`}
          variant="outlined"
        >
          Modifier
        </Button>
        <Button
          component={Link}
          to={`/products/delete/${product._id}`}
          variant="outlined"
          color="error"
        >
          Supprimer
        </Button>
      </Stack>
    </Box>
  );
}
