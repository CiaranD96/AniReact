import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AnimeCard from '../../components/cards/AnimeCard';
import Spinner from '../../components/layout/Spinner';

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getTopAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${pageNumber}`
        );
        const anime = await response.json();

        setTopAnime(anime.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTopAnime();
  }, [pageNumber]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <header>
        <h2 className='title'>Top Anime</h2>
      </header>
      <main className='top-anime-container'>
        {topAnime.map((anime) => (
          <AnimeCard anime={anime} key={anime.mal_id} />
        ))}
      </main>
    </>
  );
};

export default TopAnime;
