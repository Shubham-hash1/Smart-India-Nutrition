import React from "react";

const ProductSection = ({ title, items }) => {
  return (
    <div className="w-full mt-8">

      {/* Section Title */}
      <h1 className="
        text-lg
        sm:text-xl
        md:text-2xl
        font-bold
        px-2 sm:px-4
        mb-6
      ">
        {title}
      </h1>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-6
          place-items-center
        "
      >
        {items.map((img, index) => (
          <a
            key={index}
            href="#"
            className="
              bg-white
              p-3
              rounded-xl
              shadow-sm
              hover:shadow-lg
              transition
              w-full
              max-w-[180px]
            "
          >
            <img
              src={img}
              loading="lazy"
              alt="product"
              className="
                w-full
                h-[180px]
                object-contain
                transition-transform
                duration-300
                hover:scale-105
              "
            />
          </a>
        ))}
      </div>

    </div>
  );
};

export default ProductSection;