import { useQuery } from "@apollo/client";
import { GET_BLACKCARDS } from "../queries/packQueries";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import NotFound from "./404";
export default function BlackCards() {
  const { loading, error, data } = useQuery(GET_BLACKCARDS);

  if (loading) return <Spinner />;
  if (error) return <NotFound />;

  return (
    <>
      <h1 className="mb-4 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
        Black Cards
      </h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {data.packs.map((pack) => (
            <>
              {pack.black.map((blackCard) => (
                <Card color="black" text={blackCard.text} />
              ))}
            </>
          ))}
        </ul>
      ) : (
        <p>No Cards</p>
      )}
    </>
  );
}
