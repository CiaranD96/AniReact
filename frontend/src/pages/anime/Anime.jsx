import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import "react-tabs/style/react-tabs.css";

import { useAnimeData } from "../../hooks/useAnimeData";
import { useFavourites } from "../../hooks/useFavourites";
import { useWatchList } from "../../hooks/useWatchList";

import AboutTab from "../../components/tabs/anime/AboutTab";
import EpisodesTab from "../../components/tabs/anime/EpisodesTab";
import CharactersTab from "../../components/tabs/anime/CharactersTab";
import ReviewsTab from "../../components/tabs/anime/ReviewsTab";
import AnimeInfoSection from "../../components/tabs/anime/AnimeInfoSection";

const Anime = () => {
  const { animeId } = useParams();
  const { user } = useSelector((state) => state.auth);

  // Data fetching
  const { anime, isLoading } = useAnimeData(animeId);

  // Favorites logic
  const {
    isFavourite: checkIsFavourite,
    toggleFavourite,
    initializeFavourites,
    resetState: resetFavouritesState,
    isError: favIsError,
    isSuccess: favIsSuccess,
    message: favMessage,
  } = useFavourites();

  // Watch list logic
  const {
    isInWatchList: checkIsInWatchList,
    addToList,
    initializeWatchList,
    resetState: resetWatchListState,
    isError: watchIsError,
    isSuccess: watchIsSuccess,
    message: watchMessage,
  } = useWatchList();

  // Initialize data on mount/user change
  useEffect(() => {
    if (user) {
      initializeFavourites();
      initializeWatchList();
    }
  }, [user]);

  // Handle toast notifications for favorites
  useEffect(() => {
    if (favIsError) {
      toast.error(favMessage);
      resetFavouritesState();
    }
    if (favIsSuccess) {
      toast.success(favMessage);
      resetFavouritesState();
    }
  }, [favIsError, favIsSuccess]);

  // Handle toast notifications for watch list
  useEffect(() => {
    if (watchIsError) {
      toast.error(watchMessage);
      resetWatchListState();
    }
    if (watchIsSuccess) {
      toast.success(watchMessage);
      resetWatchListState();
    }
  }, [watchIsError, watchIsSuccess]);

  // Handlers
  const handleFavouriteClick = () => {
    if (!user) {
      toast.error("Please log in to add to favourites");
      return;
    }
    toggleFavourite(anime);
  };

  const handleAddToList = (status) => {
    if (!user) {
      toast.error("Please log in to add to list");
      return;
    }
    addToList(anime, status);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!anime) return <div>Anime not found</div>;

  const isFavourite = checkIsFavourite(animeId);
  const isInWatchList = checkIsInWatchList(animeId);

  return (
    <div className="anime-page-container">
      <div className="about-anime-container">
        <AnimeInfoSection
          anime={anime}
          isFavourite={!!isFavourite}
          isInWatchList={isInWatchList}
          onFavouriteClick={handleFavouriteClick}
          onAddToList={handleAddToList}
        />

        <main className="about-anime-main">
          <Tabs>
            <TabList>
              <Tab>About</Tab>
              {anime.type === "TV" && <Tab>Episodes</Tab>}
              <Tab>Characters</Tab>
              <Tab>Reviews</Tab>
            </TabList>

            <TabPanel>
              <AboutTab
                description={anime.synopsis}
                trailer={anime.trailer.embed_url}
              />
            </TabPanel>
            {anime.type === "TV" && (
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
