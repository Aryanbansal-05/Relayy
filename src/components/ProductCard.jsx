import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          cursor: "pointer",
          p: 1,
          "&:hover": { boxShadow: 6, transform: "scale(1.03)", transition: "0.3s" },
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          height={150}
        />
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default ProductCard;
