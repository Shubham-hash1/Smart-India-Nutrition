import { getRegionForFood } from "./regionalFoods";

export const diseaseData = {
  Obesity: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Carrot", key: "carrot" },
        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" }
      ],
      Minerals: [
        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Jogging", key: "jogging" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Stretching", key: "stretching" },
      { title: "Burpees", key: "burpees" },
      { title: "Skipping Rope", key: "skipping_rope" }
    ]
  },

  Diabetes: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Carrot", key: "carrot" },
        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" }
      ],
      Minerals: [
        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Jogging", key: "jogging" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Stretching", key: "stretching" },
      { title: "Brisk Walking", key: "brisk_walking" }
    ]
  },

  Heart: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Carrot", key: "carrot" },
        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" }
      ],
      Minerals: [
        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Jogging", key: "jogging" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Stretching", key: "stretching" },
      { title: "Swimming", key: "swimming" }
    ]
  },

  Stomach: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Carrot", key: "carrot" },
        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" }
      ],
      Minerals: [
        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Jogging", key: "jogging" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Stretching", key: "stretching" }
    ]
  },

  Nutritional: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Carrot", key: "carrot" },
        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" }
      ],
      Minerals: [
        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Jogging", key: "jogging" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Stretching", key: "stretching" }
    ]
  }
};

// Filter function
export const getFilteredItemsForDisease = (
  disease,
  category,
  region
) => {
  const data = diseaseData[disease];

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