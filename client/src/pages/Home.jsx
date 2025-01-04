import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>CAH Deck Builder!</h1>
      <Link to="/packs">View All Packs</Link>
      <Link to="/black">View All Black Cards</Link>
      <Link to="/white">View All White Cards</Link>
    </div>
  );
};

export default Home;
