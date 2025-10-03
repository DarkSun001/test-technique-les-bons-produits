import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../services/auth";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#ffffff",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#002855",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 2,
            px: { xs: 2, md: 6 },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
            <Box component="span" sx={{ color: "#E30613" }}>
              Les
            </Box>
            BonsProduits
          </Typography>

          <Box>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "#002855",
                textTransform: "none",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Accueil
            </Button>
            <Button
              component={Link}
              to="/products"
              sx={{
                color: "#002855",
                textTransform: "none",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Produits
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/products/add"
              sx={{
                textTransform: "none",
                bgcolor: "#E30613",
                fontWeight: 600,
                "&:hover": { bgcolor: "#c70510" },
              }}
            >
              Ajouter un produit
            </Button>

            {isAuthenticated() && (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderColor: "#E30613",
                  color: "#E30613",
                  fontWeight: 600,
                  ml: 2,
                  "&:hover": { bgcolor: "#E30613", color: "#fff" },
                }}
              >
                Se déconnecter
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, py: 8, px: { xs: 2, md: 8 } }}>
        {children}
      </Box>
    </Box>
  );
}
