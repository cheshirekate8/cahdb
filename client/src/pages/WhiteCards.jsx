import { useQuery } from "@apollo/client";
import { GET_WHITECARDS } from "../queries/packQueries";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import NotFound from "./404";
export default function WhiteCards() {
  const { loading, error, data } = useQuery(GET_WHITECARDS);

  if (loading) return <Spinner />;
  if (error) return <NotFound />;

  return (
    <>
      <h1 className="mb-4 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
        White Cards
      </h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {data.packs.map((pack) => (
            <>
              {pack.white.map((whiteCard) => (
                <Card color="white" text={whiteCard.text} />
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
