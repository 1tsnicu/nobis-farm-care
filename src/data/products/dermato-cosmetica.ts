import { Product } from "../types";
import { createProduct } from "./utils";

// Dermato-Cosmetică - 11 produse
export const dermatoCosmetica: Product[] = [
  createProduct(1, "Bioderma Atoderm Crema 500ml", "BIODERMA", "Franta", 457, "dermatocosmetica"),
  createProduct(2, "Bioderma Atoderm Gel spumant 1000ml", "BIODERMA", "Franta", 548.07, "dermatocosmetica"),
  createProduct(3, "Bioderma Cicabio Lotiune 40ml", "BIODERMA", "Franta", 297.45, "dermatocosmetica"),
  createProduct(4, "Bioderma Cicabio Lotiune 40ml", "BIODERMA", "Franta", 434.24, "dermatocosmetica"),
  createProduct(5, "Bioderma Cicabio Lotiune 40ml", "BIODERMA", "Franta", 348.24, "dermatocosmetica"),
  createProduct(6, "Crema fata Ivatherm hidratanta SPF20 50ml", "BIODERMA", "Franta", 320.79, "dermatocosmetica"),
  createProduct(7, "Deodorant Roll On Vichy Antiperspirant 48h 50ml", "VICHY", "Franta", 205.24, "dermatocosmetica"),
  createProduct(8, "La Roche Posay Crema fata Effaclar M 40ml", "La Roche-Posay Laboratoire Dermatologique", "Franta", 574.39, "dermatocosmetica"),
  createProduct(9, "Tamiflu caps. 75 mg N10", "F.Hoffmann-La Roche Ltd", "Elvetia", 292.38, "dermatocosmetica"),
  createProduct(10, "Vichy Dercos Sampon contra matretii (par norm/gras) 200ml", "VICHY", "Franta", 747.79, "dermatocosmetica"),
  createProduct(11, "Vichy Dercos Sampon contra matretii (par norm/gras) 200ml", "VICHY", "Franta", 549.51, "dermatocosmetica"),
];
