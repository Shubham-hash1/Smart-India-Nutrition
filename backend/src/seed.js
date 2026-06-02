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
    // We execute it in an isolated function
    const fn = new Function('exports', 'require', '__dirname', '__filename', content);
    fn(sandbox.exports, require, path.dirname(filePath), filePath);
    return sandbox.exports;
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
    return {};
  }
}

async function seedFoods(pool) {
  const client = await pool.connect();
  try {
    console.log("🧹 Clearing old foods database entries for clean seeding...");
    await client.query("DELETE FROM foods");

    console.log("🌱 Seeding foods table from static files...");

    const frontendDataDir = path.join(__dirname, '../../frontend/src/Data');
    
    // Load regionalFoods mapping
    const regionalFoodsModule = loadESModuleAsCommonJS(path.join(frontendDataDir, 'regionalFoods.js'));
    global.regionalFoodsSandbox = regionalFoodsModule;
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

    let insertCount = 0;

    // 1. Seed Disease foods
    for (const [diseaseName, diseaseObj] of Object.entries(diseaseData)) {
      if (diseaseObj.foods) {
        for (const [nutrientType, foodsList] of Object.entries(diseaseObj.foods)) {
          for (const item of foodsList) {
            const region = getRegionForFood(item.key);
            
            // Extract nutrition from food item directly
            const calories = item.calories !== undefined ? parseInt(item.calories, 10) : 120;
            const protein = item.protein !== undefined ? parseFloat(item.protein) : 4.0;
            const carbs = item.carbs !== undefined ? parseFloat(item.carbs) : 15.0;
            const fat = item.fat !== undefined ? parseFloat(item.fat) : 2.0;
            const description = item.description || '';

            await client.query(
              `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
              ['disease', diseaseName, nutrientType, item.title, item.key, region, calories, protein, carbs, fat, description]
            );
            insertCount++;
          }
        }
      }
      if (diseaseObj.exercises) {
        for (const item of diseaseObj.exercises) {
          await client.query(
            `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            ['disease', diseaseName, 'Exercises', item.title, item.key, 'Common', 0, 0, 0, 0, '']
          );
          insertCount++;
        }
      }
    }

    // 2. Seed Age foods
    for (const [ageGroupName, ageObj] of Object.entries(ageData)) {
      if (ageObj.foods) {
        for (const [nutrientType, foodsList] of Object.entries(ageObj.foods)) {
          for (const item of foodsList) {
            const region = getRegionForFood(item.key);
            
            // Extract nutrition from food item directly
            const calories = item.calories !== undefined ? parseInt(item.calories, 10) : 120;
            const protein = item.protein !== undefined ? parseFloat(item.protein) : 4.0;
            const carbs = item.carbs !== undefined ? parseFloat(item.carbs) : 15.0;
            const fat = item.fat !== undefined ? parseFloat(item.fat) : 2.0;
            const description = item.description || '';

            await client.query(
              `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
              ['age', ageGroupName, nutrientType, item.title, item.key, region, calories, protein, carbs, fat, description]
            );
            insertCount++;
          }
        }
      }
      if (ageObj.exercises) {
        for (const item of ageObj.exercises) {
          await client.query(
            `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            ['age', ageGroupName, 'Exercises', item.title, item.key, 'Common', 0, 0, 0, 0, '']
          );
          insertCount++;
        }
      }
    }

    console.log(`✅ Database sync complete. Seeded ${insertCount} records.`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    // Clean up sandboxed global to avoid memory leaks or conflicts
    delete global.regionalFoodsSandbox;
    client.release();
  }
}

module.exports = { seedFoods };
