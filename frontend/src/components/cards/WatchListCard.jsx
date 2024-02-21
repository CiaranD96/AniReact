import { Link } from 'react-router-dom';

const WatchListCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <div className='watch-list-card'>
        <img
          src={anime.image_url}
          alt={anime.name}
          className='watch-list-image'
        />
        <div className='watch-list-about'>
          <h3 className='title'>{anime.name}</h3>
          <p>{new Date(anime.timestamp).toLocaleString('en-GB')}</p>
        </div>
      </div>
    </Link>
  );
};

export default WatchListCard;
