import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex  flex-col items-center">
      <h1 className="mb-4 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
        CAH Deck Builder!
      </h1>
      <div className="flex flex-col items-center">
        <Link to="/packs">View All Packs</Link>
        <Link to="/black">View All Black Cards</Link>
        <Link to="/white">View All White Cards</Link>
      </div>
    </div>
  );
};

export default Home;
