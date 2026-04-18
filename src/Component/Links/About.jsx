import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Activity, Apple, Target } from "lucide-react";

const sections = [
  {
    title: "What is Smart India Nutrition?",
    icon: <Apple className="w-8 h-8 text-green-500" />,
    color: "from-green-500/20 to-green-500/5",
    textColor: "text-green-700",
    content:
      "Smart India Nutrition is a platform dedicated to promoting healthier food choices and awareness about balanced nutrition. Our mission is to guide individuals towards better lifestyle decisions through knowledge, technology, and smart solutions.",
  },
  {
    title: "Why We Started It",
    icon: <HeartPulse className="w-8 h-8 text-blue-500" />,
    color: "from-blue-500/20 to-blue-500/5",
    textColor: "text-blue-700",
    content:
      "We started this initiative to address the growing health challenges caused by poor dietary habits. With increasing lifestyle diseases, awareness and smart technology help people make informed decisions.",
  },
  {
    title: "What Are the Benefits?",
    icon: <Activity className="w-8 h-8 text-purple-500" />,
    color: "from-purple-500/20 to-purple-500/5",
    textColor: "text-purple-700",
    content:
      "Our platform provides personalized nutrition guidance, AI-powered recommendations, and easy-to-understand health insights to improve well-being and maintain a balanced lifestyle.",
  },
  {
    title: "Our Goal",
    icon: <Target className="w-8 h-8 text-orange-500" />,
    color: "from-orange-500/20 to-orange-500/5",
    textColor: "text-orange-700",
    content:
      "Our goal is to make smart nutrition accessible to every individual in India by combining technology, AI, and scientific knowledge to build a healthier nation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold tracking-wide uppercase">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Empowering India with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
              Smart Nutrition
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
            Harnessing the power of AI and technology to transform dietary habits and build a healthier, more informed nation.
          </p>
        </motion.div>

        {/* Content Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
        >
          {sections.map((sec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Background Gradient Blob */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sec.color} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="mb-6 p-4 inline-block bg-slate-50 rounded-2xl shadow-sm">
                  {sec.icon}
                </div>
                
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${sec.textColor}`}>
                  {sec.title}
                </h2>
                
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  {sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 md:mt-32 rounded-3xl overflow-hidden relative shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-800" />
          
          <div className="relative p-10 md:p-16 text-center text-white flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Join the Health Revolution</h3>
            <p className="max-w-2xl text-green-100 text-lg mb-10">
              Start your journey towards a better lifestyle today. Let our AI guide you with personalized recommendations tailored just for you.
            </p>
            <button className="px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;