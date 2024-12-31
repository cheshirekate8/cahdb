import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WhiteCards from "./pages/WhiteCards";
import BlackCards from "./pages/BlackCards";

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
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(cache),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<h1>CAH Deck Builder!</h1>} />
              <Route path="/white" element={<WhiteCards />} />
              <Route path="/black" element={<BlackCards />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;