import React from "react";


const ProductSection = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col mt-6">

      <h1 className="text-2xl font-bold ml-5">
        {title}
      </h1>

      <div className="flex flex-wrap gap-8 p-4 justify-center">

        {items.map((img, index) => (
          <a key={index} href="#">
            <img
              src={img}
              loading="lazy"
              alt="product"
              className="object-contain h-[260px] w-[180px] hover:scale-105 transition duration-300"
            />
          </a>
        ))}

      </div>
    </div>
  );
};

export default ProductSection;