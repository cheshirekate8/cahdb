import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PACK } from "../queries/packQueries";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import NotFound from "./404";

function Pack() {
  const { packId } = useParams();
  const { loading, error, data } = useQuery(GET_PACK, {
    variables: { packId: parseInt(packId) },
  });

  if (loading) return <Spinner />;
  if (error) return <NotFound />;

  const pack = data.pack;

  return (
    <div>
      <h1 className="mb-2 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
        {pack.name}
      </h1>
      {pack.official && (
        <h4 className="text-xl font-black mb-8 italic font-normal">
          Official Pack
        </h4>
      )}
      <h2 className="text-3xl font-black mb-4">
        White Cards ({pack.white.length})
      </h2>
      <ul className="flex flex-wrap gap-4 mb-16">
        {pack.white.map((card, index) => (
          <Card color="white" text={card.text} key={index} />
        ))}
      </ul>
      <h2 className="text-3xl font-black mb-4">
        Black Cards ({pack.black.length})
      </h2>
      <ul className="flex flex-wrap gap-4">
        {pack.black.map((card, index) => (
          <li key={index}>
            <Card color="black" text={card.text} />
            (Pick {card.pick})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pack;
