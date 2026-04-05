import { useState, useEffect } from "react";

export const useAnimeData = (animeId) => {
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/full`,
        );
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAnime();
  }, [animeId]);

  return { anime, isLoading };
};
