import React from 'react'

const Obesitysol = () => {

    const FoodObesity = [

    // 🥗 PROTEIN
    { img: "https://4.imimg.com/data4/CA/SR/ANDROID-55243616/product-500x500.jpeg", title: "Paneer", category: "protein" },
    { img: "", title: "Tofu", category: "protein" },
    { img: "", title: "Soya chunks", category: "protein" },
    { img: "", title: "Moong dal", category: "protein" },
    { img: "", title: "Masoor dal", category: "protein" },
    { img: "", title: "Chickpeas (chana)", category: "protein" },
    { img: "", title: "Rajma", category: "protein" },
    { img: "", title: "Sprouts", category: "protein" },
    { img: "", title: "Besan (chilla)", category: "protein" },

    // 🥦 FIBER (VEGETABLES)
    { img: "", title: "Spinach (palak)", category: "fiber" },
    { img: "", title: "Broccoli", category: "fiber" },
    { img: "", title: "Cabbage", category: "fiber" },
    { img: "", title: "Lauki", category: "fiber" },
    { img: "", title: "Tori", category: "fiber" },
    { img: "", title: "Carrot", category: "fiber" },
    { img: "", title: "Cucumber", category: "fiber" },
    { img: "", title: "Beans", category: "fiber" },

    // 🍎 FRUITS
    { img: "", title: "Apple", category: "fruit" },
    { img: "", title: "Papaya", category: "fruit" },
    { img: "", title: "Guava", category: "fruit" },
    { img: "", title: "Orange", category: "fruit" },
    { img: "", title: "Watermelon", category: "fruit" },

    // 🍚 CARBS
    { img: "", title: "Roti (whole wheat)", category: "carb" },
    { img: "", title: "Brown rice", category: "carb" },
    { img: "", title: "Oats", category: "carb" },
    { img: "", title: "Daliya", category: "carb" },
    { img: "", title: "Bajra roti", category: "carb" },
    { img: "", title: "Jowar roti", category: "carb" },

    // 🥜 HEALTHY FATS
    { img: "", title: "Almonds", category: "fat" },
    { img: "", title: "Walnuts", category: "fat" },
    { img: "", title: "Flax seeds", category: "fat" },
    { img: "", title: "Peanuts", category: "fat" },

]

    const excersiceObesity = [
        { img: "", title: "walk" },
        { img: "", title: "walk" },
        { img: "", title: "walk" },
        { img: "", title: "walk" },
        { img: "", title: "walk" },
        { img: "", title: "walk" },
        { img: "", title: "walk" }
    ]

    return (
        <div className='m-2.5' >
            <h1 className='bg-amber-600 w-screen h-[40px] font-bold flex justify-center items-center'>
                Food you should take
            </h1>

            <div className='bg-amber-500 flex gap-4 flex-wrap p-4'>
                {
                    FoodObesity.map((item, index) => (
                        <div key={index} className='flex justify-center items-center flex-col h-[150px] w-[140px] gap-2'>
                            <img src={item.img} alt="" />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>

            <h1 className='bg-amber-600 w-screen h-[40px] font-bold flex justify-center items-center'>
                Exercise you should do
            </h1>

            <div className='flex gap-4 flex-wrap p-4'>
                {
                    excersiceObesity.map((item, index) => (
                        <div key={index}>
                            <img src={item.img} alt="" />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Obesitysol