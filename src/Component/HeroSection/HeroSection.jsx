import React from 'react';
import heroImg from './Gemini_Generated_Image_c25b1yc25b1yc25b.png';

const HeroSection = () => {
  return (
    <section className="
      relative
      w-full
      overflow-hidden
      bg-gray-900
      mx-2 sm:mx-4 md:mx-6
      my-4
      h-[220px]
      sm:h-[300px]
      md:h-[400px]
      lg:h-[500px]
      rounded-xl
    ">

      {/* Background Image */}
      <img
        src={heroImg}
        loading="lazy"
        alt="Natural dairy and meat products"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          opacity-70
        "
      />

      {/* Content */}
      <div className="
        relative z-10
        flex flex-col
        items-center justify-center
        text-center
        text-white
        h-full
        px-3 sm:px-6 md:px-10
      ">
        <h1 className="
          font-semibold
          text-lg
          sm:text-xl
          md:text-3xl
          lg:text-4xl
          xl:text-5xl
          max-w-4xl
          leading-snug
        ">
          "Take care of your body. It's the only place you have to live."
        </h1>
      </div>

    </section>
  );
};

export default HeroSection;