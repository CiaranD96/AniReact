import { useSelector, useDispatch } from "react-redux";
import {
  getAnimeWatchList,
  addAnimeToWatchList,
  reset as watchListReset,
} from "../redux/watchList/watchListSlice";

export const useWatchList = () => {
  const dispatch = useDispatch();
  const { watchList, isError, isSuccess, message } = useSelector(
    (state) => state.watchList,
  );

  const initializeWatchList = () => {
    dispatch(getAnimeWatchList());
  };

  const isInWatchList = (animeId) =>
    watchList?.find((anime) => anime.mal_id === parseInt(animeId));

  const addToList = (anime, status) => {
    dispatch(
      addAnimeToWatchList({
        mal_id: anime.mal_id,
        name: anime.title_english,
        image_url: anime.images.webp.large_image_url,
        status,
      }),
    );
  };

  const resetState = () => {
    dispatch(watchListReset());
  };

  return {
    isInWatchList,
    addToList,
    initializeWatchList,
    resetState,
    isError,
    isSuccess,
    message,
  };
};
