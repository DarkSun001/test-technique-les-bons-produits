import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import Layout from "../components/Layout";
import { login } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@bonsproduits.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box maxWidth={400} mx="auto" mt={8}>
        <Typography variant="h4" fontWeight="bold" mb={3} align="center">
          Connexion
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
