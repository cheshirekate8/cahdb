import { useQuery } from "@apollo/client";
import { GET_BLACKCARDS } from "../queries/packQueries";
import Card from "../components/Card";
export default function BlackCards() {
  const { loading, error, data } = useQuery(GET_BLACKCARDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      <h1>Black Cards</h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
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
