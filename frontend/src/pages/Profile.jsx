import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getAnimeFavourites } from "../redux/favourites/favouritesSlice";
import { getAnimeWatchList } from "../redux/watchList/watchListSlice";

import "react-tabs/style/react-tabs.css";

import WatchList from "../components/tabs/profile/WatchList";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { favouriteAnime } = useSelector((state) => state.favourites);
  const { watchList } = useSelector((state) => state.watchList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimeFavourites());
    dispatch(getAnimeWatchList());
  }, [dispatch]);

  const getList = (status) => {
    return watchList.filter((anime) => anime.status === status);
  };

  const getFavourites = () => {
    const list = favouriteAnime;

    return list;
  };

  return (
    <div className="profile-page-container">
      <section className="profile-about-container">
        <h3 className="title">{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>
          Account created on: {new Date(user.createdAt).toLocaleString("en-GB")}
        </p>
      </section>

      <main className="profile-list-container">
        <Tabs>
          <TabList>
            <Tab>Favourites</Tab>
            <Tab>Plan To Watch</Tab>
            <Tab>Watching</Tab>
            <Tab>Completed</Tab>
            <Tab>On Hold</Tab>
            <Tab>Dropped</Tab>
          </TabList>

          <TabPanel>
            <WatchList list={getFavourites()} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList("plan to watch")} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList("watching")} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList("completed")} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList("on hold")} />
          </TabPanel>

          <TabPanel>
            <WatchList list={getList("dropped")} />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
