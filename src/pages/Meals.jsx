import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header isRenderSearch isRenderProfile title="Meals" />
      <Footer />
    </div>
  );
}

export default Meals;
