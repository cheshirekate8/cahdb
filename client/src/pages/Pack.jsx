import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PACK } from "../queries/packQueries";

function Pack() {
  const { packId } = useParams();
  const { loading, error, data } = useQuery(GET_PACK, {
    variables: { packId: parseInt(packId) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pack = data.pack;

  return (
    <div>
      <h1>{pack.name}</h1>
      {pack.official && <h4>Official Pack</h4>}
      <h2>White Cards ({pack.white.length})</h2>
      <ul>
        {pack.white.map((card, index) => (
          <li key={index}>{card.text}</li>
        ))}
      </ul>
      <h2>Black Cards ({pack.black.length})</h2>
      <ul>
        {pack.black.map((card, index) => (
          <li key={index}>
            {card.text} (Pick {card.pick})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pack;
