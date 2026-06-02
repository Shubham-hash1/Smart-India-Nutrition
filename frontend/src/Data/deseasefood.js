import { getRegionForFood } from "./regionalFoods";
import * as regionalFoodsESM from "./regionalFoods";

// Dynamic import resolution (compat with both ES Modules and seeder CommonJS/require sandbox)
const regional = typeof global !== 'undefined' && global.regionalFoodsSandbox ? global.regionalFoodsSandbox : regionalFoodsESM;
const { northFoods, southFoods, eastFoods, westFoods } = regional;

const allRegionalFoods = [
  ...(northFoods || []),
  ...(southFoods || []),
  ...(eastFoods || []),
  ...(westFoods || [])
];

const diseaseExercises = {
  Obesity: [
    { title: "Brisk Walking (45 mins)", key: "walking" },
    { title: "Jogging & Interval Runs", key: "jogging" },
    { title: "Cycling (Fat Burning)", key: "cycling" },
    { title: "Surya Namaskar (Sun Salutation)", key: "yoga" },
    { title: "Full-Body Stretching", key: "stretching" },
    { title: "High-Intensity Burpees", key: "burpees" },
    { title: "Skipping Rope (Cardio Blast)", key: "skipping_rope" }
  ],
  Diabetes: [
    { title: "Post-Meal Brisk Walk (20 mins)", key: "brisk_walking" },
    { title: "Steady-State Cycling", key: "cycling" },
    { title: "Pranayama & Mandukasana (Yoga)", key: "yoga" },
    { title: "Light Bodyweight Squats", key: "squats" },
    { title: "Muscle Conditioning Stretching", key: "stretching" },
    { title: "Active Jogging (Moderate)", key: "jogging" }
  ],
  Heart: [
    { title: "Aerobic Walking (30 mins)", key: "walking" },
    { title: "Gentle Swimming laps", key: "swimming" },
    { title: "Relaxation Yoga (Anulom Vilom)", key: "yoga" },
    { title: "Low-Resistance Cycling", key: "cycling" },
    { title: "Circulatory Stretching", key: "stretching" },
    { title: "Light Jogging", key: "jogging" }
  ],
  Stomach: [
    { title: "Gentle Walking (Digestion)", key: "walking" },
    { title: "Vajrasana (Post-Meal Yoga)", key: "yoga" },
    { title: "Deep Breathing & Abdominal Stretch", key: "stretching" },
    { title: "Light Cycling", key: "cycling" },
    { title: "Slow Warmup Jog", key: "jogging" }
  ],
  Nutritional: [
    { title: "Active Play & Walk", key: "walking" },
    { title: "Surya Namaskar (Strength)", key: "yoga" },
    { title: "Growth-Boosting Stretching", key: "stretching" },
    { title: "Recreational Cycling", key: "cycling" },
    { title: "Slow Jogging", key: "jogging" }
  ],
  Hypertension: [
    { title: "Daily Brisk Walking", key: "brisk_walking" },
    { title: "Deep Relaxation Yoga", key: "yoga" },
    { title: "Swimming (Aerobic)", key: "swimming" },
    { title: "Light Cycling", key: "cycling" },
    { title: "Vascular Stretching", key: "stretching" },
    { title: "Easy Pace Jogging", key: "jogging" }
  ],
  Thyroid: [
    { title: "Thyroid-Stimulating Yoga (Sarvangasana)", key: "yoga" },
    { title: "Brisk Walking (Metabolism Boost)", key: "walking" },
    { title: "Metabolic Conditioning Cycling", key: "cycling" },
    { title: "Systemic Stretching", key: "stretching" },
    { title: "Bodyweight Squats", key: "squats" },
    { title: "Active Jogging", key: "jogging" }
  ],
  "PCOD / PCOS": [
    { title: "Strength Training (Squats)", key: "squats" },
    { title: "Hormone-Balancing Yoga (Nadi Shodhana)", key: "yoga" },
    { title: "HIIT Burpees (Insulin Control)", key: "burpees" },
    { title: "Interval Jogging", key: "jogging" },
    { title: "Steady Cycling", key: "cycling" },
    { title: "Brisk Walking", key: "walking" }
  ],
  "Liver Health": [
    { title: "Liver-Detox Walking (30 mins)", key: "walking" },
    { title: "Hepatic-Circulation Cycling", key: "cycling" },
    { title: "Active Jogging", key: "jogging" },
    { title: "Swimming (Moderate)", key: "swimming" },
    { title: "Pranayama & Twist Yoga", key: "yoga" },
    { title: "Toxin-Release Stretching", key: "stretching" }
  ]
};

