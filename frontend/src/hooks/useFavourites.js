import { useSelector, useDispatch } from "react-redux";
import {
  addAnimeToFavourites,
  getAnimeFavourites,
  removeAnimeFromFavourites,
  reset,
} from "../redux/favourites/favouritesSlice";

export const useFavourites = () => {
  const dispatch = useDispatch();
  const { favouriteAnime, isError, isSuccess, message } = useSelector(
    (state) => state.favourites,
  );

  const initializeFavourites = () => {
    dispatch(getAnimeFavourites());
  };

  const isFavourite = (animeId) =>
    favouriteAnime?.find((anime) => anime.mal_id === parseInt(animeId));

  const toggleFavourite = (anime) => {
    if (isFavourite(anime.mal_id)) {
      dispatch(removeAnimeFromFavourites(anime.mal_id));
    } else {
      dispatch(
        addAnimeToFavourites({
          mal_id: anime.mal_id,
          name: anime.title_english,
          image_url: anime.images.webp.large_image_url,
        }),
      );
    }
  };

  const resetState = () => {
    dispatch(reset());
  };

  return {
    isFavourite,
    toggleFavourite,
    initializeFavourites,
    resetState,
    isError,
    isSuccess,
    message,
  };
};
