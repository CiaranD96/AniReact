import {
  FaRegStar,
  FaRegListAlt,
  FaRegEye,
  FaRegEyeSlash,
  FaTrophy,
  FaRegPauseCircle,
} from "react-icons/fa";

const ActionButtons = ({
  isFavourite,
  isInWatchList,
  onFavouriteClick,
  onAddToList,
}) => {
  return (
    <div className="card-button-container">
      <button
        className={`btn btn-favourite ${
          isFavourite ? "btn-favourite-checked" : ""
        }`}
        onClick={onFavouriteClick}
      >
        <FaRegStar /> Favourite
      </button>
      <button
        className={`btn btn-planning ${
          isInWatchList?.status === "plan to watch" ? "btn-active" : ""
        }`}
        onClick={() => onAddToList("plan to watch")}
      >
        <FaRegListAlt /> Plan To Watch
      </button>

      <button
        className={`btn btn-watching ${
          isInWatchList?.status === "watching" ? "btn-active" : ""
        }`}
        onClick={() => onAddToList("watching")}
      >
        <FaRegEye /> Watching
      </button>

      <button
        className={`btn btn-completed ${
          isInWatchList?.status === "completed" ? "btn-active" : ""
        }`}
        onClick={() => onAddToList("completed")}
      >
        <FaTrophy /> Completed
      </button>

      <button
        className={`btn btn-completed ${
          isInWatchList?.status === "on hold" ? "btn-active" : ""
        }`}
        onClick={() => onAddToList("on hold")}
      >
        <FaRegPauseCircle /> On Hold
      </button>

      <button
        className={`btn btn-watching ${
          isInWatchList?.status === "dropped" ? "btn-active" : ""
        }`}
        onClick={() => onAddToList("dropped")}
      >
        <FaRegEyeSlash /> Dropped
      </button>
    </div>
  );
};

export default ActionButtons;
