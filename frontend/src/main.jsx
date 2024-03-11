import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/", // Correct GraphQL URL
  cache: new InMemoryCache(),
});

// Use createRoot instead of ReactDOM.render
const root = document.getElementById("root");

createRoot(root).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
