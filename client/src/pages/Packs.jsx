import { useQuery } from "@apollo/client";
import { GET_PACKS } from "../queries/packQueries";
export default function Packs() {
  const { loading, error, data } = useQuery(GET_PACKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
          {data.packs.map((pack) => (
            <li>
              <a href={`/packs/${pack.white[0]?.pack}`}>{pack.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Packs</p>
      )}
    </>
  );
}
