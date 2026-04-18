import React from 'react';
import heroImg from './Gemini_Generated_Image_c25b1yc25b1yc25b.png';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="
      relative 
      w-[95%] mx-auto my-8
      h-[400px] sm:h-[450px] md:h-[550px] lg:h-[550px]
      rounded-[2.5rem] 
      overflow-hidden 
      shadow-2xl 
      group
    ">
      {/* Background Image with Zoom Effect */}
      <img
        src={heroImg}
        loading="lazy"
        alt="Healthy food"
        className="
          absolute inset-0 
          w-full h-full 
          object-cover 
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
      />

      {/* Modern Radial + Linear Overlay */}
      <div className="
        absolute inset-0 
        bg-gradient-to-tr 
        from-black/80 via-black/30 to-transparent
      "></div>

      {/* Decorative Blur Element (Adds Depth) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 blur-[100px] rounded-full"></div>

      {/* Content Container */}
      <div className="
        relative z-10 
        flex flex-col 
        justify-center 
        h-full 
        px-8 sm:px-16 md:px-24 
        text-white
      ">
        <div className="max-w-2xl">
          {/* Tagline */}
          <span className="
            inline-block mb-4 px-3 py-1 
            text-xs font-bold tracking-widest uppercase 
            bg-green-500/20 border border-green-500/30 
            rounded-full text-green-400
          ">
            Premium Wellness
          </span>

          <h1 className="
            font-extrabold 
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            leading-[1.1] 
            drop-shadow-2xl
          ">
            Take care of <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              your body.
            </span>
          </h1>

          <p className="
            mt-6 
            text-base sm:text-lg md:text-xl 
            text-gray-300 
            max-w-md 
            leading-relaxed
          ">
            It's the only place you have to live. Invest in your health today for a vibrant tomorrow.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button 
            onClick={() => navigate("/Products")}    
            className="
              group/btn relative 
              bg-green-500 hover:bg-green-400 
              text-black font-bold 
              px-8 py-4 rounded-full 
              transition-all duration-300 
              hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
              active:scale-95 cursor-pointer
            ">
              Explore Products
            </button>
            
            <button 
            onClick={() => navigate("/about")}
            className="
              px-8 py-4 rounded-full 
              border border-white/30 
              bg-white/10 backdrop-blur-md 
              hover:bg-white/20 
              transition-all
              font-medium
            ">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Glass Card (Optional Detail) */}
      {/* <div className="
        absolute bottom-8 right-8 
        hidden md:block 
        p-4 rounded-2xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-xl
      ">
        <p className="text-xs text-green-400 font-bold uppercase tracking-tighter">New Arrival</p> 
         <p className="text-sm font-semibold text-white">Organic Green Mix</p>
      </div> */}
    </section>
  );
};

export default HeroSection;