import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./css/card.css";

const GET_CHARACTERS = gql`
  query GetCharacters($name: String) {
    characters(filter: { name: $name }) {
      results {
        name
        image
        location {
          name
        }
        episode {
          name
          episode
        }
      }
    }
  }
`;

const Card = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: search },
    skip: !hasSearched,
  });

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearchClick = () => {
    setSearch(input);
    setHasSearched(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search characters"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      {hasSearched && data && data.characters.results.length > 0
        ? data.characters.results.map((character) => (
            <div key={character.id} className="card">
              <img src={character.image} alt={character.name} />
              <div className="card-text">
                <h2>{character.name}</h2>
                <p>Last Known Location: {character.location.name}</p>
                <p>First Seen In: {character.episode[0].name}</p>
                <div>
                  <h3>Episodes:</h3>
                  {character.episode.map((episode) => (
                    <p key={episode.id}>
                      {episode.name} ({episode.episode})
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        : hasSearched && (
            <div>
              <img
                src="https://tenor.com/view/ntuni-otter-surprised-cute-gif-25036078.gif"
                alt="Funny"
              />
              <p>
                Oops, it seems like your input "{search}" does not appear in
                Rick and Morty, could you please double check your input?
              </p>
            </div>
          )}
    </div>
  );
};

export default Card;
