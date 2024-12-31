import { useQuery } from "@apollo/client";
import { GET_BLACKCARDS } from "../queries/packQueries";
export default function BlackCards() {
  const { loading, error, data } = useQuery(GET_BLACKCARDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
          {data.packs.map((pack) => (
            <>
              {pack.black.map((blackCard) => (
                <li>{blackCard.text}</li>
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
