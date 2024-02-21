import WatchListCard from '../../cards/WatchListCard';

const WatchList = ({ list }) => {
  console.log(list);
  return (
    <section className='watch-list-container'>
      {list.length > 0
        ? list.map((anime) => (
            <WatchListCard key={anime.mal_id} anime={anime} />
          ))
        : 'Oops, you have not added anything to this list yet!'}
    </section>
  );
};

export default WatchList;
