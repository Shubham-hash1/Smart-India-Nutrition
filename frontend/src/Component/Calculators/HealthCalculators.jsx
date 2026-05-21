import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, HeartPulse } from 'lucide-react';

const HealthCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState(null); // 'bmi' or 'bmr'

  // BMI State
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // BMR State
  const [bmrHeight, setBmrHeight] = useState('');
  const [bmrWeight, setBmrWeight] = useState('');
  const [bmrAge, setBmrAge] = useState('');
  const [bmrGender, setBmrGender] = useState('male');
  const [bmrResult, setBmrResult] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCalculator) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [activeCalculator]);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (bmiHeight && bmiWeight) {
      const heightInMeters = bmiHeight / 100;
      const bmi = (bmiWeight / (heightInMeters * heightInMeters)).toFixed(1);
      
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 24.9) category = 'Normal weight';
      else if (bmi < 29.9) category = 'Overweight';
      else category = 'Obese';

      setBmiResult({ bmi, category });
    }
  };

  const calculateBMR = (e) => {
    e.preventDefault();
    if (bmrHeight && bmrWeight && bmrAge) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * bmrWeight) + (6.25 * bmrHeight) - (5 * bmrAge);
      bmr += (bmrGender === 'male') ? 5 : -161;
      
      setBmrResult({ bmr: Math.round(bmr) });
    }
  };

  const resetForm = () => {
    setBmiResult(null);
    setBmrResult(null);
  };

  const closeCalculator = () => {
    setActiveCalculator(null);
    resetForm();
  };

  return (
    <div className="w-full bg-[#ffffff] py-12 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1f2937] mb-4">Health Calculators</h2>
          <p className="text-[#1f2937]/60 font-sans max-w-2xl mx-auto">
            Quickly assess your body metrics to better understand your nutritional needs and health status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* BMI Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setActiveCalculator('bmi')}
            className="cursor-pointer bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#1f2937]/30 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center mb-6 group-hover:bg-[#1f2937]/10 transition-colors">
              <Activity className="w-8 h-8 text-[#1f2937]" />
            </div>
            <h3 className="text-2xl font-serif text-[#1f2937] mb-3">BMI Calculator</h3>
            <p className="text-[#1f2937]/50 font-sans text-sm">
              Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity.
            </p>
            <span className="mt-6 inline-block text-sm uppercase tracking-widest text-[#1f2937]/70 font-semibold border-b border-[#1f2937]/20 pb-1 group-hover:text-[#1f2937] group-hover:border-[#1f2937] transition-all">
              Calculate BMI
            </span>
          </motion.div>

          {/* BMR Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setActiveCalculator('bmr')}
            className="cursor-pointer bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#1f2937]/30 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center mb-6 group-hover:bg-[#1f2937]/10 transition-colors">
              <HeartPulse className="w-8 h-8 text-[#1f2937]" />
            </div>
            <h3 className="text-2xl font-serif text-[#1f2937] mb-3">BMR Calculator</h3>
            <p className="text-[#1f2937]/50 font-sans text-sm">
              Basal Metabolic Rate (BMR) is the number of calories required to keep your body functioning at rest.
            </p>
            <span className="mt-6 inline-block text-sm uppercase tracking-widest text-[#1f2937]/70 font-semibold border-b border-[#1f2937]/20 pb-1 group-hover:text-[#1f2937] group-hover:border-[#1f2937] transition-all">
              Calculate BMR
            </span>
          </motion.div>
        </div>
      </div>

      {/* Calculator Modal */}
      {createPortal(
        <AnimatePresence>
          {activeCalculator && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCalculator}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 shadow-2xl z-10"
              >
                <button 
                  onClick={closeCalculator}
                  className="absolute top-6 right-6 text-[#1f2937]/50 hover:text-[#1f2937] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-serif text-[#1f2937] mb-6 border-b border-[#e5e7eb] pb-4">
                  {activeCalculator === 'bmi' ? 'BMI Calculator' : 'BMR Calculator'}
                </h3>

                {activeCalculator === 'bmi' ? (
                  <form onSubmit={calculateBMI} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-sans text-[#1f2937]/70 mb-2">Height (cm)</label>
                        <input 
                          type="number"
                          required
                          value={bmiHeight}
                          onChange={(e) => setBmiHeight(e.target.value)}
                          className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:border-[#1f2937]/50 transition-colors"
                          placeholder="e.g. 175"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-sans text-[#1f2937]/70 mb-2">Weight (kg)</label>
                        <input 
                          type="number"
                          required
                          value={bmiWeight}
                          onChange={(e) => setBmiWeight(e.target.value)}
                          className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:border-[#1f2937]/50 transition-colors"
                          placeholder="e.g. 70"
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-[#1f2937] text-[#ffffff] font-semibold py-3 rounded-lg hover:bg-[#374151] transition-colors">
                      Calculate
                    </button>

                    {bmiResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 bg-[#ffffff] rounded-xl border border-[#e5e7eb] text-center"
                      >
                        <p className="text-sm text-[#1f2937]/60 mb-1">Your BMI is</p>
                        <p className="text-4xl font-serif text-[#1f2937] mb-2">{bmiResult.bmi}</p>
                        <p className={`text-sm font-semibold uppercase tracking-wider ${
                          bmiResult.category === 'Normal weight' ? 'text-green-400' : 
                          bmiResult.category === 'Underweight' ? 'text-blue-400' :
                          'text-orange-400'
                        }`}>
                          {bmiResult.category}
                        </p>
                      </motion.div>
                    )}
                  </form>
                ) : (
                  <form onSubmit={calculateBMR} className="space-y-5">
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer text-[#1f2937]">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="male"
                          checked={bmrGender === 'male'}
                          onChange={(e) => setBmrGender(e.target.value)}
                          className="accent-[#1f2937]"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-[#1f2937]">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="female"
                          checked={bmrGender === 'female'}
                          onChange={(e) => setBmrGender(e.target.value)}
                          className="accent-[#1f2937]"
                        />
                        Female
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-sans text-[#1f2937]/70 mb-2">Age</label>
                        <input 
                          type="number"
                          required
                          value={bmrAge}
                          onChange={(e) => setBmrAge(e.target.value)}
                          className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:border-[#1f2937]/50 transition-colors"
                          placeholder="Years"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-sans text-[#1f2937]/70 mb-2">Height (cm)</label>
                        <input 
                          type="number"
                          required
                          value={bmrHeight}
                          onChange={(e) => setBmrHeight(e.target.value)}
                          className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:border-[#1f2937]/50 transition-colors"
                          placeholder="cm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-sans text-[#1f2937]/70 mb-2">Weight (kg)</label>
                        <input 
                          type="number"
                          required
                          value={bmrWeight}
                          onChange={(e) => setBmrWeight(e.target.value)}
                          className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:border-[#1f2937]/50 transition-colors"
                          placeholder="kg"
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-[#1f2937] text-[#ffffff] font-semibold py-3 rounded-lg hover:bg-[#374151] transition-colors">
                      Calculate
                    </button>

                    {bmrResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 bg-[#ffffff] rounded-xl border border-[#e5e7eb] text-center"
                      >
                        <p className="text-sm text-[#1f2937]/60 mb-1">Your BMR is</p>
                        <p className="text-4xl font-serif text-[#1f2937] mb-2">{bmrResult.bmr}</p>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#1f2937]/50">
                          Calories / Day
                        </p>
                      </motion.div>
                    )}
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default HealthCalculators;
