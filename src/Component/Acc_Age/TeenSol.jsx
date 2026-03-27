import React from 'react'

// ✅ AUTO IMPORT (only this, no manual map)
const imageModules = import.meta.glob('/src/Images/Heart/*.jpg', { eager: true });
const imageMap = {};

Object.entries(imageModules).forEach(([path, module]) => {
  const name = path.split('/').pop().split('.')[0];
  imageMap[name] = module.default;
});

const TeenSol = () => {

    const FoodHeart = [
        { title: "Paneer", key: "paneer" },
        { title: "Tofu", key: "tofu" },
        { title: "Soya chunks", key: "soya_chunks" },
        { title: "Moong dal", key: "moong_dal" },
        { title: "Masoor dal", key: "masoor_dal" },
        { title: "Chickpeas", key: "chickpeas" },
        { title: "Rajma", key: "rajma" },
        { title: "Sprouts", key: "sprouts" },
        { title: "Besan chilla", key: "besan_chilla" },

        { title: "Spinach", key: "spinach" },
        { title: "Broccoli", key: "broccoli" },
        { title: "Cabbage", key: "cabbage" },
        { title: "Lauki", key: "lauki" },
        { title: "Tori", key: "tori" },
        { title: "Carrot", key: "carrot" },
        { title: "Cucumber", key: "cucumber" },
        { title: "Beans", key: "beans" },
        { title: "Mushrooms", key: "Mushrooms" },

        { title: "Apple", key: "apple" },
        { title: "Papaya", key: "papaya" },
        { title: "Guava", key: "guava" },
        { title: "Orange", key: "orange" },
        { title: "Watermelon", key: "watermelon" },
        { title: "Pineapple", key: "Pineapple" },
        { title: "Coconut", key: "Coconut" }, 
        { title: "Avacado", key: "avacado" }, 

        { title: "Roti", key: "roti" },
        { title: "Brown rice", key: "brown_rice" },
        { title: "Oats", key: "oats" },
        { title: "Daliya", key: "daliya" },
        { title: "Bajra roti", key: "bajra_roti" },
        { title: "Jowar roti", key: "jowar_roti" },

        { title: "Almonds", key: "almonds" },
        { title: "Walnuts", key: "walnuts" },
        { title: "Flax seeds", key: "flax_seeds" },
        { title: "Peanuts", key: "peanuts" },
    ]

    const exerciseHeart = [
        { title: "Walking", key: "walking" },
        { title: "Brisk walking", key: "brisk_walking" },
        { title: "Jogging", key: "jogging" },
        { title: "Running", key: "running" },
        { title: "Cycling", key: "cycling" },
        { title: "Skipping rope", key: "skipping_rope" },
        { title: "Swimming", key: "swimming" },
        { title: "Jumping jacks", key: "jumping_jacks" },
        { title: "Burpees", key: "burpees" },

        { title: "Push ups", key: "push_ups" },
        { title: "Squats", key: "squats" },
        { title: "Lunges", key: "lunges" },
        { title: "Plank", key: "plank" },
        { title: "Mountain climbers", key: "mountain_climbers" },
        { title: "High knees", key: "high_knees" },
        { title: "Sit ups", key: "sit_ups" },
        { title: "Crunches", key: "crunches" },

        { title: "Yoga", key: "yoga" },
        { title: "Surya namaskar", key: "surya_namaskar" },
        { title: "Stretching", key: "stretching" },
        { title: "Zumba", key: "zumba" },
        { title: "Aerobics", key: "aerobics" },
        { title: "Dancing", key: "dancing" },

        { title: "Stair climbing", key: "stair_climbing" },
        { title: "Hiking", key: "hiking" },
        { title: "Elliptical workout", key: "elliptical" },
        { title: "Rowing", key: "rowing" }
    ]

    return (
        <div className='m-2.5'>

            <h1 className='text-5xl font-bold text-center mb-4'>
                Food you should take
            </h1>

            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    FoodHeart.map((item, index) => (
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
                    exerciseHeart.map((item, index) => (
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

export default TeenSol;