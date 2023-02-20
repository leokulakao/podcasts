import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Podcast } from './podcastsTypes';

const podcasts = (state: RootState) => state.podcasts.podcasts;

export const selectPodcastById = (id: string) =>
  createSelector(podcasts, (_) => {
    let result: Podcast[] = [];
    _.forEach((podcast: Podcast) => {
      if (podcast.id === id) {
        result.push(podcast);
      }
    });
    return result.length > 0 ? result[0] : null;
  });
