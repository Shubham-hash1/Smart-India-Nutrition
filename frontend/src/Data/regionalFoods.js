// Regional Foods Database - 30 items per region (North, South, East, West)

const _northFoods = [
  // --- Proteins (8) ---
  { title: "Paneer Tikka", key: "paneer_north", category: "Proteins", calories: 180, protein: 18, carbs: 4, fat: 12 },
  { title: "Moong Dal Soup", key: "moong_dal_north", category: "Proteins", calories: 104, protein: 7, carbs: 19, fat: 0.5 },
  { title: "Kala Chana", key: "kala_chana_north", category: "Proteins", calories: 160, protein: 9, carbs: 27, fat: 2.5 },
  { title: "Rajma Masala", key: "rajma_north", category: "Proteins", calories: 120, protein: 8, carbs: 22, fat: 0.5 },
  { title: "Lobiya Curry", key: "lobiya_north", category: "Proteins", calories: 110, protein: 7.5, carbs: 21, fat: 0.5 },
  { title: "White Chana Soup", key: "white_chana_north", category: "Proteins", calories: 130, protein: 8, carbs: 23, fat: 1.5 },
  { title: "Skimmed Paneer", key: "skimmed_paneer_north", category: "Proteins", calories: 100, protein: 18, carbs: 1.5, fat: 2 },
  { title: "Roasted Chana", key: "roasted_chana_north", category: "Proteins", calories: 160, protein: 10, carbs: 28, fat: 2 },
  
  // --- Vitamins (8) ---
  { title: "Spinach (Palak)", key: "spinach_north", category: "Vitamins", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { title: "Carrot (Gajar)", key: "carrot_north", category: "Vitamins", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  { title: "Lauki Gourd", key: "lauki_north", category: "Vitamins", calories: 15, protein: 0.6, carbs: 3.4, fat: 0.1 },
  { title: "Tori Gourd", key: "tori_north", category: "Vitamins", calories: 17, protein: 0.7, carbs: 3.8, fat: 0.1 },
  { title: "Pumpkin (Kaddu)", key: "pumpkin_north", category: "Vitamins", calories: 26, protein: 1, carbs: 6.5, fat: 0.1 },
  { title: "Methi Leaves", key: "methi_north", category: "Vitamins", calories: 49, protein: 4.4, carbs: 6, fat: 0.9 },
  { title: "Bathua Saag", key: "bathua_north", category: "Vitamins", calories: 43, protein: 4.2, carbs: 7.3, fat: 0.8 },
  { title: "Tomato Mash", key: "tomato_north", category: "Vitamins", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  
  // --- Carbohydrates (7) ---
  { title: "Dalia Porridge", key: "dalia_north", category: "Carbohydrates", calories: 110, protein: 3.5, carbs: 24, fat: 0.5 },
  { title: "Bajra Roti", key: "bajra_roti_north", category: "Carbohydrates", calories: 135, protein: 3.8, carbs: 27, fat: 1.3 },
  { title: "Barley Roti", key: "barley_roti_north", category: "Carbohydrates", calories: 115, protein: 3.2, carbs: 23, fat: 0.8 },
  { title: "Makki Roti", key: "makki_roti_north", category: "Carbohydrates", calories: 145, protein: 3.5, carbs: 29, fat: 1.8 },
  { title: "Wheat Roti", key: "roti_north", category: "Carbohydrates", calories: 120, protein: 3.5, carbs: 26, fat: 0.8 },
  { title: "Suji Porridge", key: "suji_north", category: "Carbohydrates", calories: 150, protein: 4.5, carbs: 32, fat: 1 },
  { title: "Khichdi", key: "khichdi_north", category: "Carbohydrates", calories: 160, protein: 5, carbs: 32, fat: 1.5 },
  
  // --- Minerals (7) ---
  { title: "Almonds", key: "almonds_north", category: "Minerals", calories: 160, protein: 6, carbs: 6, fat: 14 },
  { title: "Walnuts", key: "walnuts_north", category: "Minerals", calories: 185, protein: 4, carbs: 4, fat: 18 },
  { title: "Saunf Water", key: "saunf_water_north", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Ajwain Infusion", key: "ajwain_water_north", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Garlic Bulb", key: "garlic_north", category: "Minerals", calories: 4, protein: 0.2, carbs: 1, fat: 0 },
  { title: "Melon Seeds", key: "melon_seeds_north", category: "Minerals", calories: 140, protein: 7, carbs: 5, fat: 12 },
  { title: "Mishri Infusion", key: "mishri_water_north", category: "Minerals", calories: 40, protein: 0, carbs: 10, fat: 0 }
];

const _southFoods = [
  // --- Proteins (8) ---
  { title: "Horse Gram Rasam", key: "horse_gram_south", category: "Proteins", calories: 85, protein: 6, carbs: 15, fat: 0.5 },
  { title: "Tuvar Dal", key: "tuvar_dal_south", category: "Proteins", calories: 110, protein: 7, carbs: 20, fat: 0.5 },
  { title: "Sundal Chickpeas", key: "sundal_south", category: "Proteins", calories: 140, protein: 8, carbs: 24, fat: 2 },
  { title: "Pasi Paruppu", key: "pasi_paruppu_south", category: "Proteins", calories: 100, protein: 7, carbs: 18, fat: 0.4 },
  { title: "Kollu Sundal", key: "kollu_sundal_south", category: "Proteins", calories: 130, protein: 8.5, carbs: 22, fat: 1.2 },
  { title: "Urad Dal Kootu", key: "urad_dal_south", category: "Proteins", calories: 120, protein: 8, carbs: 22, fat: 0.8 },
  { title: "Sambar Dal", key: "sambar_dal_south", category: "Proteins", calories: 105, protein: 6.5, carbs: 19, fat: 0.6 },
  { title: "Ellu Podi", key: "ellu_podi_south", category: "Proteins", calories: 150, protein: 5, carbs: 8, fat: 12 },
  
  // --- Vitamins (8) ---
  { title: "Moringa Leaves", key: "moringa_leaves_south", category: "Vitamins", calories: 37, protein: 4.8, carbs: 8.3, fat: 0.6 },
  { title: "Ash Gourd Juice", key: "ash_gourd_south", category: "Vitamins", calories: 13, protein: 0.4, carbs: 3, fat: 0.1 },
  { title: "Chow Chow Squash", key: "chow_chow_south", category: "Vitamins", calories: 19, protein: 0.8, carbs: 4.5, fat: 0.1 },
  { title: "Curry Leaves", key: "curry_leaves_south", category: "Vitamins", calories: 11, protein: 0.6, carbs: 1.9, fat: 0.1 },
  { title: "Amla Gooseberry", key: "amla_south", category: "Vitamins", calories: 44, protein: 0.5, carbs: 10, fat: 0.1 },
  { title: "Tindora Squash", key: "tindora_south", category: "Vitamins", calories: 21, protein: 1.2, carbs: 3.5, fat: 0.1 },
  { title: "Coconut Meat", key: "coconut_south", category: "Vitamins", calories: 354, protein: 3.3, carbs: 15, fat: 33 },
  { title: "Tamarind Pulp", key: "tamarind_south", category: "Vitamins", calories: 239, protein: 2.8, carbs: 62, fat: 0.6 },
  
  // --- Carbohydrates (7) ---
  { title: "Ragi Mudde", key: "ragi_millet_south", category: "Carbohydrates", calories: 140, protein: 3.2, carbs: 31, fat: 0.6 },
  { title: "Matta Rice", key: "matta_rice_south", category: "Carbohydrates", calories: 130, protein: 2.8, carbs: 28, fat: 0.4 },
  { title: "Thinai Millet", key: "thinai_millet_south", category: "Carbohydrates", calories: 135, protein: 4.1, carbs: 27, fat: 1.1 },
  { title: "Steamed Idli", key: "idli_south", category: "Carbohydrates", calories: 80, protein: 2, carbs: 17, fat: 0.2 },
  { title: "Plain Dosa", key: "dosa_south", category: "Carbohydrates", calories: 120, protein: 2.5, carbs: 26, fat: 1.5 },
  { title: "Curd Rice", key: "curd_rice_south", category: "Carbohydrates", calories: 150, protein: 4, carbs: 29, fat: 2 },
  { title: "Rice Kanji", key: "kanji_south", category: "Carbohydrates", calories: 90, protein: 1.5, carbs: 21, fat: 0.1 },
  
  // --- Minerals (7) ---
  { title: "Black Pepper", key: "black_pepper_south", category: "Minerals", calories: 6, protein: 0.2, carbs: 1.5, fat: 0.1 },
  { title: "Jeera Water", key: "jeera_south", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Neer Mor", key: "neer_mor_south", category: "Minerals", calories: 30, protein: 1.5, carbs: 2, fat: 1.5 },
  { title: "Sesame Seeds", key: "sesame_south", category: "Minerals", calories: 160, protein: 5, carbs: 7, fat: 14 },
  { title: "Cardamom Pods", key: "cardamom_south", category: "Minerals", calories: 6, protein: 0.2, carbs: 1.4, fat: 0.1 },
  { title: "Curry Leaves Tea", key: "curry_tea_south", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Ginger Lemon Tonic", key: "ginger_tonic_south", category: "Minerals", calories: 15, protein: 0.2, carbs: 3.5, fat: 0 }
];

const _eastFoods = [
  // --- Proteins (8) ---
  { title: "Sattu Flour", key: "sattu_east", category: "Proteins", calories: 160, protein: 10, carbs: 27, fat: 2.2 },
  { title: "Masoor Dal", key: "masoor_dal_east", category: "Proteins", calories: 110, protein: 8, carbs: 20, fat: 0.4 },
  { title: "Low-Fat Chhena", key: "low_fat_chhena_east", category: "Proteins", calories: 115, protein: 14, carbs: 3, fat: 4 },
  { title: "Chhena Whey", key: "chhena_whey_east", category: "Proteins", calories: 45, protein: 4.5, carbs: 6, fat: 0.2 },
  { title: "Mash Dal", key: "mash_dal_east", category: "Proteins", calories: 115, protein: 8, carbs: 21, fat: 0.5 },
  { title: "Mustard Fish Stew", key: "fish_stew_east", category: "Proteins", calories: 140, protein: 18, carbs: 3, fat: 6 },
  { title: "Roasted Chhena", key: "roasted_chhena_east", category: "Proteins", calories: 150, protein: 13, carbs: 6, fat: 6 },
  { title: "Prawn Masala", key: "prawn_east", category: "Proteins", calories: 110, protein: 16, carbs: 2, fat: 3 },
  
  // --- Vitamins (8) ---
  { title: "Parwal Gourd", key: "parwal_east", category: "Vitamins", calories: 20, protein: 1.5, carbs: 3.5, fat: 0.1 },
  { title: "Raw Banana", key: "raw_banana_east", category: "Vitamins", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { title: "Jhinge Gourd", key: "jhinge_east", category: "Vitamins", calories: 18, protein: 0.8, carbs: 4, fat: 0.1 },
  { title: "Lal Saag", key: "lal_saag_east", category: "Vitamins", calories: 28, protein: 2.5, carbs: 5, fat: 0.3 },
  { title: "Bamboo Shoot", key: "bamboo_shoot_east", category: "Vitamins", calories: 27, protein: 2.6, carbs: 5.2, fat: 0.3 },
  { title: "Banana Flower", key: "banana_flower_east", category: "Vitamins", calories: 35, protein: 1.8, carbs: 7, fat: 0.2 },
  { title: "Litchi Fruit", key: "litchi_east", category: "Vitamins", calories: 66, protein: 0.8, carbs: 16.5, fat: 0.4 },
  { title: "Poppy Seeds", key: "poppy_seeds_east", category: "Vitamins", calories: 130, protein: 4.5, carbs: 6, fat: 10 },
  
  // --- Carbohydrates (7) ---
  { title: "Muri Puffed Rice", key: "muri_east", category: "Carbohydrates", calories: 75, protein: 1.2, carbs: 17, fat: 0.1 },
  { title: "Soft Chira", key: "chira_east", category: "Carbohydrates", calories: 110, protein: 2, carbs: 25, fat: 0.3 },
  { title: "Panta Bhat", key: "panta_bhat_east", category: "Carbohydrates", calories: 120, protein: 2.2, carbs: 26, fat: 0.2 },
  { title: "Red Poha", key: "red_poha_east", category: "Carbohydrates", calories: 125, protein: 2.4, carbs: 27, fat: 0.4 },
  { title: "Jowar Jolpan", key: "jowar_jolpan_east", category: "Carbohydrates", calories: 115, protein: 3, carbs: 24, fat: 0.5 },
  { title: "Litti Baked", key: "litti_east", category: "Carbohydrates", calories: 180, protein: 5.5, carbs: 36, fat: 2 },
  { title: "Rice Upma", key: "muri_upma_east", category: "Carbohydrates", calories: 130, protein: 2.5, carbs: 28, fat: 1.5 },
  
  // --- Minerals (7) ---
  { title: "Coconut Water", key: "coconut_water_east", category: "Minerals", calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2 },
  { title: "Kalongi Seeds", key: "kalongi_east", category: "Minerals", calories: 10, protein: 0.4, carbs: 1.5, fat: 0.6 },
  { title: "Tejpatta Bay Leaf", key: "bay_leaf_east", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Mustard Seeds", key: "mustard_seeds_east", category: "Minerals", calories: 12, protein: 0.6, carbs: 1, fat: 0.8 },
  { title: "Pumpkin Seeds", key: "pumpkin_seeds_east", category: "Minerals", calories: 126, protein: 5, carbs: 15, fat: 5 },
  { title: "Black Salt", key: "black_salt_east", category: "Minerals", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { title: "Sabja Drink", key: "sabja_lemon_east", category: "Minerals", calories: 25, protein: 0.5, carbs: 5, fat: 0 }
];

const _westFoods = [
  // --- Proteins (8) ---
  { title: "Moong Usal", key: "moong_usal_west", category: "Proteins", calories: 115, protein: 8, carbs: 20, fat: 0.8 },
  { title: "Moth Beans", key: "moth_beans_west", category: "Proteins", calories: 120, protein: 8.5, carbs: 21, fat: 0.8 },
  { title: "Chana Dal", key: "chana_dal_west", category: "Proteins", calories: 130, protein: 8, carbs: 22, fat: 1.5 },
  { title: "Urad Dal", key: "urad_dal_west", category: "Proteins", calories: 120, protein: 9, carbs: 21, fat: 0.6 },
  { title: "Toor Dal", key: "toor_dal_west", category: "Proteins", calories: 110, protein: 7.2, carbs: 20, fat: 0.5 },
  { title: "Besan Chilla", key: "besan_chilla_west", category: "Proteins", calories: 140, protein: 7.5, carbs: 20, fat: 3 },
  { title: "Daal Baati", key: "daal_baati_west", category: "Proteins", calories: 220, protein: 8, carbs: 38, fat: 5 },
  { title: "Sprouted Chana", key: "sprouted_chana_west", category: "Proteins", calories: 140, protein: 8.5, carbs: 23, fat: 1.8 },
  
  // --- Vitamins (8) ---
  { title: "Guava Fruit", key: "guava_west", category: "Vitamins", calories: 68, protein: 2.6, carbs: 14, fat: 1 },
  { title: "Tindora Gourd", key: "tindora_west", category: "Vitamins", calories: 20, protein: 1, carbs: 3.8, fat: 0.1 },
  { title: "Kantola Gourd", key: "kantola_west", category: "Vitamins", calories: 23, protein: 1.4, carbs: 4.2, fat: 0.1 },
  { title: "Turiya Gourd", key: "turiya_west", category: "Vitamins", calories: 17, protein: 0.7, carbs: 3.7, fat: 0.1 },
  { title: "Galka Gourd", key: "galka_west", category: "Vitamins", calories: 16, protein: 0.6, carbs: 3.5, fat: 0.1 },
  { title: "Alphonso Mango", key: "mango_west", category: "Vitamins", calories: 60, protein: 0.8, carbs: 15, fat: 0.3 },
  { title: "Chickoo Fruit", key: "chickoo_west", category: "Vitamins", calories: 83, protein: 0.4, carbs: 20, fat: 1.1 },
  { title: "Custard Apple", key: "custard_apple_west", category: "Vitamins", calories: 94, protein: 2.1, carbs: 23, fat: 0.3 },
  
  // --- Carbohydrates (7) ---
  { title: "Jowar Bhakri", key: "jowar_bhakri_west", category: "Carbohydrates", calories: 130, protein: 3.5, carbs: 28, fat: 1 },
  { title: "Rajgira Grain", key: "rajgira_west", category: "Carbohydrates", calories: 145, protein: 5.5, carbs: 26, fat: 2 },
  { title: "Unpolished Poha", key: "unpolished_poha_west", category: "Carbohydrates", calories: 120, protein: 2.5, carbs: 26, fat: 0.5 },
  { title: "Shira Porridge", key: "shira_west", category: "Carbohydrates", calories: 160, protein: 3.5, carbs: 32, fat: 2 },
  { title: "Bajra Roti", key: "bajra_roti_west", category: "Carbohydrates", calories: 135, protein: 3.8, carbs: 27, fat: 1.3 },
  { title: "Thepla", key: "thepla_west", category: "Carbohydrates", calories: 150, protein: 4, carbs: 24, fat: 4 },
  { title: "White Peas Ragda", key: "ragda_west", category: "Carbohydrates", calories: 110, protein: 6, carbs: 20, fat: 0.5 },
  
  // --- Minerals (7) ---
  { title: "Kokum Sharbat", key: "kokum_west", category: "Minerals", calories: 15, protein: 0.1, carbs: 3.5, fat: 0 },
  { title: "Dhaniya-Jeera", key: "dhaniya_jeera_west", category: "Minerals", calories: 5, protein: 0.1, carbs: 1, fat: 0 },
  { title: "Masala Chaas", key: "chaas_west", category: "Minerals", calories: 35, protein: 1.8, carbs: 2.5, fat: 1.5 },
  { title: "Sabja Seeds", key: "sabja_seeds_west", category: "Minerals", calories: 20, protein: 0.6, carbs: 3, fat: 1.2 },
  { title: "Peanuts", key: "peanuts_west", category: "Minerals", calories: 160, protein: 7, carbs: 6, fat: 14 },
  { title: "Cashews", key: "cashews_west", category: "Minerals", calories: 155, protein: 5, carbs: 9, fat: 12 },
  { title: "Dates Fruit", key: "dates_west", category: "Minerals", calories: 282, protein: 2.5, carbs: 75, fat: 0.4 }
];

export const northFoods = _northFoods;
export const southFoods = _southFoods;
export const eastFoods = _eastFoods;
export const westFoods = _westFoods;

// Dynamically generate the mapping object
const _regionalMapping = {};

_northFoods.forEach(f => { _regionalMapping[f.key] = "North"; });
_southFoods.forEach(f => { _regionalMapping[f.key] = "South"; });
_eastFoods.forEach(f => { _regionalMapping[f.key] = "East"; });
_westFoods.forEach(f => { _regionalMapping[f.key] = "West"; });

export const regionalMapping = _regionalMapping;

/**
 * Normalizes input and returns the region.
 * Handles spaces and case-sensitivity.
 */
const _getRegionForFood = (key) => {
  if (!key) return "Common";
  const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
  return _regionalMapping[normalizedKey] || "Common";
};

export const getRegionForFood = _getRegionForFood;