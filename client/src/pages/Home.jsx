import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>CAH Deck Builder!</h1>
      <Link to="/packs">View All Packs</Link>
    </div>
  );
};

export default Home;
