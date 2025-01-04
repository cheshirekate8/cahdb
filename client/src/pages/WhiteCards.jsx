import { useQuery } from "@apollo/client";
import { GET_WHITECARDS } from "../queries/packQueries";
import Card from "../components/Card";
export default function WhiteCards() {
  const { loading, error, data } = useQuery(GET_WHITECARDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      <h1>White Cards</h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
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
