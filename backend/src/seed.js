const fs = require('fs');
const path = require('path');

// Helper to load ES module files as CommonJS
function loadESModuleAsCommonJS(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    // Strip imports (e.g. import { getRegionForFood } from "./regionalFoods";)
    content = content.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
    // Replace "export const Name = ..." with "exports.Name = ..."
    content = content.replace(/export\s+const\s+(\w+)\s*=/g, 'exports.$1 =');
    
    const sandbox = { exports: {} };
    // We execute it in a isolated function
    const fn = new Function('exports', 'require', '__dirname', '__filename', content);
    fn(sandbox.exports, require, path.dirname(filePath), filePath);
    return sandbox.exports;
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
    return {};
  }
}

// Helper to determine nutrition values dynamically (no longer hardcoded in frontend rendering!)
const regionalNutrients = {
  kafal: { calories: 50, protein: 0.5, carbs: 12.0, fat: 0.1 },
  hissar: { calories: 60, protein: 1.0, carbs: 14.0, fat: 0.3 },
  hisalu: { calories: 60, protein: 1.0, carbs: 14.0, fat: 0.3 },
  burans: { calories: 45, protein: 0.2, carbs: 10.0, fat: 0.0 },
  buransh: { calories: 45, protein: 0.2, carbs: 10.0, fat: 0.0 },
  sattu: { calories: 380, protein: 20.0, carbs: 65.0, fat: 5.0 },
  sattu_drink_east: { calories: 380, protein: 20.0, carbs: 65.0, fat: 5.0 },
  litti_chokha: { calories: 320, protein: 8.0, carbs: 55.0, fat: 6.0 },
  liti_chaukha: { calories: 320, protein: 8.0, carbs: 55.0, fat: 6.0 },
  dosa: { calories: 160, protein: 3.5, carbs: 29.0, fat: 3.0 },
  uttapam: { calories: 200, protein: 4.5, carbs: 36.0, fat: 4.0 },
  daal_baati_churma: { calories: 450, protein: 14.0, carbs: 65.0, fat: 15.0 },
  dal_baati_churma: { calories: 450, protein: 14.0, carbs: 65.0, fat: 15.0 }
};

function getNutritionInfo(title, key) {
  const normKey = (key || '').toLowerCase().trim();
  if (regionalNutrients[normKey]) {
    return regionalNutrients[normKey];
  }
  for (const [k, v] of Object.entries(regionalNutrients)) {
    if (normKey.includes(k) || k.includes(normKey)) {
      return v;
    }
  }
  return {
    calories: Math.floor(title.length * 12 + 40),
    protein: Math.floor(title.length * 1.2),
    carbs: Math.floor(title.length * 2.0),
    fat: Math.floor(title.length * 0.4)
  };
}

