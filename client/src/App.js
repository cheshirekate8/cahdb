import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WhiteCards from "./pages/WhiteCards";
import BlackCards from "./pages/BlackCards";
import Packs from "./pages/Packs";
import Pack from "./pages/Pack";
import NotFound from "./pages/404";
import Home from "./pages/Home";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        packs: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },
      },
    },
  },
});


const client = new ApolloClient({
  // uri: "http://localhost:8000/graphql",
  uri: "https://cahdbserver.vercel.app/graphql",
  cache: new InMemoryCache(cache),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className="mx-auto p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/white" element={<WhiteCards />} />
              <Route path="/black" element={<BlackCards />} />
              <Route path="/packs" element={<Packs />} />
              <Route path="/packs/:packId" element={<Pack />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
