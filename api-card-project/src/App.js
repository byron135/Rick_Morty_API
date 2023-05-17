import React from "react";
import { ApolloProvider } from "@apollo/client";
import Card from "./card";
import Header from "./header";
import client from "./apollo";
import "./css/App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Card />
      </div>
    </ApolloProvider>
  );
}

export default App;