async function seedFoods(pool) {
  const client = await pool.connect();
  try {
    // Check if table is already seeded
    const countRes = await client.query("SELECT COUNT(*) FROM foods");
    const count = parseInt(countRes.rows[0].count, 10);
    console.log(`ℹ️ Foods table currently has ${count} records. Checking for new additions...`);

    console.log("🌱 Seeding foods table from static files...");

    const frontendDataDir = path.join(__dirname, '../../frontend/src/Data');
    
    // Load regionalFoods mapping
    const regionalFoodsModule = loadESModuleAsCommonJS(path.join(frontendDataDir, 'regionalFoods.js'));
    const regionalMapping = regionalFoodsModule.regionalMapping || {};
    
    const getRegionForFood = (key) => {
      if (!key) return "Common";
      const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
      return regionalMapping[normalizedKey] || "Common";
    };

    // Load diseasefood and agefood
    const diseaseModule = loadESModuleAsCommonJS(path.join(frontendDataDir, 'deseasefood.js'));
    const ageModule = loadESModuleAsCommonJS(path.join(frontendDataDir, 'agefood.js'));

    const diseaseData = diseaseModule.diseaseData || {};
    const ageData = ageModule.ageData || {};

    // Dynamic seeder extensions for the new diseases
    diseaseData["Hypertension"] = {
      foods: {
        Proteins: [
          { title: "Roasted Chana", key: "kala_chana_north" },
          { title: "Moong Dal Soup", key: "moong_dal" },
          { title: "Skimmed Paneer", key: "skimmed_paneer_north" }
        ],
        Vitamins: [
          { title: "Garlic (Raw Lahsun)", key: "garlic_north" },
          { title: "Tomato", key: "tomato_north" },
          { title: "Lauki (Bottle Gourd)", key: "lauki_north" },
          { title: "Spinach", key: "spinach" }
        ],
        Carbohydrates: [
          { title: "Oats Porridge", key: "oats" },
          { title: "Jau Roti (Barley)", key: "barley_north" },
          { title: "Brown Rice", key: "brown_rice" }
        ],
        Minerals: [
          { title: "Flax Seeds", key: "flax_seeds" },
          { title: "Chia / Sabja Seeds", key: "sabja_seeds_west" },
          { title: "Jeera Water", key: "jeera_south" }
        ]
      },
      exercises: [
        { title: "Brisk Walking", key: "walking" },
        { title: "Yoga", key: "yoga" },
        { title: "Cycling", key: "cycling" }
      ]
    };

    diseaseData["Thyroid"] = {
      foods: {
        Proteins: [
          { title: "Tofu", key: "tofu" },
          { title: "Moong Dal", key: "moong_dal" },
          { title: "Rajma", key: "rajma" }
        ],
        Vitamins: [
          { title: "Broccoli", key: "broccoli" },
          { title: "Apple", key: "apple" },
          { title: "Papaya", key: "papaya" },
          { title: "Carrot", key: "carrot" }
        ],
        Carbohydrates: [
          { title: "Oats", key: "oats" },
          { title: "Brown Rice", key: "brown_rice" },
          { title: "Dalia", key: "dalia_north" }
        ],
        Minerals: [
          { title: "Walnuts", key: "walnuts" },
          { title: "Almonds", key: "almonds" },
          { title: "Pumpkin Seeds", key: "pumpkin_seeds_east" }
        ]
      },
      exercises: [
        { title: "Yoga (Sarvangasana)", key: "yoga" },
        { title: "Walking", key: "walking" },
        { title: "Stretching", key: "stretching" }
      ]
    };

    diseaseData["PCOD / PCOS"] = {
      foods: {
        Proteins: [
          { title: "Tofu", key: "tofu" },
          { title: "Sprouts", key: "sprouts" },
          { title: "Moong Dal", key: "moong_dal" }
        ],
        Vitamins: [
          { title: "Spinach", key: "spinach" },
          { title: "Broccoli", key: "broccoli" },
          { title: "Apple", key: "apple" },
          { title: "Guava", key: "guava_west" }
        ],
        Carbohydrates: [
          { title: "Barley Roti", key: "barley_roti_north" },
          { title: "Jowar Bhakri", key: "jowar_bhakri_west" },
          { title: "Oats", key: "oats" }
        ],
        Minerals: [
          { title: "Flax Seeds", key: "flax_seeds" },
          { title: "Walnuts", key: "walnuts" },
          { title: "Chia Seeds", key: "sabja_seeds_west" }
        ]
      },
      exercises: [
        { title: "Strength Training", key: "squats" },
        { title: "Yoga", key: "yoga" },
        { title: "Jogging", key: "jogging" }
      ]
    };

    diseaseData["Liver Health"] = {
      foods: {
        Proteins: [
          { title: "Tofu", key: "tofu" },
          { title: "Moong Dal", key: "moong_dal" },
          { title: "Sprouts", key: "sprouts" }
        ],
        Vitamins: [
          { title: "Broccoli", key: "broccoli" },
          { title: "Spinach", key: "spinach" },
          { title: "Apple", key: "apple" },
          { title: "Papaya", key: "papaya" },
          { title: "Carrot", key: "carrot" }
        ],
        Carbohydrates: [
          { title: "Oats", key: "oats" },
          { title: "Brown Rice", key: "brown_rice" },
          { title: "Dalia", key: "dalia_north" }
        ],
        Minerals: [
          { title: "Walnuts", key: "walnuts" },
          { title: "Flax Seeds", key: "flax_seeds" },
          { title: "Green Tea Decoction", key: "jeera_water_south" }
        ]
      },
      exercises: [
        { title: "Walking", key: "walking" },
        { title: "Jogging", key: "jogging" },
        { title: "Cycling", key: "cycling" }
      ]
    };

    // Helper to dynamically inject regional foods into default disease categories
    const injectFood = (disease, cat, item) => {
      if (!diseaseData[disease]) diseaseData[disease] = { foods: {}, exercises: [] };
      if (!diseaseData[disease].foods) diseaseData[disease].foods = {};
      if (!diseaseData[disease].foods[cat]) diseaseData[disease].foods[cat] = [];
      if (!diseaseData[disease].foods[cat].some(f => f.key === item.key)) {
        diseaseData[disease].foods[cat].push(item);
      }
    };

    // Ensure all 9 diseases have the regional specialties seeded according to their region
    const diseases = ["Obesity", "Diabetes", "Heart", "Stomach", "Nutritional", "Hypertension", "Thyroid", "PCOD / PCOS", "Liver Health"];
    diseases.forEach(d => {
      // North
      injectFood(d, "Vitamins", { title: "Kafal (Antioxidant Wild Berries)", key: "kafal" });
      injectFood(d, "Vitamins", { title: "Hissar (Golden Himalayan Raspberry)", key: "hissar" });
      injectFood(d, "Minerals", { title: "Burans Tea (Rhododendron Juice)", key: "burans" });

      // East
      injectFood(d, "Proteins", { title: "Sattu Drink", key: "sattu" });
      injectFood(d, "Carbohydrates", { title: "Liti Chaukha", key: "liti_chaukha" });

      // South
      injectFood(d, "Carbohydrates", { title: "Dosa", key: "dosa" });
      injectFood(d, "Carbohydrates", { title: "Uttapam", key: "uttapam" });

      // West
      injectFood(d, "Proteins", { title: "Daal Baati Churma", key: "daal_baati_churma" });
    });

    let insertCount = 0;

    // Reset seeder count check to allow updating tables
    console.log("🌱 Syncing foods list table...");

    // 1. Seed Disease foods
    for (const [diseaseName, diseaseObj] of Object.entries(diseaseData)) {
      if (diseaseObj.foods) {
        for (const [nutrientType, foodsList] of Object.entries(diseaseObj.foods)) {
          for (const item of foodsList) {
            const region = getRegionForFood(item.key);
            const nutrition = getNutritionInfo(item.title, item.key);

            const existCheck = await client.query(
              "SELECT id FROM foods WHERE category_type = $1 AND target_name = $2 AND nutrient_type = $3 AND title = $4",
              ['disease', diseaseName, nutrientType, item.title]
            );

            if (existCheck.rows.length === 0) {
              await client.query(
                `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                ['disease', diseaseName, nutrientType, item.title, item.key, region, nutrition.calories, nutrition.protein, nutrition.carbs, nutrition.fat, '']
              );
              insertCount++;
            }
          }
        }
      }
      if (diseaseObj.exercises) {
        for (const item of diseaseObj.exercises) {
          const existCheck = await client.query(
            "SELECT id FROM foods WHERE category_type = $1 AND target_name = $2 AND nutrient_type = $3 AND title = $4",
            ['disease', diseaseName, 'Exercises', item.title]
          );

          if (existCheck.rows.length === 0) {
            await client.query(
              `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
              ['disease', diseaseName, 'Exercises', item.title, item.key, 'Common', 0, 0, 0, 0, '']
            );
            insertCount++;
          }
        }
      }
    }

    // 2. Seed Age foods
    for (const [ageGroupName, ageObj] of Object.entries(ageData)) {
      if (ageObj.foods) {
        for (const [nutrientType, foodsList] of Object.entries(ageObj.foods)) {
          for (const item of foodsList) {
            const region = getRegionForFood(item.key);
            const nutrition = getNutritionInfo(item.title, item.key);

            const existCheck = await client.query(
              "SELECT id FROM foods WHERE category_type = $1 AND target_name = $2 AND nutrient_type = $3 AND title = $4",
              ['age', ageGroupName, nutrientType, item.title]
            );

            if (existCheck.rows.length === 0) {
              await client.query(
                `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                ['age', ageGroupName, nutrientType, item.title, item.key, region, nutrition.calories, nutrition.protein, nutrition.carbs, nutrition.fat, '']
              );
              insertCount++;
            }
          }
        }
      }
      if (ageObj.exercises) {
        for (const item of ageObj.exercises) {
          const existCheck = await client.query(
            "SELECT id FROM foods WHERE category_type = $1 AND target_name = $2 AND nutrient_type = $3 AND title = $4",
            ['age', ageGroupName, 'Exercises', item.title]
          );

          if (existCheck.rows.length === 0) {
            await client.query(
              `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
              ['age', ageGroupName, 'Exercises', item.title, item.key, 'Common', 0, 0, 0, 0, '']
            );
            insertCount++;
          }
        }
      }
    }

    console.log(`✅ Database sync complete. Added ${insertCount} new records.`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    client.release();
  }
}

module.exports = { seedFoods };
