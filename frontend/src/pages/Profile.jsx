import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import WatchList from '../components/tabs/profile/WatchList';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const getList = (status) => {
    const list = user.animeList;
    const filteredList = list.filter((anime) => anime.status === status);

    return filteredList;
  };

  const getFavourites = () => {
    const list = user.favouriteAnime;

    return list;
  };

  return (
    <div className='profile-page-container'>
      <section className='profile-about-container'>
        <h3 className='title'>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>
          Account created on: {new Date(user.createdAt).toLocaleString('en-GB')}
        </p>
      </section>

      <main className='profile-list-container'>
        <Tabs>
          <TabList>
            <Tab>Plan To Watch</Tab>
            <Tab>Watching</Tab>
            <Tab>Completed</Tab>
            <Tab>Favourites</Tab>
          </TabList>

          <TabPanel>
            <WatchList list={getList('plan to watch')} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList('watching')} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList('completed')} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getFavourites()} />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
