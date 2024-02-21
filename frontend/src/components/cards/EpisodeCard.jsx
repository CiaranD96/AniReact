const EpisodeCard = ({ episode }) => {
  return (
    <div className='episode-card'>
      <h3 className='title'>{episode.title}</h3>
      <p>Aired: {new Date(episode.aired).toLocaleString()}</p>
      <p>Score: {episode.score}</p>
      <p>Filler: {episode.filler ? 'Yes' : 'No'}</p>
      <p>Recap: {episode.recap ? 'Yes' : 'No'}</p>
      <p>
        <a
          href={episode.forum_url}
          className='title'
          target='_blank'
          rel='noopener noreferrer'
        >
          MyAnime Forum URL
        </a>
      </p>
    </div>
  );
};

export default EpisodeCard;
