import React from 'react';
import Navbar from '../Navbar';
import Header from '../components/Header';
import Hero from './Hero';
import Description from './Description';
import products from '../data/products';
import { useParams } from 'react-router';
import Related from './Related';

function Product_page() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  return (
    <>
      <Navbar />
      <Header title="Product Details" />
      <Hero />
      {product ? (
        <Description product={product} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>
          Product not found.
        </p>
      )}
      <Related category={product.category} currentProductId={product.id} />
    </>
  );
}

export default Product_page;
