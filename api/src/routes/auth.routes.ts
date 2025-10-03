import { Router } from "express";
import { signToken } from "../middlewares/auth.js";

const router = Router();
// Pour ce test technique je test en dur les identifiants
const USER = { email: "admin@bonsproduits.com", password: "admin" };

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }

  const token = signToken({ sub: email, role: "admin" });
  return res.json({ token });
});

export default router;
