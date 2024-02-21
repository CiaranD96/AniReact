const CharactersCard = ({ character }) => {
  return (
    <div className='character-card'>
      <img
        src={character.character.images.webp.image_url}
        alt={character.character.name}
        className='character-card-image'
      />
      <div className='character-card-body'>
        <h3 className='title'>
          {character.character.name} <span> - {character.role}</span>
        </h3>
      </div>
    </div>
  );
};

export default CharactersCard;
