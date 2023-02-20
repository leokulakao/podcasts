import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PodcastsRoutes } from '../podcasts/routes/PodcastsRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<PodcastsRoutes />}></Route>
    </Routes>
  );
};
