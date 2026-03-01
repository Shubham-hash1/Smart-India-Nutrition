import React from 'react';
// 1. Import the image if it is inside your 'src' folder
import heroImg from './Gemini_Generated_Image_c25b1yc25b1yc25b.png'; 

const HeroSection = () => {
  return (
    <section className="relative mt-5 mb-5 h-[450px] w-auto overflow-hidden object-cover bg-gray-900 m-6 ">
      <img 
        src={heroImg} 
        loading='lazy'
        alt="Natural dairy and meat products" 
        className="absolute inset-0 h-[450px] w-full object-cover opacity-70"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
       <h1 className="mt-4 text-3xl md:text-4xl max-w-full">
          "Take care of your body. It's the only place you have to live."
       </h1>
      </div>
    </section>
  );
}

export default HeroSection;