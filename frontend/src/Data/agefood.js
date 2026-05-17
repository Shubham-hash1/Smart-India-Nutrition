import { getRegionForFood } from "./regionalFoods";

export const ageData = {
  Toddler: {
    foods: {
      Proteins: [
        { title: "Paneer (Mashed)", key: "paneer" },
        { title: "Soft Tofu", key: "tofu" },
        { title: "Moong Dal Soup", key: "moong_dal" },
        
        // --- NORTH INDIA ---
        { title: "Mitha Dahi (Sweet Curd)", key: "dahi_north" },
        { title: "Soft Chana Soup", key: "chana_soup_north" },
        
        // --- SOUTH INDIA ---
        { title: "Pasi Paruppu (Mashed Yellow Moong)", key: "pasi_paruppu_south" },
        { title: "Soft Idli", key: "idli_south" },
        
        // --- EAST INDIA ---
        { title: "Soft Chhena (Fresh Curd)", key: "chhena_east" },
        { title: "Masoor Dal Puree", key: "masoor_dal_east" },
        
        // --- WEST INDIA ---
        { title: "Mild Kadhi", key: "kadhi_west" },
        { title: "Soft Toor Dal", key: "toor_dal_west" }
      ],
      Vitamins: [
        { title: "Mashed Carrot", key: "carrot" },
        { title: "Mashed Apple", key: "apple" },
        { title: "Mashed Papaya", key: "papaya" },
        
        // --- NORTH INDIA ---
        { title: "Lauki Puree (Bottle Gourd)", key: "lauki_north" },
        { title: "Mashed Pumpkin (Kaddu)", key: "pumpkin_north" },
        
        // --- SOUTH INDIA ---
        { title: "Ash Gourd Soup", key: "ash_gourd_south" },
        { title: "Chow Chow Mash", key: "chow_chow_south" },
        
        // --- EAST INDIA ---
        { title: "Boiled Raw Banana (Kacha Kela)", key: "raw_banana_east" },
        
        // --- WEST INDIA ---
        { title: "Galka (Soft Luffa)", key: "galka_west" }
      ],
      Carbohydrates: [
        { title: "Oats Porridge", key: "oats" },
        
        // --- NORTH INDIA ---
        { title: "Suji Halwa", key: "suji_halwa_north" },
        { title: "Moong Dal Khichdi", key: "khichdi_north" },
        
        // --- SOUTH INDIA ---
        { title: "Curd Rice (Thayir Sadam)", key: "curd_rice_south" },
        { title: "Rice Kanji", key: "kanji_south" },
        
        // --- EAST INDIA ---
        { title: "Soft Chira (Soaked Flattened Rice)", key: "chira_east" },
        
        // --- WEST INDIA ---
        { title: "Shira (Roasted Semolina)", key: "shira_west" },
        { title: "Soft Poha", key: "poha_west" }
      ],
      Minerals: [
        { title: "Almond Paste", key: "almonds" },
        // --- NORTH INDIA ---
        { title: "Mishri Water", key: "mishri_north" },
        // --- SOUTH INDIA ---
        { title: "Diluted Jeera Water", key: "jeera_water_south" },
        // --- EAST INDIA ---
        { title: "Coconut Water", key: "coconut_water_east" },
        // --- WEST INDIA ---
        { title: "Mild Masala Chaas", key: "chaas_west" }
      ]
    },
    exercises: [
      { title: "Crawling & Walking", key: "walking" },
      { title: "Active Play", key: "running" },
      { title: "Stretching & Reaching", key: "stretching" }
    ]
  },

  Child: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Sprouts", key: "sprouts" },
        { title: "Rajma", key: "rajma" },
        
        // --- NORTH INDIA ---
        { title: "Boiled Chole", key: "chole_boiled_north" },
        { title: "Lobiya (Black-Eyed Peas)", key: "lobiya_north" },
        
        // --- SOUTH INDIA ---
        { title: "Sundal (Chickpeas)", key: "sundal_south" },
        { title: "Tuvar Dal", key: "tuvar_dal_south" },
        
        // --- EAST INDIA ---
        { title: "Sattu Drink", key: "sattu_east" },
        { title: "Mash Dal", key: "mash_dal_east" },
        
        // --- WEST INDIA ---
        { title: "Sprouted Moth Beans", key: "moth_beans_west" },
        { title: "Chana Dal", key: "chana_dal_west" }
      ],
      Vitamins: [
        { title: "Carrot", key: "carrot" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Spinach", key: "spinach" },
        
        // --- NORTH INDIA ---
        { title: "Tomato", key: "tomato_north" },
        { title: "Tori (Ridge Gourd)", key: "tori_north" },
        
        // --- SOUTH INDIA ---
        { title: "Moringa Leaves", key: "moringa_leaves_south" },
        { title: "Amla", key: "amla_south" },
        
        // --- EAST INDIA ---
        { title: "Parwal (Pointed Gourd)", key: "parwal_east" },
        
        // --- WEST INDIA ---
        { title: "Guava", key: "guava_west" }
      ],
      Carbohydrates: [
        { title: "Roti", key: "roti" },
        { title: "Brown Rice", key: "brown_rice" },
        
        // --- NORTH INDIA ---
        { title: "Dalia", key: "dalia_north" },
        { title: "Makki Roti", key: "makki_north" },
        
        // --- SOUTH INDIA ---
        { title: "Ragi Mudde", key: "ragi_millet_south" },
        
        // --- EAST INDIA ---
        { title: "Muri (Puffed Rice)", key: "muri_east" },
        
        // --- WEST INDIA ---
        { title: "Jowar Bhakri", key: "jowar_bhakri_west" }
      ],
      Minerals: [
        { title: "Walnuts", key: "walnuts" },
        { title: "Almonds", key: "almonds" },
        
        // --- NORTH INDIA ---
        { title: "Saunf (Fennel Seeds)", key: "saunf_north" },
        // --- SOUTH INDIA ---
        { title: "Neer Mor (Buttermilk)", key: "neer_mor_south" },
        // --- EAST INDIA ---
        { title: "Coconut Water", key: "coconut_water_east" },
        // --- WEST INDIA ---
        { title: "Dhaniya Water", key: "dhaniya_jeera_west" }
      ]
    },
    exercises: [
      { title: "Running", key: "running" },
      { title: "Cycling", key: "cycling" },
      { title: "Skipping Rope", key: "skipping_rope" },
      { title: "Swimming", key: "swimming" }
    ]
  },

  Teen: {
    foods: {
      Proteins: [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Soya Chunks", key: "soya_chunks" },
        { title: "Rajma", key: "rajma" },
        
        // --- NORTH INDIA ---
        { title: "Kala Chana", key: "kala_chana_north" },
        { title: "White Chana", key: "white_chana_north" },
        
        // --- SOUTH INDIA ---
        { title: "Horse Gram (Kollu)", key: "horse_gram_south" },
        
        // --- EAST INDIA ---
        { title: "Sattu Powder", key: "sattu_east" },
        
        // --- WEST INDIA ---
        { title: "Urad Dal", key: "urad_dal_west" },
        { title: "Moong Usal", key: "moong_usal_west" }
      ],
      Vitamins: [
        { title: "Spinach", key: "spinach" },
        { title: "Apple", key: "apple" },
        
        // --- NORTH INDIA ---
        { title: "Methi Leaves", key: "methi_leaves_north" },
        { title: "Bathua", key: "bathua_north" },
        
        // --- SOUTH INDIA ---
        { title: "Moringa Leaves", key: "moringa_leaves_south" },
        { title: "Amla", key: "amla_south" },
        
        // --- EAST INDIA ---
        { title: "Lal Saag", key: "lal_saag_east" },
        
        // --- WEST INDIA ---
        { title: "Tindora", key: "tindora_west" },
        { title: "Kantola", key: "kantola_west" }
      ],
      Carbohydrates: [
        { title: "Brown Rice", key: "brown_rice" },
        { title: "Oats", key: "oats" },
        
        // --- NORTH INDIA ---
        { title: "Bajra Roti", key: "bajra_roti_north" },
        
        // --- SOUTH INDIA ---
        { title: "Matta Rice", key: "matta_rice_south" },
        { title: "Thinai Millet", key: "thinai_south" },
        
        // --- EAST INDIA ---
        { title: "Red Poha", key: "red_poha_east" },
        
        // --- WEST INDIA ---
        { title: "Rajgira", key: "rajgira_west" }
      ],
      Minerals: [
        { title: "Flax Seeds", key: "flax_seeds" },
        { title: "Walnuts", key: "walnuts" },
        
        // --- NORTH INDIA ---
        { title: "Melon Seeds", key: "melon_seeds_north" },
        // --- SOUTH INDIA ---
        { title: "Sesame Seeds", key: "sesame_south" },
        // --- EAST INDIA ---
        { title: "Mustard Seeds", key: "mustard_seeds_east" },
        // --- WEST INDIA ---
        { title: "Sabja Seeds", key: "sabja_seeds_west" }
      ]
    },
    exercises: [
      { title: "Jogging", key: "jogging" },
      { title: "Yoga", key: "yoga" },
      { title: "Burpees", key: "burpees" },
      { title: "Squats", key: "squats" },
      { title: "Sports", key: "running" }
    ]
  },

  Adult: {
    foods: {
      Proteins: [
        { title: "Tofu", key: "tofu" },
        { title: "Moong Dal", key: "moong_dal" },
        { title: "Sprouts", key: "sprouts" },
        
        // --- NORTH INDIA ---
        { title: "Skimmed Paneer", key: "skimmed_paneer_north" },
        { title: "Lobiya Soup", key: "lobiya_soup_north" },
        
        // --- SOUTH INDIA ---
        { title: "Horse Gram Rasam", key: "horse_gram_rasam_south" },
        
        // --- EAST INDIA ---
        { title: "Masoor Dal", key: "masoor_dal_east" },
        
        // --- WEST INDIA ---
        { title: "Chana Dal", key: "chana_dal_west" }
      ],
      Vitamins: [
        { title: "Broccoli", key: "broccoli" },
        { title: "Papaya", key: "papaya" },
        
        // --- NORTH INDIA ---
        { title: "Lauki", key: "lauki_north" },
        { title: "Baingan Bharta", key: "baingan_bharta_north" },
        
        // --- SOUTH INDIA ---
        { title: "Ash Gourd Juice", key: "ash_gourd_south" },
        
        // --- EAST INDIA ---
        { title: "Jhinge", key: "jhinge_east" },
        
        // --- WEST INDIA ---
        { title: "Turiya", key: "turiya_west" }
      ],
      Carbohydrates: [
        { title: "Oats", key: "oats" },
        
        // --- NORTH INDIA ---
        { title: "Barley Roti", key: "barley_roti_north" },
        
        // --- SOUTH INDIA ---
        { title: "Ragi Roti", key: "ragi_south" },
        
        // --- EAST INDIA ---
        { title: "Brown Muri", key: "brown_muri_east" },
        
        // --- WEST INDIA ---
        { title: "Unpolished Poha", key: "unpolished_poha_west" }
      ],
      Minerals: [
        { title: "Flax Seeds", key: "flax_seeds" },
        { title: "Almonds", key: "almonds" },
        
        // --- NORTH INDIA ---
        { title: "Garlic", key: "garlic_north" },
        // --- SOUTH INDIA ---
        { title: "Curry Leaves", key: "curry_leaves_south" },
        // --- EAST INDIA ---
        { title: "Pumpkin Seeds", key: "pumpkin_seeds_east" },
        // --- WEST INDIA ---
        { title: "Kokum (Unsweetened)", key: "kokum_unsweetened_west" }
      ]
    },
    exercises: [
      { title: "Brisk Walking", key: "brisk_walking" },
      { title: "Cycling", key: "cycling" },
      { title: "Yoga", key: "yoga" },
      { title: "Plank", key: "plank" },
      { title: "Lunges", key: "lunges" }
    ]
  },

  OldAge: {
    foods: {
      Proteins: [
        { title: "Mashed Tofu", key: "tofu" },
        { title: "Soft Moong Dal", key: "moong_dal" },
        
        // --- NORTH INDIA ---
        { title: "Lobiya Broth", key: "lobiya_soup_north" },
        
        // --- SOUTH INDIA ---
        { title: "Thin Tuvar Dal", key: "thin_tuvar_dal_south" },
        { title: "Soft Pasi Paruppu", key: "pasi_paruppu_south" },
        
        // --- EAST INDIA ---
        { title: "Chhena Whey", key: "chhena_whey_east" },
        
        // --- WEST INDIA ---
        { title: "Thin Gujarati Kadhi", key: "kadhi_west" }
      ],
      Vitamins: [
        { title: "Spinach Puree", key: "spinach" },
        { title: "Papaya", key: "papaya" },
        
        // --- NORTH INDIA ---
        { title: "Lauki Juice", key: "lauki_north" },
        { title: "Mashed Tori", key: "tori_north" },
        
        // --- SOUTH INDIA ---
        { title: "Chow Chow Soup", key: "chow_chow_south" },
        
        // --- EAST INDIA ---
        { title: "Boiled Raw Banana", key: "raw_banana_east" },
        
        // --- WEST INDIA ---
        { title: "Galka", key: "galka_west" }
      ],
      Carbohydrates: [
        { title: "Oats Porridge", key: "oats" },
        
        // --- NORTH INDIA ---
        { title: "Soft Dalia", key: "dalia_north" },
        { title: "Moong Khichdi", key: "khichdi_north" },
        
        // --- SOUTH INDIA ---
        { title: "Rice Kanji", key: "kanji_south" },
        { title: "Soft Idli", key: "idli_south" },
        
        // --- EAST INDIA ---
        { title: "Fermented Panta Bhat", key: "panta_bhat_east" },
        
        // --- WEST INDIA ---
        { title: "Soft Poha", key: "poha_west" },
        { title: "Jowar Porridge", key: "shira_west" }
      ],
      Minerals: [
        { title: "Crushed Walnuts", key: "walnuts" },
        
        // --- NORTH INDIA ---
        { title: "Ajwain Water", key: "ajwain_north" },
        // --- SOUTH INDIA ---
        { title: "Jeera Water", key: "jeera_water_south" },
        { title: "Ginger Tonic", key: "ginger_tonic_south" },
        // --- EAST INDIA ---
        { title: "Coconut Water", key: "coconut_water_east" },
        // --- WEST INDIA ---
        { title: "Dhaniya Jeera Water", key: "dhaniya_jeera_west" }
      ]
    },
    exercises: [
      { title: "Walking", key: "walking" },
      { title: "Stretching", key: "stretching" },
      { title: "Gentle Yoga", key: "yoga" },
      { title: "Breathing Exercises", key: "yoga" }
    ]
  }
};

// Filter function
export const getFilteredItemsForAge = (
  ageGroup,
  category,
  region
) => {
  const data = ageData[ageGroup];

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
