import React from "react";

const Card1 = ({ image, title, description }) => {
  return (
    <div
      className="
        group
        relative
        w-full
        max-w-[280px]
        h-[260px]
        sm:h-[300px]
        md:h-[320px]
        lg:h-[340px]
        rounded-2xl
        overflow-hidden
        shadow-lg
        cursor-pointer
        mx-auto
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="
          w-full h-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-4 sm:p-5 text-white">
        <h2 className="
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
        ">
          {title}
        </h2>

        <p className="
          text-xs
          sm:text-sm
          opacity-90
          mt-2
          line-clamp-3
        ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card1;