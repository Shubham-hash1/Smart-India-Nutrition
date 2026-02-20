import Toddler from './Toddler'
import Child from './Child'
import Teen from './Teen'
import Adult from './Adult'
import OldAge from './OldAge'

const Age_Section = () => {
  return (
    <div className=" flex flex-wrap gap-8 justify-center items-center h-[400px]">

      <Toddler image="https://images.unsplash.com/photo-1662916269397-3c1a71515735?q=80&w=627"
        title="Toddler"
        description="Explore the beauty of nature and mountains." />

      <Child image="https://plus.unsplash.com/premium_photo-1682092042109-83ac614d0736?q=80&w=1170"
        title="Child"
        description="Explore the beauty of nature and mountains." />

      <Teen image="https://images.pexels.com/photos/32694240/pexels-photo-32694240.jpeg"
        title="Teen"
        description="Explore the beauty of nature and mountains." />

      <Adult image = "https://media.istockphoto.com/id/2152489041/photo/india-latin-mature-woman-playing-tennis-racket-in-ground-with-daughter.jpg?s=2048x2048&w=is&k=20&c=vGtk2rTWb2UnYNnsFT-tKnQPiUR0ePLC0NaP9LgOB3E="
               title="Adult"
               description="Explore the beauty of nature and mountains." />

      <OldAge image="https://media.istockphoto.com/id/2151246594/photo/senior-citizens-playing-cricket-in-the-park.jpg?s=2048x2048&w=is&k=20&c=m_1Cbg6l3AQZtSxXokaC3uDD1-9opSUZRDbyci7R6pA="
                title="OldAge"
                description="Explore the beauty of nature and mountains." />

    </div>
  )
}

export default Age_Section
