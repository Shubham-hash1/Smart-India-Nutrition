import fs from "fs";
import https from "https";

const images = [
  { name: "paneer", url: "https://source.unsplash.com/300x300/?paneer" },
  { name: "tofu", url: "https://source.unsplash.com/300x300/?tofu" },
  { name: "soya_chunks", url: "https://source.unsplash.com/300x300/?soya-chunks" },
  { name: "moong_dal", url: "https://source.unsplash.com/300x300/?moong-dal" },
  { name: "masoor_dal", url: "https://source.unsplash.com/300x300/?red-lentils" },
  { name: "chickpeas", url: "https://source.unsplash.com/300x300/?chickpeas" },
  { name: "rajma", url: "https://source.unsplash.com/300x300/?kidney-beans" },
  { name: "sprouts", url: "https://source.unsplash.com/300x300/?sprouts-salad" },
  { name: "besan_chilla", url: "https://source.unsplash.com/300x300/?chilla" },

  { name: "spinach", url: "https://source.unsplash.com/300x300/?spinach" },
  { name: "broccoli", url: "https://source.unsplash.com/300x300/?broccoli" },
  { name: "cabbage", url: "https://source.unsplash.com/300x300/?cabbage" },
  { name: "lauki", url: "https://source.unsplash.com/300x300/?bottle-gourd" },
  { name: "tori", url: "https://source.unsplash.com/300x300/?ridge-gourd" },
  { name: "carrot", url: "https://source.unsplash.com/300x300/?carrot" },
  { name: "cucumber", url: "https://source.unsplash.com/300x300/?cucumber" },
  { name: "beans", url: "https://source.unsplash.com/300x300/?green-beans" },

  { name: "apple", url: "https://source.unsplash.com/300x300/?apple" },
  { name: "papaya", url: "https://source.unsplash.com/300x300/?papaya" },
  { name: "guava", url: "https://source.unsplash.com/300x300/?guava" },
  { name: "orange", url: "https://source.unsplash.com/300x300/?orange-fruit" },
  { name: "watermelon", url: "https://source.unsplash.com/300x300/?watermelon" },

  { name: "roti", url: "https://source.unsplash.com/300x300/?roti" },
  { name: "brown_rice", url: "https://source.unsplash.com/300x300/?brown-rice" },
  { name: "oats", url: "https://source.unsplash.com/300x300/?oats" },
  { name: "daliya", url: "https://source.unsplash.com/300x300/?daliya" },
  { name: "bajra_roti", url: "https://source.unsplash.com/300x300/?bajra-roti" },
  { name: "jowar_roti", url: "https://source.unsplash.com/300x300/?jowar-roti" },

  { name: "almonds", url: "https://source.unsplash.com/300x300/?almonds" },
  { name: "walnuts", url: "https://source.unsplash.com/300x300/?walnuts" },
  { name: "flax_seeds", url: "https://source.unsplash.com/300x300/?flax-seeds" },
  { name: "peanuts", url: "https://source.unsplash.com/300x300/?peanuts" }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {

      // handle redirect (IMPORTANT)
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });

    }).on("error", reject);
  });
}

async function downloadAll() {
  for (let img of images) {
    try {
      await downloadImage(img.url, `./Images/${img.name}.jpg`);
      console.log(`✅ Downloaded ${img.name}`);
    } catch (err) {
      console.log(`❌ Failed ${img.name}`);
    }
  }
}

downloadAll();