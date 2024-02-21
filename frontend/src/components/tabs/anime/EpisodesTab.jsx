import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EpisodeCard from '../../cards/EpisodeCard';

const EpisodesTab = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.animeId}/episodes`
        );
        const data = await response.json();

        setEpisodes(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getEpisodes();
  }, [params.animeId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='tab-container episode-tab-container'>
      {episodes.length > 0
        ? episodes.map((episode) => (
            <EpisodeCard episode={episode} key={episode.mal_id} />
          ))
        : 'Oops, there is no episode information available'}
    </div>
  );
};

export default EpisodesTab;
