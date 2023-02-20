import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PodcastsPage, PodcastPage } from '../pages';

export const PodcastsRoutes = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<PodcastsPage />}></Route>
        <Route path="podcast/:podcastId" element={<PodcastPage />}></Route>
        {/* <Route path="search" element={<SearchPage />}></Route>
        <Route path="podcast/:podcastId" element={<Podcast />}></Route>
        <Route
          path="podcast/:podcastId/:episodeId"
          element={<Episode />}
        ></Route> */}
      </Routes>
    </Container>
  );
};
