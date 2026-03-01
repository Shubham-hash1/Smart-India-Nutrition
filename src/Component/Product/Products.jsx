import React from "react";
import ProductSection from "./ProductSection";

import {
  healthProducts,
  snacks,
  juices,
} from "../Data/Product";

const Products = () => {
  return (
    <div className="flex flex-col items-center">

      <ProductSection
        title="Health Products"
        items={healthProducts}
      />

      <ProductSection
        title="Healthy Snack Alternatives"
        items={snacks}
      />

      <ProductSection
        title="Healthy Juice Alternatives"
        items={juices}
      />

    </div>
  );
};

export default Products;