import React from 'react'
import Card1 from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'
import Card4 from './Card4'
import Card5 from './Card5'

const Hotspot_bimari = () => {
  return (
     <div className=' flex flex-wrap space-x-8 justify-center h-[400px] items-center '>
        <Card1 image = "https://www.clinico.in/wp-content/uploads/2022/02/Clinico-Blog-Post-Option-21.jpg"
               title="Obesity"
               description="Explore the beauty of nature and mountains."/>
        <Card2 image = "https://diabetesandwellnessclinic.com/wp-content/uploads/elementor/thumbs/dr-10-r014h9ihul3bas6xel1k5jnwgtme6c0me5q8a8dngg.jpg"
               title="Diabetes"
               description="Explore the beauty of nature and mountains."/>
        <Card3 image = "https://www.epa.gov/system/files/styles/medium/private/images/2021-09/2.jpg?itok=y9aw7Hfl"
               title="Heart"
               description="Explore the beauty of nature and mountains."/>
        <Card4 image = "https://www.neoalta.com/images/easyblog_articles/82/Stomach-Ache-and-Abdominal-Pain-1.jpg"
               title="Stomach"
               description="Explore the beauty of nature and mountains."/>
        <Card5 image="https://images.news18.com/ibnlive/uploads/2025/07/Nutritional-deficiencies_1-2025-07-2fc1cbb8ca406a89bf0e3ef9387cbb98-scaled.jpg"
                title="Nutritional deficiencies"
                description="Explore the beauty of nature and mountains."/>
    </div>
  )
}

export default Hotspot_bimari