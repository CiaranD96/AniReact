import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AnimeCard from '../../components/cards/AnimeCard';

const SeasonalAnime = () => {
  const [seasonalAnime, setSeasonalAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [season, setSeason] = useState(getCurrentSeason());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const getSeasonalAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${pageNumber}`
        );
        const anime = await response.json();

        setSeasonalAnime(anime.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSeasonalAnime();
  }, [pageNumber, year, season]);

  // get current season
  function getCurrentSeason() {
    const month = new Date().getMonth(); // Get the current month (0-indexed)
    if (month >= 0 && month <= 2) {
      return 'winter';
    } else if (month >= 3 && month <= 5) {
      return 'spring';
    } else if (month >= 6 && month <= 8) {
      return 'summer';
    } else {
      return 'fall';
    }
  }

  // get year options
  const yearOptions = [];
  for (let year = 1990; year <= new Date().getFullYear(); year++) {
    yearOptions.push({ value: year, label: year });
  }

  const handleChangeSeason = (e) => {
    setSeason(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(parseInt(e.target.value));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <header>
        <h2 className='title'>Seasonal Anime</h2>
      </header>
      <main className='seasonal-anime-container'>
        <div className='season-container'>
          <div className='season-select'>
            <label htmlFor='season'>Season </label>
            <select
              name='season'
              id='season'
              value={season}
              onChange={handleChangeSeason}
            >
              <option value='spring'>Spring</option>
              <option value='summer'>Summer</option>
              <option value='fall'>Fall</option>
              <option value='winter'>Winter</option>
            </select>
          </div>
          <div className='year-select'>
            <label htmlFor='year'>Year </label>
            <select
              name='year'
              id='year'
              value={year}
              onChange={handleChangeYear}
            >
              {yearOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {seasonalAnime
          ? seasonalAnime.map((anime) => (
              <AnimeCard anime={anime} key={anime.mal_id} />
            ))
          : 'Oops, we have no data for the selected time!'}
      </main>
    </>
  );
};

export default SeasonalAnime;
