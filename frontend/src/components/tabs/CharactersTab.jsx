import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CharactersCard from '../cards/CharactersCard';

const CharactersTab = () => {
  const [characters, setCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.animeId}/characters`
        );
        const data = await response.json();

        setCharacters(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getCharacters();
  }, [params.animeId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='tab-container character-tab-container'>
      {characters.map((character) => (
        <CharactersCard
          key={character.character.mal_id}
          character={character}
        />
      ))}
    </div>
  );
};

export default CharactersTab;
