export const regionalMapping = {
  // North (Himachal Pradesh, Punjab, Uttarakhand, UP, Haryana, Delhi, J&K, Ladakh)
  apple: "North",
  rajma: "North",
  chickpeas: "North", // Chole
  daliya: "North",
  roti: "North",
  paneer: "North",
  spinach: "North", // Saag
  carrot: "North",
  walnuts: "North",
  almonds: "North",
  
  // South (Kerala, Tamil Nadu, Karnataka, Telangana, Andhra Pradesh)
  coconut: "South",
  tamarind: "South",
  banana: "South",
  curry_leaves: "South",
  brown_rice: "South",
  
  // East (West Bengal, Odisha, Bihar, Jharkhand)
  mustard_oil: "East",
  bamboo_shoot: "East",
  fish: "East",
  
  // West (Rajasthan, Gujarat, Maharashtra, Goa)
  bajra_roti: "West",
  jowar_roti: "West",
  peanuts: "West",
  besan_chilla: "West",
  flax_seeds: "West",
  
  // Common / General
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
};

export const getRegionForFood = (key) => {
  return regionalMapping[key.toLowerCase()] || "Common";
};
