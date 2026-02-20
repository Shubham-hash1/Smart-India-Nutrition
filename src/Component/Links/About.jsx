import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Section 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h1 className="text-3xl font-bold text-green-600 mb-4  justify-center flex">
            What is Smart India Nutrition?
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg text-center">
            Smart India Nutrition is a platform dedicated to promoting
            healthier food choices and awareness about balanced nutrition.
            Our mission is to guide individuals towards better lifestyle
            decisions through knowledge, technology, and smart solutions.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h1 className="text-3xl font-bold text-blue-600 mb-4 justify-center flex">
            Why We Started It
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg text-center">
            We started this initiative to address the growing health
            challenges caused by poor dietary habits. With increasing
            lifestyle diseases, we believe awareness and smart technology
            can help people make informed decisions for a healthier future.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h1 className="text-3xl font-bold text-purple-600 mb-4  justify-center flex">
            What Are the Benefits?
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg text-center">
            Our platform provides personalized nutrition guidance,
            AI-powered recommendations, and easy-to-understand health
            insights. This empowers users to improve their well-being,
            boost immunity, and maintain a balanced lifestyle.
          </p>
        </div>

        {/* Section 4 - Our Goal */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h1 className="text-3xl font-bold text-orange-600 mb-4  justify-center flex">
            Our Goal
          </h1>
          <p className="leading-relaxed text-lg text-center">
            Our goal is to make smart nutrition accessible to every individual
            in India. We aim to combine technology, AI, and scientific knowledge
            to create a healthier nation. By empowering people with the right
            information and tools, we strive to reduce lifestyle diseases and
            build a future where healthy living becomes a habit, not a choice.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;