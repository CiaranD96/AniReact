import ActionButtons from "./ActionButtons";

const AnimeInfoSection = ({
  anime,
  isFavourite,
  isInWatchList,
  onFavouriteClick,
  onAddToList,
}) => {
  return (
    <section className="about-anime-section">
      <div className="about-anime-card">
        <div className="about-anime-card-container">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title_english ?? anime.title_japanese}
            className="about-anime-image"
          />
        </div>
        <div className="about-anime-card-body">
          <h2 className="title">
            {anime.title_english ?? anime.title_japanese}{" "}
            {anime.year && ` - ${anime.year}`}
          </h2>
          <ActionButtons
            isFavourite={isFavourite}
            isInWatchList={isInWatchList}
            onFavouriteClick={onFavouriteClick}
            onAddToList={onAddToList}
          />
          <p>
            Score: {anime.score} ({anime.scored_by} votes)
          </p>
          <p>
            Studio:{" "}
            {anime.studios.length > 0 ? anime.studios[0].name : "Unknown"}
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
  );
};

export default AnimeInfoSection;
