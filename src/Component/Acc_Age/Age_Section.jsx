import Toddler from "./Toddler";
import Child from "./Child";
import Teen from "./Teen";
import Adult from "./Adult";
import OldAge from "./OldAge";

const Age_Section = () => {
  return (
    <div
      className="
        max-w-screen-xl
        mx-auto
        px-4
        py-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-8
        place-items-center
      "
    >
      <Toddler
        image="https://images.unsplash.com/photo-1662916269397-3c1a71515735?q=80&w=627"
        title="Toddler"
        description="Young child learning to walk, speak, and explore."
      />

      <Child
        image="https://plus.unsplash.com/premium_photo-1682092042109-83ac614d0736?q=80&w=1170"
        title="Child"
        description="Growing stage focused on learning and play."
      />

      <Teen
        image="https://images.pexels.com/photos/32694240/pexels-photo-32694240.jpeg"
        title="Teen"
        description="Adolescent stage with rapid development."
      />

      <Adult
        image="https://media.istockphoto.com/id/2152489041/photo/india-latin-mature-woman-playing-tennis-racket-in-ground-with-daughter.jpg"
        title="Adult"
        description="Mature stage with responsibilities and independence."
      />

      <OldAge
        image="https://media.istockphoto.com/id/2151246594/photo/senior-citizens-playing-cricket-in-the-park.jpg"
        title="Old Age"
        description="Later life stage with aging body and wisdom."
      />
    </div>
  );
};

export default Age_Section;