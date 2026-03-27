import Toddler from "./Toddler";
import Child from "./Child";
import Teen from "./Teen";
import Adult from "./Adult";
import OldAge from "./OldAge";
import AdultImg from "../../Images/Adult.jpg"
import ChildImg from "../../Images/Child.jpg"
import OldageImg from "../../Images/Oldage.jpg"
import TeenImg from "../../Images/Teen.jpeg"
import TodlerImg from "../../Images/Todler.jpg"
import { Navigate, useNavigate } from "react-router-dom";



const Age_Section = () => {
  const navigate = useNavigate();
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
        className ='onclick'
        image= {TodlerImg}
        title="Toddler"
        description="Young child learning to walk, speak, and explore."
        onClick={() => navigate('/toddler')}
      />

      <Child
      className='onclick'
        image= {ChildImg}
        title="Child"
        description="Growing stage focused on learning and play."
        onClick={() => navigate('/child')}
      />

      <Teen
      className='onclick'
        image= {TeenImg}
        title="Teen"
        description="Adolescent stage with rapid development."
        onClick={()=> navigate('/teen')}
      />

      <Adult
      className='onclick'
        image= {AdultImg}
        title="Adult"
        description="Mature stage with responsibilities and independence."
        onClick={()=> navigate('/adult')}
      />

      <OldAge
      className='onclick'
        image=  {OldageImg}
        title="Old Age"
        description="Later life stage with aging body and wisdom."
        onClick={() => navigate('/oldage')}
      />
    </div>
  );
};

export default Age_Section;