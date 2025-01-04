import { useQuery } from "@apollo/client";
import { GET_PACKS } from "../queries/packQueries";
import { Link } from "react-router-dom";

export default function Packs() {
  const { loading, error, data } = useQuery(GET_PACKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message} </div>;

  return (
    <>
      <h1>Packs</h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul>
          {data.packs.map((pack) => (
            <li>
              <Link to={`/packs/${pack.white[0]?.pack}`}>{pack.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Packs</p>
      )}
    </>
  );
}
