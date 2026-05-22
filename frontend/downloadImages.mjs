import fs from 'fs';
import path from 'path';
import google from 'googlethis';
import download from 'image-downloader';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Simple check to see if a file is a valid JPEG/PNG by reading magic bytes
function isValidImage(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 4) return false;
    // Check JPEG magic number (FF D8 FF)
    if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return true;
    // Check PNG magic number (89 50 4E 47)
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true;
    // Check WebP (RIFF .... WEBP)
    if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) return true;
    return false;
  } catch (e) {
    return false;
  }
}

async function main() {
  const dataFiles = ['regionalFoods.js', 'deseasefood.js', 'agefood.js'];
  const keys = new Set();
  
  for (const file of dataFiles) {
      if (fs.existsSync(path.join(__dirname, 'src', 'Data', file))) {
          const content = fs.readFileSync(path.join(__dirname, 'src', 'Data', file), 'utf8');
          // Match key: "some_key"
          const regex = /key:\s*"([^"]+)"/g;
          let match;
          while ((match = regex.exec(content)) !== null) {
              keys.add(match[1]);
          }
      }
  }
  
  const foodItems = Array.from(keys);
  console.log(`Found ${foodItems.length} unique items to process.`);
  
  const targetDir = path.join(__dirname, 'public', 'food-images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const food of foodItems) {
    const dest = path.join(targetDir, `${food}.jpg`);
    
    // Clean up the search query to remove regional suffixes
    let cleanFood = food.replace(/_(north|south|east|west)$/i, '');
    let searchQuery = cleanFood.replace(/_/g, ' ') + " fresh raw single ingredient high quality";
    
    const exercisesList = ['running', 'walking', 'cycling', 'swimming', 'skipping_rope', 'yoga', 'stretching', 'jogging', 'burpees', 'squats', 'plank', 'lunges', 'brisk_walking'];
    if (exercisesList.includes(food)) {
        searchQuery = cleanFood.replace(/_/g, ' ') + " exercise healthy lifestyle clear image";
    }
    
    let needsDownload = true;
    if (fs.existsSync(dest)) {
      if (isValidImage(dest)) {
        // If it's a valid image, ONLY re-download if it was one of the regional suffix ones that got a bad query earlier
        if (!food.match(/_(north|south|east|west)$/i)) {
           needsDownload = false; // It's fine
        }
      }
    }

    if (!needsDownload) {
      continue;
    }

    console.log(`Downloading for: ${food} (Query: ${searchQuery})`);
    
    try {
      const images = await google.image(searchQuery, { safe: false });
      
      if (images && images.length > 0) {
        let success = false;
        for (let i = 0; i < Math.min(5, images.length); i++) {
          try {
            const imageUrl = images[i].url;
            // Skip known bad domains or weird extensions if needed
            await download.image({
              url: imageUrl,
              dest: dest
            });
            // verify if we downloaded an actual image
            if (isValidImage(dest)) {
               console.log(`[OK] Downloaded ${food} from ${imageUrl}`);
               success = true;
               break; 
            } else {
               fs.unlinkSync(dest); // delete invalid image
            }
          } catch (e) {}
        }
        
        if (!success) {
          console.error(`[FAIL] Could not download any valid images for ${food}`);
        }
      } else {
        console.error(`[FAIL] No images found for ${food}`);
      }
    } catch (e) {
      console.error(`[ERROR] Search failed for ${food}:`, e.message);
    }
    
    await delay(1500);
  }
  
  console.log("Done fixing images!");
}

main().catch(console.error);
