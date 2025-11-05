import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page has been deprecated - redirect to category page
const Products = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/categorie/medicamente-otc", { replace: true });
  }, [navigate]);
  
  return null;
};

export default Products;
