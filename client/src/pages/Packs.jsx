import { useQuery } from "@apollo/client";
import { GET_PACKS } from "../queries/packQueries";
import { Link } from "react-router-dom";
import NotFound from "./404";
import Spinner from "../components/Spinner";

export default function Packs() {
  const { loading, error, data } = useQuery(GET_PACKS);

  if (loading) return <Spinner />;
  if (error) return <NotFound />;

  return (
    <>
      <h1 className="mb-4 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
        Packs
      </h1>
      {!loading && !error && data.packs.length > 0 ? (
        <ul className="">
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
