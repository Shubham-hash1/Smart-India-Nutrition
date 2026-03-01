import React from 'react'

const Child = ({ image, title, description }) => {
  return (
    <div className="group relative w-[260px] h-80  rounded-2xl overflow-hidden shadow-lg cursor-pointer">

      {/* Background Image */}
      <img
        src={image}
        alt={title}
        loading='lazy'
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 p-5 text-white">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm opacity-90 mt-2">{description}</p>

       
      </div>
    </div>
  );
};

export default Child