import { useQuery } from "@apollo/client";
import { GET_WHITECARDS } from "../queries/packQueries";
export default function WhiteCards() {
  const { loading, error, data } = useQuery(GET_WHITECARDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
          {data.packs.map((pack) => (
            <>
              {pack.white.map((whiteCard) => (
                <li>{whiteCard.text}</li>
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
