import React from "react";
import ProductSection from "./ProductSection";

import {
  healthProducts,
  snacks,
  juices,
} from "../Data/Product";

const Products = () => {
  return (
    <div
      className="
        w-full
        min-h-screen
        bg-gray-50
        py-8 sm:py-10 md:py-12
      "
    >
      <div
        className="
          max-w-screen-xl
          mx-auto
          px-4 sm:px-6 md:px-10
          space-y-12
        "
      >
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
    </div>
  );
};

export default Products;