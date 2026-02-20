import { Link } from "react-router-dom";

const Navlinks = () => {
  return (
    <ul className="flex space-x-4">
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/about">About</Link>
      </li>

      <li>
        <Link to="/products">Products</Link>
      </li>

      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
    </ul>
  );
};

export default Navlinks;