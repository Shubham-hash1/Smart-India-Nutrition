export const regionalMapping = {
  // --- NORTH ---
  apple: "North",
  rajma: "North",
  chickpeas: "North",
  daliya: "North",
  roti: "North",
  paneer: "North",
  spinach: "North",
  carrot: "North",
  walnuts: "North",
  almonds: "North",
  mustard_greens: "North",
  cauliflower: "North",
  pomegranate: "North",
  corn_flour: "North",
  buckwheat: "North",
  peaches: "North",
  apricots: "North",
  lotus_stem: "North", // Nadru

  // --- SOUTH ---
  coconut: "South",
  tamarind: "South",
  banana: "South",
  curry_leaves: "South",
  brown_rice: "South",
  ragi: "South",
  drumsticks: "South",
  idli_rice: "South",
  black_pepper: "South",
  jackfruit: "South",
  coffee: "South",
  cardamom: "South",
  pearl_millet: "South", // Kambu
  red_rice: "South",
  raw_mango: "South",
  tapioca: "South",
  cocoa: "South",

  // --- EAST ---
  mustard_oil: "East",
  bamboo_shoot: "East",
  fish: "East",
  poppy_seeds: "East",
  pointed_gourd: "East",
  puffed_rice: "East",
  sattu: "East",
  green_chili: "East",
  banana_flower: "East",
  litchi: "East",
  nigella_seeds: "East", // Kalonji
  ridge_gourd: "East", // Jhinge
  prawns: "East",
  elephant_foot_yam: "East", // Ol
  ash_gourd: "East",

  // --- WEST ---
  bajra_roti: "West",
  jowar_roti: "West",
  peanuts: "West",
  besan_chilla: "West",
  flax_seeds: "West",
  thepla: "West",
  alphonso_mango: "West",
  kokum: "West",
  white_peas: "West",
  cashew: "West",
  amaranth: "West", // Rajgira
  custard_apple: "West",
  dates: "West",
  sorghum: "West",
  sesame_seeds: "West",
  chickoo: "West",

  // --- NORTH EAST ---
  black_rice: "North East",
  king_chili: "North East",
  fermented_soybean: "North East",
  yam: "North East",
  silkworm: "North East",
  fiddlehead_fern: "North East",
  perilla_seeds: "North East",
  star_fruit: "North East",
  passion_fruit: "North East",
  smoked_pork: "North East",
  sticky_rice: "North East",
  dry_fish: "North East",
  stink_bean: "North East", // Parkia/Yongchak
  local_greens: "North East",
  arrowroot: "North East",
  bird_eye_chili: "North East",

  // --- COMMON / GENERAL ---
  moong_dal: "Common",
  masoor_dal: "Common",
  sprouts: "Common",
  tofu: "Common",
  soya_chunks: "Common",
  broccoli: "Common",
  cabbage: "Common",
  lauki: "Common",
  tori: "Common",
  cucumber: "Common",
  beans: "Common",
  mushrooms: "Common",
  papaya: "Common",
  guava: "Common",
  orange: "Common",
  watermelon: "Common",
  pineapple: "Common",
  avacado: "Common",
  oats: "Common",
  egg: "Common",
  milk: "Common",
  garlic: "Common",
  ginger: "Common",
  onion: "Common",
  tomato: "Common",
  potato: "Common"
};

/**
 * Normalizes input and returns the region.
 * Handles spaces and case-sensitivity.
 */
export const getRegionForFood = (key) => {
  if (!key) return "Common";
  const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
  return regionalMapping[normalizedKey] || "Common";
};