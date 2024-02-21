import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import Completed from '../components/tabs/profile/Completed';
import Favourites from '../components/tabs/profile/Favourites';
import PlanToWatch from '../components/tabs/profile/PlanToWatch';
import Watching from '../components/tabs/profile/Watching';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

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
            <PlanToWatch />
          </TabPanel>

          <TabPanel>
            <Watching />
          </TabPanel>

          <TabPanel>
            <Completed />
          </TabPanel>

          <TabPanel>
            <Favourites />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
