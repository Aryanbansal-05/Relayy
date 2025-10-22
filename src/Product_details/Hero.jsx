// src/Product_details/Hero.jsx
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Rating, Card, CardMedia, Stack } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

export default function Hero({ product }) {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product?.imageUrls) {
      setMainImage(product.imageUrls[0]);
      setImages(product.imageUrls.slice(1));
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  }, [product]);

  if (!product) return <p>Loading...</p>;

  const handleThumbnailClick = (index) => {
    const newImages = [...images];
    const clickedImage = newImages[index];
    newImages[index] = mainImage;
    setMainImage(clickedImage);
    setImages(newImages);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#fafafa",
        p: 4,
        fontFamily: "inherit",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: 1400,
          width: "100%",
          boxShadow: 6,
          overflow: "hidden",
          bgcolor: "white",
          mb: 6,
          fontFamily: "inherit",
        }}
      >
        {/* Product images */}
        <Box
          sx={{
            flex: 1.2,
            display: "flex",
            gap: 2,
            p: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Small Thumbnails */}
          <Stack spacing={2} sx={{ width: "20%", minWidth: 100 }}>
            {images.map((src, index) => (
              <CardMedia
                key={index}
                component="img"
                image={src}
                alt={`thumb-${index}`}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: 90,
                  height: 90,
                  "&:hover": { transform: "scale(1.08)" },
                }}
              />
            ))}
          </Stack>

          {/* Main Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={mainImage || "/placeholder.jpg"}
              alt="main product"
              sx={{
                borderRadius: 3,
                objectFit: "cover",
                width: "100%",
                height: { xs: 320, md: 520 },
                boxShadow: 3,
                transition: "all 0.3s ease",
              }}
            />
          </Box>
        </Box>

        {/* Product Info */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 6 },
            fontFamily: "inherit",
          }}
        >
          <h1
            style={{
              marginBottom: "15px",
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            {product.title}
          </h1>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating name="read-only" value={4} readOnly size="medium" />
          </Box>

          <h2
            style={{
              marginBottom: "25px",
              color: "#1976d2",
              fontSize: "1.8rem",
              fontWeight: "600",
            }}
          >
            ₹{product.price}
          </h2>

          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "10px",
                px: 4,
                py: 1.8,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
              onClick={() => (window.location.href = `mailto:${product.userEmail}`)}
            >
              Contact Seller
            </Button>
            <IconButton sx={{ border: "1px solid #ccc" }}>
              <FavoriteBorder />
            </IconButton>
          </Box>

          {/* Seller Info Box */}
          <Box
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              mb: 4,
              maxWidth: 300,
            }}
          >
            <p style={{ margin: "5px 0", fontWeight: 500 }}>
              <strong>Seller:</strong>{" "}
              <span style={{ color: "#555" }}>{product.username}</span>
            </p>
            <p style={{ margin: "5px 0", fontWeight: 500 }}>
              <strong>Email:</strong>{" "}
              <span style={{ color: "#555" }}>{product.userEmail}</span>
            </p>
          </Box>

          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              marginBottom: "5px",
            }}
          >
            <strong>Category:</strong>{" "}
            <span style={{ color: "#555" }}>{product.category}</span>
          </p>
        </Box>
      </Card>
    </Box>
  );
}
