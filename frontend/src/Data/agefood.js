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

const ageExercises = {
  Toddler: [
    { title: "Crawling & Walking Play", key: "walking" },
    { title: "Active Play & Toys", key: "running" },
    { title: "Stretching & Reaching games", key: "stretching" },
    { title: "Soft Tumbling", key: "stretching" }
  ],
  Child: [
    { title: "Running & Tag games", key: "running" },
    { title: "Recreational Cycling", key: "cycling" },
    { title: "Skipping Rope", key: "skipping_rope" },
    { title: "Swimming (Playful)", key: "swimming" },
    { title: "Outdoor Sports", key: "running" }
  ],
  Teen: [
    { title: "Active Jogging", key: "jogging" },
    { title: "Yoga & Mindfulness", key: "yoga" },
    { title: "High-Energy Burpees", key: "burpees" },
    { title: "Bodyweight Squats", key: "squats" },
    { title: "Competitive Sports", key: "running" },
    { title: "Strength Training", key: "squats" }
  ],
  Adult: [
    { title: "Brisk Walking (30 mins)", key: "brisk_walking" },
    { title: "Fitness Cycling", key: "cycling" },
    { title: "Surya Namaskar & Yoga", key: "yoga" },
    { title: "Core Plank Hold", key: "plank" },
    { title: "Lower Body Lunges", key: "lunges" },
    { title: "Strength Workouts", key: "squats" },
    { title: "Laps Swimming", key: "swimming" }
  ],
  OldAge: [
    { title: "Low-Impact Walking (20 mins)", key: "walking" },
    { title: "Gentle Chair Yoga & Pranayama", key: "yoga" },
    { title: "Slow Joint-Mobility Stretching", key: "stretching" },
    { title: "Deep Breathing Exercises", key: "yoga" },
    { title: "Stability & Balancing Drill", key: "stretching" }
  ]
};

function customizeFood(food, ageGroupName) {
  let title = food.title;
  let description = "";

  if (ageGroupName === "Toddler") {
    title += " (Soft/Mashed)";
    description = `Nutrient-dense, soft-textured, and easily digestible to aid rapid growth and coordinate motor development in toddlers.`;
  } else if (ageGroupName === "Child") {
    title += " (Kid-Friendly)";
    description = `Excellent energy source and calcium/protein supplier to fuel active play and support healthy bone and brain development.`;
  } else if (ageGroupName === "Teen") {
    title += " (Clean Fuel)";
    description = `Rich in protein, iron, and slow-release carbohydrates to power growth spurts, academic studies, and athletic activities.`;
  } else if (ageGroupName === "Adult") {
    title += " (Wellness Pack)";
    description = `Balanced macronutrients configured to support clean energy, preserve lean muscle, and support long-term metabolic health.`;
  } else if (ageGroupName === "OldAge") {
    title += " (Easy-Chew)";
    description = `Soft-textured, calcium-dense, and highly digestible selection ideal for maintaining bone density and preventing sarcopenia.`;
  }

  return {
    title,
    key: food.key,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    description: description || `Regional food item supporting wholesome growth and dietary care.`
  };
}

// Generate ageData dynamically using local variable first
const _ageData = {};

const ageGroups = [
  "Toddler", 
  "Child", 
  "Teen", 
  "Adult", 
  "OldAge"
];

ageGroups.forEach(a => {
  const foods = {
    Proteins: [],
    Vitamins: [],
    Carbohydrates: [],
    Minerals: []
  };

  allRegionalFoods.forEach(food => {
    foods[food.category].push(customizeFood(food, a));
  });

  _ageData[a] = {
    foods,
    exercises: ageExercises[a] || []
  };
});

export const ageData = _ageData;

// Filter function
export const getFilteredItemsForAge = (
  ageGroup,
  category,
  region
) => {
  const data = _ageData[ageGroup];

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
