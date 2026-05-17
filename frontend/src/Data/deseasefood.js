import { getRegionForFood } from "./regionalFoods";

export const diseaseData = {
Obesity: {
  foods: {
    Proteins: [
      { title: "Paneer", key: "paneer" }, // (Preferably low-fat/skimmed version)
      { title: "Tofu", key: "tofu" },
      { title: "Moong dal", key: "moong_dal" },
      { title: "Rajma", key: "rajma" },
      { title: "Sprouts", key: "sprouts" },
      
      // --- NORTH INDIA (3) ---
      { title: "Kala Chana (Roasted/Boiled)", key: "kala_chana_north" }, // Incredibly high satiety index, keeps hunger away for hours
      { title: "Lobiya Soup (Black-Eyed Pea Broth)", key: "lobiya_soup_north" }, // High protein, low fat, filling liquid meal base
      { title: "Skimmed Milk Paneer", key: "skimmed_paneer_north" }, // Lean casein protein to preserve muscle mass during a deficit
      
      // --- SOUTH INDIA (3) ---
      { title: "Kollu Soup (Horse Gram Rasam)", key: "horse_gram_rasam_south" }, // Traditional fat-burner; increases heat and metabolic rate
      { title: "Tuvar Dal (Thin/Watery)", key: "thin_tuvar_dal_south" }, // High protein-to-calorie ratio when prepared with less oil
      { title: "Sundal (Spiced Boiled Chickpeas)", key: "sundal_south" }, // Protein-packed snack made with minimal tempering
      
      // --- EAST INDIA (3) ---
      { title: "Sattu Drink (Without Sugar/Salted)", key: "sattu_drink_east" }, // High-fiber protein powerhouse that prevents overeating
      { title: "Masoor Dal (Red Lentil Soup)", key: "masoor_soup_east" }, // Thermogenic protein that requires more energy to digest
      { title: "Chhena Whey Water", key: "chhena_whey_east" }, // Nutrient-rich lean liquid protein to boost post-workout recovery
      
      // --- WEST INDIA (3) ---
      { title: "Moong Dal Usal (Dry Steamed)", key: "moong_usal_west" }, // Uses minimal oil, loaded with filling plant proteins
      { title: "Chana Dal (Split Bengal Gram)", key: "chana_dal_west" }, // Low-fat legume that maintains steady metabolic energy
      { title: "Sprouted Moth Beans", key: "moth_beans_west" }, // High enzyme activity and fiber contents aid in fat metabolism
    ],
    Vitamins: [
      { title: "Spinach", key: "spinach" },
      { title: "Broccoli", key: "broccoli" },
      { title: "Carrot", key: "carrot" },
      { title: "Apple", key: "apple" },
      { title: "Papaya", key: "papaya" },
      
      // --- NORTH INDIA (3) ---
      { title: "Lauki (Bottle Gourd Juice/Sabzi)", key: "lauki_north" }, // Extremely low calorie, high water content, excellent for detox
      { title: "Tori (Ridge Gourd)", key: "tori_north" }, // Negligible calories, fills up the stomach volume easily
      { title: "Baingan Bharta (Roasted Eggplant)", key: "baingan_bharta_north" }, // High in dietary fiber and chlorogenic acid for weight control
      
      // --- SOUTH INDIA (3) ---
      { title: "Kumbalanga (Ash Gourd Juice)", key: "ash_gourd_juice_south" }, // Renowned for flushing out toxins and reducing visceral fat
      { title: "Chow Chow (Chayote Squash)", key: "chow_chow_south" }, // High water content and low calories help maintain a deficit
      { title: "Moringa Leaves (Drumstick Greens)", key: "moringa_leaves_south" }, // Helps reduce water retention and fat accumulation
      
      // --- EAST INDIA (3) ---
      { title: "Patal (Pointed Gourd / Parwal)", key: "parwal_east" }, // Fiber-rich, very low calorie density veggie
      { title: "Kacha Kela (Boiled Green Banana)", key: "raw_banana_east" }, // High resistant starch promotes fat oxidation and gut health
      { title: "Jhinge (Sponge Gourd)", key: "jhinge_east" }, // Highly hydrating and keeps the digestive system active
      
      // --- WEST INDIA (3) ---
      { title: "Guava (Firm Pink/White)", key: "guava_west" }, // Loaded with roughage; extremely filling low-sugar fruit option
      { title: "Tindora (Ivy Gourd)", key: "tindora_west" }, // Low glycemic load, contains compounds that support weight management
      { title: "Kantola (Spiny Gourd)", key: "kantola_west" }, // High nutrient-to-calorie density keeps body well-nourished
    ],
    Carbohydrates: [
      { title: "Roti", key: "roti" },
      { title: "Brown rice", key: "brown_rice" },
      { title: "Oats", key: "oats" },
      
      // --- NORTH INDIA (3) ---
      { title: "Dalia (Broken Wheat Porridge)", key: "dalia_north" }, // Complex carbohydrate that expands in the stomach, providing fullness
      { title: "Bajra Roti (Pearl Millet)", key: "bajra_roti_north" }, // Takes longer to chew and digest, boosting calorie burn (TEF)
      { title: "Jau Roti (Barley Flatbread)", key: "barley_roti_north" }, // Rich in beta-glucan fibers that signal satiety hormones
      
      // --- SOUTH INDIA (3) ---
      { title: "Ragi Mudde / Roti (Finger Millet)", key: "ragi_millet_south" }, // Contains tryptophan which suppresses appetite cravings
      { title: "Matta Rice (Unpolished Red Rice)", key: "matta_rice_south" }, // Nutrient-dense whole grain that stops mid-day energy crashes
      { title: "Thinai (Foxtail Millet Porridge)", key: "thinai_millet_south" }, // Reduces triglyceride levels and aids fat loss
      
      // --- EAST INDIA (3) ---
      { title: "Brown Muri (Puffed Red Rice)", key: "brown_muri_east" }, // Low calorie density snack; provides volume without fat
      { title: "Red Chira (Flattened Red Rice)", key: "red_poha_east" }, // Easily portion-controlled complex carb option
      { title: "Jowar Jolpan (Sorghum Flakes)", key: "jowar_jolpan_east" }, // Whole millet flakes that slow glucose absorption
      
      // --- WEST INDIA (3) ---
      { title: "Jowar Bhakri (Sorghum Bread)", key: "jowar_bhakri_west" }, // High phytochemical and fiber content ideal for weight management
      { title: "Rajgira (Amaranth Whole Grain)", key: "rajgira_west" }, // High protein content compared to regular grains, balancing meals
      { title: "Unpolished Poha", key: "unpolished_poha_west" }, // Preserved bran helps control portion sizes and improves digestion
    ],
    Minerals: [
      { title: "Almonds", key: "almonds" },
      { title: "Walnuts", key: "walnuts" },
      { title: "Flax seeds", key: "flax_seeds" }, // (Excellent for suppressing hunger cravings)
      
      // --- NORTH INDIA (3) ---
      { title: "Jeera-Ajwain Infusion", key: "jeera_ajwain_north" }, // Enhances secretion of digestive enzymes and cuts bloating
      { title: "Saunf Water (Fennel Seeds)", key: "saunf_water_north" }, // Natural diuretic that helps flush out excess water weight
      { title: "Garlic (Raw Lahsun)", key: "garlic_north" }, // Contains thermogenic allicin that stimulates fat-burning mechanisms
      
      // --- SOUTH INDIA (3) ---
      { title: "Curry Leaves Tea", key: "curry_leaves_south" }, // Helps reduce lipid/cholesterol levels naturally
      { title: "Black Pepper (Kali Mirch in Warm Water)", key: "black_pepper_south" }, // Piperine compound blocks new fat cell formation
      { title: "Neer Mor (Diluted Salted Buttermilk)", key: "neer_mor_south" }, // Zero-sugar, low-calorie hydrator that suppresses appetite
      
      // --- EAST INDIA (3) ---
      { title: "Dab er Jol (Tender Coconut Water)", key: "coconut_water_east" }, // Natural electrolytes that kickstart metabolic activity
      { title: "Mustard Seeds (Rai)", key: "mustard_seeds_east" }, // Contains selenium and B-vitamins that boost metabolic speed
      { title: "Chia / Sabja Seeds In Lemon Water", key: "sabja_lemon_east" }, // Absorbs water to fill the stomach before heavy meals
      
      // --- WEST INDIA (3) ---
      { title: "Kokum Sharbat (Sugar-Free)", key: "kokum_unsweetened_west" }, // Hydroxycitric acid (HCA) inhibits fat production enzymes
      { title: "Dhaniya-Jeera Decoction", key: "dhaniya_jeera_west" }, // Increases renal excretion of toxins and handles water retention
      { title: "Green Cardamom (Elaichi Pods)", key: "elaichi_west" }, // Helps melt stubborn abdominal / visceral fat deposits
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
      { title: "Sprouts", key: "sprouts" },
      
      // --- NORTH INDIA (3) ---
      { title: "Kala Chana (Black Chickpeas)", key: "kala_chana_north" }, // Very low GI, high fiber prevents glucose spikes
      { title: "Lobiya (Black-Eyed Peas)", key: "lobiya_north" }, // Complex protein that improves insulin response
      { title: "White Chana (Kabuli Chana)", key: "white_chana_north" }, // High amylose starch content digests slowly
      
      // --- SOUTH INDIA (3) ---
      { title: "Kollu (Horse Gram)", key: "horse_gram_south" }, // Reduces postprandial blood glucose levels
      { title: "Tuvar Dal (Arhar)", key: "tuvar_dal_south" }, // Rich in polyphenols that inhibit carbohydrate-digesting enzymes
      { title: "Pasi Paruppu (Yellow Moong)", key: "pasi_paruppu_south" }, // Lightweight, easy-to-digest lean plant protein
      
      // --- EAST INDIA (3) ---
      { title: "Sattu (Roasted Chana Flour)", key: "sattu_east" }, // High-fiber protein drink with minimal glycemic impact
      { title: "Masoor Dal (Red Lentils)", key: "masoor_dal_east" }, // High in soluble fiber to slow sugar absorption
      { title: "Low-Fat Chhena", key: "low_fat_chhena_east" }, // High protein, low carb dairy option to stabilize energy
      
      // --- WEST INDIA (3) ---
      { title: "Sprouted Moth Beans", key: "moth_beans_west" }, // Sprouting lowers carb content and raises protein availability
      { title: "Chana Dal (Split Bengal Gram)", key: "chana_dal_west" }, // One of the lowest glycemic index lentils available
      { title: "Urad Dal (Split White)", key: "urad_dal_west" }, // Packed with magnesium which aids insulin regulation
    ],
    Vitamins: [
      { title: "Spinach", key: "spinach" },
      { title: "Broccoli", key: "broccoli" },
      { title: "Carrot", key: "carrot" },
      { title: "Apple", key: "apple" },
      { title: "Papaya", key: "papaya" }, // (Low sugar fruit when eaten in moderation)
      
      // --- NORTH INDIA (3) ---
      { title: "Karela (Bitter Gourd)", key: "karela_north" }, // Contains charantin and polypeptide-p (plant insulin)
      { title: "Methi Leaves (Fenugreek)", key: "methi_leaves_north" }, // Contains 4-hydroxyisoleucine to stimulate insulin secretion
      { title: "Lauki (Bottle Gourd)", key: "lauki_north" }, // High water and fiber content, almost zero glycemic load
      
      // --- SOUTH INDIA (3) ---
      { title: "Moringa Leaves (Drumstick)", key: "moringa_leaves_south" }, // Isothiocyanates help reduce blood sugar levels
      { title: "Nellikai (Amla / Gooseberry)", key: "amla_south" }, // Chromium content supports carbohydrate metabolism
      { title: "Kovakkai (Ivy Gourd / Tindora)", key: "tindora_south" }, // Traditional South Indian veggie for glycemic control
      
      // --- EAST INDIA (3) ---
      { title: "Patal (Pointed Gourd / Parwal)", key: "parwal_east" }, // Low calorie, high fiber, helps manage metabolic profiles
      { title: "Kacha Kela (Raw Green Banana)", key: "raw_banana_east" }, // High in resistant starch; does not spike blood sugar
      { title: "Lal Saag (Red Amaranth Leaves)", key: "lal_saag_east" }, // Excellent low-carb source of vitamins and minerals
      
      // --- WEST INDIA (3) ---
      { title: "Kantola (Spiny Gourd)", key: "kantola_west" }, // Anti-diabetic properties help lower glucose levels
      { title: "Turiya (Ridge Gourd)", key: "turiya_west" }, // Contains peptides that mimic insulin behavior
      { title: "Guava (Amrood - Green/Firm)", key: "guava_west" }, // High fiber, low GI, reduces sugar absorption rate
    ],
    Carbohydrates: [
      { title: "Roti", key: "roti" },
      { title: "Brown rice", key: "brown_rice" },
      { title: "Oats", key: "oats" }, // (Beta-glucan fiber improves insulin sensitivity)
      
      // --- NORTH INDIA (3) ---
      { title: "Dalia (Broken Wheat)", key: "dalia_north" }, // Slow-release carbohydrate preventing glucose spikes
      { title: "Bajra Roti (Pearl Millet)", key: "bajra_north" }, // High fiber and magnesium content improves metabolic control
      { title: "Jau Roti (Barley)", key: "barley_north" }, // Extremely high in beta-glucans; superior for glycemic control
      
      // --- SOUTH INDIA (3) ---
      { title: "Ragi Roti / Mudde (Finger Millet)", key: "ragi_south" }, // Higher fiber content keeps hunger and sugar levels steady
      { title: "Matta Rice (Brown/Red Rice)", key: "matta_rice_south" }, // Retains pericarp, lowering GI compared to white rice
      { title: "Thinai (Foxtail Millet)", key: "thinai_south" }, // Shown to lower blood glucose and HbA1c levels
      
      // --- EAST INDIA (3) ---
      { title: "Panta Bhat (Fermented Rice)", key: "panta_bhat_east" }, // Fermentation reduces glycemic load and increases nutrients
      { title: "Chira (Red Flattened Rice)", key: "red_poha_east" }, // Higher fiber version of standard poha, digests slowly
      { title: "Brown Muri (Puffed Red Rice)", key: "brown_muri_east" }, // Light, low glycemic load snack option
      
      // --- WEST INDIA (3) ---
      { title: "Jowar Bhakri (Sorghum)", key: "jowar_bhakri_west" }, // Rich in complex carbs, gluten-free, manages insulin spikes
      { title: "Rajgira (Amaranth Whole Grain)", key: "rajgira_west" }, // High protein-to-carb ratio whole grain
      { title: "Unpolished Poha (Flattened Rice)", key: "unpolished_poha_west" }, // Minimally processed to retain natural wheat bran/fiber
    ],
    Minerals: [
      { title: "Almonds", key: "almonds" },
      { title: "Walnuts", key: "walnuts" },
      { title: "Flax seeds", key: "flax_seeds" },
      
      // --- NORTH INDIA (3) ---
      { title: "Jamun Seed Powder", key: "jamun_seeds_north" }, // Contains jamboline which prevents conversion of starch into sugar
      { title: "Methi Dana (Fenugreek Seeds)", key: "methi_seeds_north" }, // Soluble fiber delays intestinal glucose absorption
      { title: "Dalchini (Cinnamon Infusion)", key: "cinnamon_north" }, // Mimics insulin and improves cellular glucose uptake
      
      // --- SOUTH INDIA (3) ---
      { title: "Curry Leaves (Kadi Patta)", key: "curry_leaves_south" }, // Influences carbohydrate metabolism enzymes
      { title: "Jeera (Cumin Seeds)", key: "jeera_south" }, // Targets advanced glycation end-products (AGEs) in diabetes
      { title: "Ellu (Sesame Seeds)", key: "sesame_south" }, // High magnesium and vitamin E levels protect vascular cells
      
      // --- EAST INDIA (3) ---
      { title: "Kalongi (Black Cumin Seeds)", key: "kalongi_east" }, // Helps lower fasting and postprandial blood glucose
      { title: "Tejpatta (Indian Bay Leaf Tea)", key: "bay_leaf_east" }, // Enhances insulin receptor activity
      { title: "Mustard Seeds (Rai)", key: "mustard_seeds_east" }, // Contains magnesium and protective phytochemicals
      
      // --- WEST INDIA (3) ---
      { title: "Kokum (Without Sugar)", key: "kokum_west" }, // Hydroxycitric acid aids metabolic rate and weight management
      { title: "Dhaniya Seeds (Coriander)", key: "coriander_seeds_west" }, // Promotes insulin release from pancreatic beta cells
      { title: "Sabja Seeds (Basil Seeds)", key: "sabja_seeds_west" }, // High fiber slows down sudden post-meal sugar crashes
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
      { title: "Sprouts", key: "sprouts" },
      
      // --- NORTH INDIA (3) ---
      { title: "Kala Chana (Bengal Gram)", key: "kala_chana_north" }, // High fiber, lowers LDL cholesterol
      { title: "Lobiya (Black-Eyed Peas)", key: "lobiya_north" }, // Rich in potassium and folate
      { title: "Matar Dal (Split Green Peas)", key: "matar_dal_north" }, // Low glycemic index, arterial health
      
      // --- SOUTH INDIA (3) ---
      { title: "Kollu / Horse Gram", key: "horse_gram_south" }, // Excellent for lipid profile management
      { title: "Tuvar Dal (Arhar Dal)", key: "tuvar_dal_south" }, // Staple protein rich in heart-protective potassium
      { title: "Sundal (Boiled White Chickpeas)", key: "sundal_south" }, // Oil-free snack packed with plant sterols
      
      // --- EAST INDIA (3) ---
      { title: "Sattu (Roasted Chana Flour)", key: "sattu_east" }, // High soluble fiber to flush out cholesterol
      { title: "Masoor Dal (Red Lentils)", key: "masoor_dal_east" }, // Rich in magnesium, improves blood flow
      { title: "Chhena (Low-Fat Fresh Curd Whey)", key: "low_fat_chhena_east" }, // Lean protein without saturated fats
      
      // --- WEST INDIA (3) ---
      { title: "Sprouted Moth Beans", key: "moth_beans_west" }, // Packed with B-vitamins for homocystein regulation
      { title: "Chana Dal (Split Bengal Gram)", key: "chana_dal_west" }, // Extremely heart-safe, low glycemic protein
      { title: "Urad Dal (White/Split)", key: "urad_dal_west" }, // Good source of magnesium and phosphoric acid
    ],
    Vitamins: [
      { title: "Spinach", key: "spinach" },
      { title: "Broccoli", key: "broccoli" },
      { title: "Carrot", key: "carrot" },
      { title: "Apple", key: "apple" },
      { title: "Papaya", key: "papaya" },
      
      // --- NORTH INDIA (3) ---
      { title: "Methi Leaves (Fenugreek)", key: "methi_north" }, // Reduces cholesterol and protects arteries
      { title: "Bathua (Lamb's Quarter)", key: "bathua_north" }, // High in Vitamin A & C, blood-purifying properties
      { title: "Tomato (Desi)", key: "tomato_north" }, // High in Lycopene, lowers myocardial infarction risk
      
      // --- SOUTH INDIA (3) ---
      { title: "Moringa Leaves (Drumstick)", key: "moringa_leaves_south" }, // Powerful antioxidant, regulates BP
      { title: "Nellikai (Amla / Gooseberry)", key: "amla_south" }, // Massive Vitamin C dose, prevents plaque buildup
      { title: "Chow Chow (Chayote)", key: "chow_chow_south" }, // Myricetin content supports clear blood vessels
      
      // --- EAST INDIA (3) ---
      { title: "Patal (Pointed Gourd)", key: "parwal_east" }, // Helps manage blood purification and lipids
      { title: "Kacha Kela (Green Banana)", key: "green_banana_east" }, // High Vitamin B6 and potassium for BP control
      { title: "Lal Saag (Red Amaranth)", key: "lal_saag_east" }, // Loaded with phytosterols to fight bad cholesterol
      
      // --- WEST INDIA (3) ---
      { title: "Guava (Amrood)", key: "guava_west" }, // Soluble fiber and potassium boost arterial elasticity
      { title: "Tindora (Ivy Gourd)", key: "tindora_west" }, // Contains compounds that protect vascular lining
      { title: "Kantola (Spiney Gourd)", key: "kantola_west" }, // High in heart-protecting phytonutrients
    ],
    Carbohydrates: [
      { title: "Roti", key: "roti" },
      { title: "Brown rice", key: "brown_rice" },
      { title: "Oats", key: "oats" },
      
      // --- NORTH INDIA (3) ---
      { title: "Dalia (Broken Wheat)", key: "dalia_north" }, // Complex carb that prevents insulin spikes affecting the heart
      { title: "Bajra Roti (Pearl Millet)", key: "bajra_north" }, // High magnesium content relaxes cardiovascular muscles
      { title: "Makki (Whole Corn - Unrefined)", key: "makki_north" }, // Rich in carotenoids for overall heart health
      
      // --- SOUTH INDIA (3) ---
      { title: "Matta Rice (Red Rice)", key: "matta_rice_south" }, // Contains monacolin K which naturally regulates fats
      { title: "Ragi Roti / Mudde (Finger Millet)", key: "ragi_south" }, // Lowers serum cholesterol, highly fibrous
      { title: "Thinai (Foxtail Millet)", key: "thinai_south" }, // Regulates triglyercides and resting heart rate
      
      // --- EAST INDIA (3) ---
      { title: "Brown Puffed Rice (Muri)", key: "brown_muri_east" }, // Sodium-free, light complex carbohydrate
      { title: "Chira (Red Flattened Rice)", key: "red_poha_east" }, // Easy on metabolism, rich in iron and complex carbs
      { title: "Jowar Jolpan (Sorghum Flakes)", key: "jowar_jolpan_east" }, // Phytochemical-rich whole grain
      
      // --- WEST INDIA (3) ---
      { title: "Jowar Bhakri (Sorghum)", key: "jowar_bhakri_west" }, // Contains policosanols that reduce cholesterol synthesis
      { title: "Rajgira (Amaranth Flour)", key: "rajgira_west" }, // High squalene content, excellent for blood pressure
      { title: "Unpolished Poha", key: "unpolished_poha_west" }, // Minimal processing ensures cardiac fibers remain intact
    ],
    Minerals: [
      { title: "Almonds", key: "almonds" },
      { title: "Walnuts", key: "walnuts" },
      { title: "Flax seeds", key: "flax_seeds" },
      
      // --- NORTH INDIA (3) ---
      { title: "Garlic (Lahsun)", key: "garlic_north" }, // Contains Allicin, famous for lowering high BP
      { title: "Melon Seeds (Magaz)", key: "melon_seeds_north" }, // Rich in magnesium and heart-healthy unsaturated fats
      { title: "Saunf (Fennel Infusion)", key: "saunf_north" }, // Nitrate content relaxes blood vessels
      
      // --- SOUTH INDIA (3) ---
      { title: "Curry Leaves (Kadi Patta)", key: "curry_leaves_south" }, // Reduces lipid oxidation and total cholesterol
      { title: "Jeera (Cumin Seed Water)", key: "jeera_south" }, // Contains minerals that suppress inflammation
      { title: "Sesame Seeds (Til)", key: "sesame_south" }, // Sesamin and sesamolin content lowers blood pressure
      
      // --- EAST INDIA (3) ---
      { title: "Dab er Jol (Tender Coconut Water)", key: "coconut_water_east" }, // Loaded with potassium to flush out excess sodium
      { title: "Mustard Seeds (Rai)", key: "mustard_seeds_east" }, // Source of Selenium and Omega-3 fatty acids
      { title: "Pumpkin Seeds", key: "pumpkin_seeds_east" }, // Excellent plant source of zinc and magnesium
      
      // --- WEST INDIA (3) ---
      { title: "Kokum Extract", key: "kokum_west" }, // Hydroxycitric acid decreases cardiovascular fat storage
      { title: "Dhaniya (Coriander Seed Water)", key: "coriander_west" }, // Natural diuretic that helps lower high blood pressure
      { title: "Green Cardamom (Elaichi)", key: "elaichi_west" }, // Improves blood fibrinolytic activity (prevents clots)
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
      { title: "Sprouts", key: "sprouts" },
      
      // --- NORTH INDIA (3) ---
      { title: "Mitha Dahi (Set Curd)", key: "dahi_north" },
      { title: "White Chickpeas (Chole - Boiled/Mashed)", key: "chole_boiled_north" },
      { title: "Kala Chana Soup (Black Chickpea Broth)", key: "chana_soup_north" },
      
      // --- SOUTH INDIA (3) ---
      { title: "Kootu (Moong Dal with Gourd)", key: "kootu_south" },
      { title: "Thoviyal (Roasted Lentil Paste)", key: "thoviyal_south" },
      { title: "Pasi Paruppu (Mashed Yellow Moong Dal)", key: "pasi_paruppu_south" },
      
      // --- EAST INDIA (3) ---
      { title: "Sattu Powder (Roasted Gram)", key: "sattu_east" },
      { title: "Chhena (Fresh Unripened Curd)", key: "chhena_east" },
      { title: "Mash Dal (Light Black Gram Stew)", key: "mash_dal_east" },
      
      // --- WEST INDIA (3) ---
      { title: "Kadhi (Buttermilk & Besan)", key: "kadhi_west" },
      { title: "Usal (Sprouted Moong - Non-Spicy Stew)", key: "moong_usal_west" },
      { title: "Gujarati Toor Dal (Thin & Watery)", key: "toor_dal_west" }
    ],
    Vitamins: [
      { title: "Spinach", key: "spinach" },
      { title: "Broccoli", key: "broccoli" },
      { title: "Carrot", key: "carrot" },
      { title: "Apple", key: "apple" },
      { title: "Papaya", key: "papaya" },
      
      // --- NORTH INDIA (3) ---
      { title: "Lauki (Bottle Gourd)", key: "lauki_north" },
      { title: "Tori (Ridge Gourd)", key: "tori_north" },
      { title: "Kaddu (Mashed Pumpkin)", key: "pumpkin_north" },
      
      // --- SOUTH INDIA (3) ---
      { title: "Kumbalanga (Ash Gourd)", key: "ash_gourd_south" },
      { title: "Chow Chow (Chayote Squash)", key: "chow_chow_south" },
      { title: "Moringa (Drumstick Leaves/Pod Juice)", key: "moringa_south" },
      
      // --- EAST INDIA (3) ---
      { title: "Kacha Kela (Raw Green Banana)", key: "raw_banana_east" },
      { title: "Patal (Pointed Gourd / Parwal)", key: "parwal_east" },
      { title: "Jhinge (Sponge Gourd)", key: "jhinge_east" },
      
      // --- WEST INDIA (3) ---
      { title: "Turiya (Western Ridge Gourd)", key: "turiya_west" },
      { title: "Tindora (Ivy Gourd)", key: "tindora_west" },
      { title: "Galka (Smooth Luffa)", key: "galka_west" }
    ],
    Carbohydrates: [
      { title: "Roti", key: "roti" },
      { title: "Brown rice", key: "brown_rice" },
      { title: "Oats", key: "oats" },
      
      // --- NORTH INDIA (3) ---
      { title: "Moong Dal Khichdi", key: "khichdi_north" },
      { title: "Dalia (Broken Wheat Porridge)", key: "dalia_north" },
      { title: "Suji Halwa (Light/Low-Sugar)", key: "suji_halwa_north" },
      
      // --- SOUTH INDIA (3) ---
      { title: "Thayir Sadam (Curd Rice)", key: "curd_rice_south" },
      { title: "Kanji (Broken Rice Water)", key: "kanji_south" },
      { title: "Steamed Idli", key: "idli_south" },
      
      // --- EAST INDIA (3) ---
      { title: "Panta Bhat (Fermented Rice)", key: "panta_bhat_east" },
      { title: "Chira (Soft Soaked Flattened Rice)", key: "chira_east" },
      { title: "Muri (Light Puffed Rice)", key: "muri_east" },
      
      // --- WEST INDIA (3) ---
      { title: "Poha (Flattened Rice)", key: "poha_west" },
      { title: "Jowar Bhakri (Gluten-Free Flatbread)", key: "jowar_bhakri_west" },
      { title: "Shira (Roasted Semolina Porridge)", key: "shira_west" }
    ],
    Minerals: [
      { title: "Almonds", key: "almonds" },
      { title: "Walnuts", key: "walnuts" },
      { title: "Flax seeds", key: "flax_seeds" },
      
      // --- NORTH INDIA (3) ---
      { title: "Saunf (Fennel Seed Infusion)", key: "saunf_north" },
      { title: "Ajwain (Carom Seed Water)", key: "ajwain_north" },
      { title: "Mishri (Rock Sugar Crystals)", key: "mishri_north" },
      
      // --- SOUTH INDIA (3) ---
      { title: "Jeera Water (Boiled Cumin)", key: "jeera_water_south" },
      { title: "Neer Mor (Spiced Diluted Buttermilk)", key: "neer_mor_south" },
      { title: "Inji Kashayam (Ginger-Honey Tonic)", key: "ginger_tonic_south" },
      
      // --- EAST INDIA (3) ---
      { title: "Dab er Jol (Tender Coconut Water)", key: "coconut_water_east" },
      { title: "Gandhavadhal Leaf Juice (Gut-Healing Herb)", key: "gandhavadhal_east" },
      { title: "Kala Namak (Black Salt Remedy)", key: "black_salt_east" },
      
      // --- WEST INDIA (3) ---
      { title: "Masala Chaas (Buttermilk)", key: "chaas_west" },
      { title: "Kokum Sharbat (Garcinia Indica Extract)", key: "kokum_west" },
      { title: "Dhaniya Jeera Powder Decoction", key: "dhaniya_jeera_west" }
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