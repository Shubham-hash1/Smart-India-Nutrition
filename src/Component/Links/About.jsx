import React from "react";

const sections = [
  {
    title: "What is Smart India Nutrition?",
    color: "text-green-600",
    content:
      "Smart India Nutrition is a platform dedicated to promoting healthier food choices and awareness about balanced nutrition. Our mission is to guide individuals towards better lifestyle decisions through knowledge, technology, and smart solutions.",
  },
  {
    title: "Why We Started It",
    color: "text-blue-600",
    content:
      "We started this initiative to address the growing health challenges caused by poor dietary habits. With increasing lifestyle diseases, awareness and smart technology help people make informed decisions.",
  },
  {
    title: "What Are the Benefits?",
    color: "text-purple-600",
    content:
      "Our platform provides personalized nutrition guidance, AI-powered recommendations, and easy-to-understand health insights to improve well-being and maintain a balanced lifestyle.",
  },
  {
    title: "Our Goal",
    color: "text-orange-600",
    content:
      "Our goal is to make smart nutrition accessible to every individual in India by combining technology, AI, and scientific knowledge to build a healthier nation.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-14 md:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">

        {sections.map((sec, index) => (
          <div
            key={index}
            className="
              bg-white
              p-5 sm:p-7 md:p-8
              rounded-2xl
              shadow-md
              hover:shadow-xl
              transition
            "
          >
            <h1
              className={`
                ${sec.color}
                text-xl
                sm:text-2xl
                md:text-3xl
                font-bold
                mb-4
                text-center
              `}
            >
              {sec.title}
            </h1>

            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
                md:text-lg
                leading-relaxed
                text-center
              "
            >
              {sec.content}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default About;