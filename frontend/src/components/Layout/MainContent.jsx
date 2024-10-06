import React from 'react';
import ProductList from '../Dashboard/ProductList';
import Cart from '../Cart';

const MainContent = ({ activeTab }) => {
  const renderContent = () => {
    return activeTab === 'products' ? <ProductList /> : <Cart />;
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default MainContent;
