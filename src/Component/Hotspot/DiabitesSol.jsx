import React from 'react'

// ✅ AUTO IMPORT (only this, no manual map)
const imageModules = import.meta.glob('/src/Images/Diebites/*.jpg', { eager: true });
const imageMap = {};

Object.entries(imageModules).forEach(([path, module]) => {
  const name = path.split('/').pop().split('.')[0];
  imageMap[name] = module.default;
});

const DiabetesSol = () => {

    const FoodDiabetes = [
    { title: "Almonds", key: "almonds" },
    { title: "Apple", key: "apple" },
    { title: "Bajra", key: "bajra" },
    { title: "Barley", key: "barley" },
    { title: "Berries", key: "Berries" }, // ⚠️ capital B (your file name)
    { title: "Bitter Gourd", key: "bittergourd" },
    { title: "Black Chana", key: "blackchana" },
    { title: "Broccoli", key: "broccoli" },
    { title: "Brown Rice", key: "brown_rice" },
    { title: "Cabbage", key: "cabbage" },
    { title: "Carrot", key: "carrot" },
    { title: "Cauliflower", key: "cauliflower" },
    { title: "Chickpeas", key: "chickpeas" },
    { title: "Cucumber", key: "cucumber" },
    { title: "Daliya", key: "daliya" },
    { title: "Greek Yogurt / Curd", key: "greekyogurt_curd" },
    { title: "Green Gram", key: "greengram" },
    { title: "Guava", key: "guava" },
    { title: "Jowar", key: "jowar" },
    { title: "Kidney Beans", key: "kidneybeans" },

    { title: "Lauki", key: "lauki" },
    { title: "Lentils", key: "lentils" },
    { title: "Millets", key: "millets" },
    { title: "Oats", key: "oats" },
    { title: "Okra", key: "okra" },
    { title: "Orange", key: "orange" },
    { title: "Paneer", key: "paneer" },
    { title: "Papaya", key: "papaya" },
    { title: "Peanuts", key: "peanuts" },
    { title: "Pear", key: "Pear" }, 
    { title: "Quinoa", key: "quinoa" },
    { title: "Ragi", key: "ragi" },
    { title: "Spinach", key: "spinach" },
    { title: "Tofu", key: "tofu" },
    { title: "Tomato", key: "tomato" },
    { title: "Whole Wheat Roti", key: "wholewheatroti" }
    ]

    // const exerciseDiebites = [
    //     { title: "Walking", key: "walking" },
    //     { title: "Brisk walking", key: "brisk_walking" },
    //     { title: "Jogging", key: "jogging" },
    //     { title: "Running", key: "running" },
    //     { title: "Cycling", key: "cycling" },
    //     { title: "Skipping rope", key: "skipping_rope" },
    //     { title: "Swimming", key: "swimming" },
    //     { title: "Jumping jacks", key: "jumping_jacks" },
    //     { title: "Burpees", key: "burpees" },

    //     { title: "Push ups", key: "push_ups" },
    //     { title: "Squats", key: "squats" },
    //     { title: "Lunges", key: "lunges" },
    //     { title: "Plank", key: "plank" },
    //     { title: "Mountain climbers", key: "mountain_climbers" },
    //     { title: "High knees", key: "high_knees" },
    //     { title: "Sit ups", key: "sit_ups" },
    //     { title: "Crunches", key: "crunches" },

    //     { title: "Yoga", key: "yoga" },
    //     { title: "Surya namaskar", key: "surya_namaskar" },
    //     { title: "Stretching", key: "stretching" },
    //     { title: "Zumba", key: "zumba" },
    //     { title: "Aerobics", key: "aerobics" },
    //     { title: "Dancing", key: "dancing" },

    //     { title: "Stair climbing", key: "stair_climbing" },
    //     { title: "Hiking", key: "hiking" },
    //     { title: "Elliptical workout", key: "elliptical" },
    //     { title: "Rowing", key: "rowing" }
    // ]

    return (
        <div className='m-2.5'>

            <h1 className='text-5xl font-bold text-center mb-4'>
                Food you should take
            </h1>

            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    FoodDiabetes.map((item, index) => (
                        <div key={index} className='flex flex-col items-center w-[140px] gap-2'>

                            <img
                                src={imageMap[item.key] ?? "https://via.placeholder.com/120"}
                                alt={item.title}
                                className='h-[120px] w-[120px] object-cover rounded'
                            />

                            <p className='text-sm text-center'>{item.title}</p>
                        </div>
                    ))
                }
            </div>

            <h1 className='text-5xl font-bold text-center my-6'>
                Exercise you should do
            </h1>

            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    exerciseDiebites.map((item, index) => (
                        <div key={index} className='flex flex-col items-center w-[140px] gap-2'>

                            <img
                                src={imageMap[item.key] ?? "https://via.placeholder.com/120"}
                                alt={item.title}
                                className='h-[120px] w-[120px] object-cover rounded'
                            />

                            <p className='text-sm text-center'>{item.title}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default DiabetesSol