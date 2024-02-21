import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <div className='card'>
      <Link to={`/anime/${anime.mal_id}`}>
        <div className='card-image-container'>
          <div className='anime-rank'>{anime.rank ? anime.rank : '?'}</div>
          <img
            className='card-image'
            src={anime.images.webp.large_image_url}
            alt={anime.title_english}
          />
        </div>
        <div className='card-body'>
          <h3 className='title'>
            {anime.title_english ?? anime.title_japanese}
          </h3>
          <p>
            Studio:{' '}
            {anime.studios.length > 0 ? anime.studios[0].name : 'Unknown'}
          </p>
          <p>Score: {anime.score}</p>
          <p>
            Aired: {anime.aired.string} - {anime.status}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard;