function customizeFood(food, diseaseName) {
  let title = food.title;
  let description = "";

  if (diseaseName === "Obesity") {
    if (food.category === "Proteins") title += " (Lean)";
    if (food.category === "Carbohydrates") title += " (High Fiber)";
    description = `Low-calorie, highly filling option selected to support a healthy calorie deficit and maintain muscle mass.`;
  } else if (diseaseName === "Diabetes") {
    if (food.category === "Carbohydrates") title += " (Low GI)";
    if (food.category === "Minerals") title += " (Insulin Action)";
    description = `Excellent low-glycemic Choice that prevents rapid spikes in blood sugar and enhances insulin sensitivity.`;
  } else if (diseaseName === "Heart") {
    title += " (Cardio-Safe)";
    description = `Rich in natural antioxidants, potassium, or heart-healthy fats to manage lipids and support clear arteries.`;
  } else if (diseaseName === "Stomach") {
    title += " (Easy Digest)";
    description = `Extremely gentle on the stomach lining, promoting alkaline balance and soothing gastrointestinal inflammation.`;
  } else if (diseaseName === "Nutritional") {
    title += " (Nutrient-Dense)";
    description = `Concentrated source of bioavailable vitamins, proteins, and minerals to target deficiencies and build strength.`;
  } else if (diseaseName === "Hypertension") {
    title += " (Low Sodium)";
    description = `Potassium-rich and sodium-restricted option to naturally lower blood pressure and improve blood flow.`;
  } else if (diseaseName === "Thyroid") {
    title += " (Thyro-Support)";
    description = `Rich in trace minerals like zinc, selenium, or tyrosine to optimize thyroid gland function and energy production.`;
  } else if (diseaseName === "PCOD / PCOS") {
    title += " (Hormone-Smart)";
    description = `Selected to combat insulin resistance, regulate hormones, and lower systemic inflammation in PCOS management.`;
  } else if (diseaseName === "Liver Health") {
    title += " (Detox-Helper)";
    description = `Contains active phytochemicals that support liver cleansing pathways and prevent cellular fat accumulation.`;
  }

  return {
    title,
    key: food.key,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    description: description || `Recommended regional food item supporting metabolic health and active lifestyle.`
  };
}

// Generate diseaseData dynamically using a local variable first
const _diseaseData = {};

const diseases = [
  "Obesity", 
  "Diabetes", 
  "Heart", 
  "Stomach", 
  "Nutritional", 
  "Hypertension", 
  "Thyroid", 
  "PCOD / PCOS", 
  "Liver Health"
];

diseases.forEach(d => {
  const foods = {
    Proteins: [],
    Vitamins: [],
    Carbohydrates: [],
    Minerals: []
  };

  allRegionalFoods.forEach(food => {
    foods[food.category].push(customizeFood(food, d));
  });

  _diseaseData[d] = {
    foods,
    exercises: diseaseExercises[d] || []
  };
});

export const diseaseData = _diseaseData;

// Filter function
export const getFilteredItemsForDisease = (
  disease,
  category,
  region
) => {
  const data = _diseaseData[disease];

  if (!data) return [];

  let items = [];

  if (category?.toLowerCase() === "exercises") {
    items = data.exercises;
  } else {
    items = data.foods?.[category] || [];
  }

  return items.filter((item) => {
    if (
      region === "All India" ||
      category?.toLowerCase() === "exercises"
    ) {
      return true;
    }

    const itemRegion = getRegionForFood(item.key);

    return (
      itemRegion === region ||
      itemRegion === "Common"
    );
  });
};