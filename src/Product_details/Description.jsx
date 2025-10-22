// src/components/Description.jsx
import React, { useState } from "react";
import { Box, Tabs, Tab, Card, CardContent } from "@mui/material";

const Description = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabContent = [
    {
      label: "Description",
      content: (
        <>
          <h3
            style={{
              marginBottom: "15px",
              fontWeight: 700,
              color: "#2e004f",
              fontSize: "1.5rem",
              fontFamily: "inherit",
            }}
          >
            {product?.title}
          </h3>
          <p
            style={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              color: "#555",
              fontFamily: "inherit",
            }}
          >
            {product?.description || "No description available for this product."}
          </p>
        </>
      ),
    },
    {
      label: "Additional Info",
      content: (
        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            lineHeight: 1.8,
            fontFamily: "inherit",
          }}
        >
          {product?.additionalInfo || "Additional information will be updated soon."}
        </p>
      ),
    },
    {
      label: "Reviews",
      content: (
        <>
          {product?.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  backgroundColor: "#f8f3fb",
                  boxShadow: "none",
                  border: "1px solid #e0c5f7",
                }}
              >
                <CardContent>
                  <h4
                    style={{
                      marginBottom: "5px",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                    }}
                  >
                    {review.user}
                  </h4>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                  >
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p
              style={{
                fontSize: "1.1rem",
                color: "#555",
                fontFamily: "inherit",
              }}
            >
              No reviews yet.
            </p>
          )}
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        mt: 6,
        px: { xs: 2, sm: 6, md: 12 },
        py: 5,
        backgroundColor: "#f3e9f8",
        borderRadius: 2,
        minHeight: "400px", // ✅ keeps consistent section height
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        fontFamily: "inherit",
      }}
    >
      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          mb: 4,
          "& .MuiTab-root": {
            fontSize: "1.2rem",
            textTransform: "none",
            mx: 3,
            color: "#6d3797",
            fontFamily: "inherit",
          },
          "& .Mui-selected": {
            color: "#4b007d",
            fontWeight: "bold",
          },
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          fontFamily: "inherit",
          flex: 1,
        }}
      >
        {tabContent[selectedTab].content}
      </Box>
    </Box>
  );
};

export default Description;
