import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import { FaRegStar, FaRegListAlt, FaRegEye, FaTrophy } from 'react-icons/fa';
import 'react-tabs/style/react-tabs.css';

import {
  addAnimeToFavourites,
  getAnimeFavourites,
  removeAnimeFromFavourites,
  reset,
} from '../../redux/favourites/favouritesSlice';

import AboutTab from '../../components/tabs/anime/AboutTab';
import EpisodesTab from '../../components/tabs/anime/EpisodesTab';
import CharactersTab from '../../components/tabs/anime/CharactersTab';
import ReviewsTab from '../../components/tabs/anime/ReviewsTab';

const Anime = () => {
  const [anime, setAnime] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const { favouriteAnime, isError, isSuccess, message } = useSelector(
    (state) => state.favourites
  );

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.animeId}/full`
        );
        const anime = await response.json();

        setAnime(anime.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getAnime();
  }, [params.animeId]);

  useEffect(() => {
    const getFavourites = async () => {
      dispatch(getAnimeFavourites());
    };
    getFavourites();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const isFavourite = () => {
    const animeId = params.animeId;
    const list = favouriteAnime;
    const checkList = list.find((anime) => anime.mal_id === parseInt(animeId));
    return checkList;
  };

  const handleFavouriteClick = () => {
    if (isFavourite()) {
      const mal_id = anime.mal_id;
      dispatch(removeAnimeFromFavourites(mal_id));
    } else {
      const newFavourite = {
        mal_id: anime.mal_id,
        name: anime.title_english,
        image_url: anime.images.webp.large_image_url,
      };
      dispatch(addAnimeToFavourites(newFavourite));
    }
  };

  if (isloading) return <div>Loading...</div>;

  return (
    <div className='anime-page-container'>
      <div className='about-anime-container'>
        <section className='about-anime-section'>
          <div className='about-anime-card'>
            <div className='about-anime-card-container'>
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title_english ?? anime.title_japanese}
                className='about-anime-image'
              />
            </div>
            <div className='about-anime-card-body'>
              <h2 className='title'>
                {anime.title_english ?? anime.title_japanese}{' '}
                {anime.year && ` - ${anime.year}`}
              </h2>
              <div className='card-button-container'>
                <button
                  className={`btn btn-favourite ${
                    isFavourite() ? 'btn-favourite-checked' : ''
                  }`}
                  onClick={handleFavouriteClick}
                >
                  <FaRegStar /> Favourite
                </button>
                <button className='btn btn-planning'>
                  <FaRegListAlt /> Plan To Watch
                </button>
                <button className='btn btn-watching'>
                  <FaRegEye /> Watching
                </button>
                <button className='btn btn-completed'>
                  <FaTrophy /> Completed
                </button>
              </div>
              <p>
                Score: {anime.score} ({anime.scored_by} votes)
              </p>
              <p>
                Studio:{' '}
                {anime.studios.length > 0 ? anime.studios[0].name : 'Unknown'}
              </p>
              <p>
                Aired: {anime.aired.string} - {anime.status}
              </p>
              <p>
                Type: {anime.type} ({anime.episodes} episodes)
              </p>
              <p>Source: {anime.source}</p>
              <p>Rating: {anime.rating}</p>
            </div>
          </div>
        </section>

        <main className='about-anime-main'>
          <Tabs>
            <TabList>
              <Tab>About</Tab>
              {anime.type === 'TV' && <Tab>Episodes</Tab>}
              <Tab>Characters</Tab>
              <Tab>Reviews</Tab>
            </TabList>

            <TabPanel>
              <AboutTab
                description={anime.synopsis}
                trailer={anime.trailer.embed_url}
              />
            </TabPanel>
            {anime.type === 'TV' && (
              <TabPanel>
                <EpisodesTab />
              </TabPanel>
            )}
            <TabPanel>
              <CharactersTab />
            </TabPanel>
            <TabPanel>
              <ReviewsTab />
            </TabPanel>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Anime;
