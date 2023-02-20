import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import {
  podcastsListFailed,
  podcastsListLoaded,
  podcastsListLoading,
  PodcastsOutput,
  RootState,
} from '../../store';

export const usePodcasts = () => {
  const dispatch = useDispatch();
  const effectRef = useRef(false);
  const isLoading = useSelector(
    (state: RootState) => state.podcasts.podcastsLoading,
  );
  const podcasts = useSelector((state: RootState) => state.podcasts.podcasts);

  async function fetchPodcasts() {
    try {
      dispatch(podcastsListLoading());
      const { data } = await api.get<PodcastsOutput>(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      );
      dispatch(podcastsListLoaded(data));
    } catch (error) {
      dispatch(podcastsListFailed());
      console.log(error);
    }
  }

  useEffect(() => {
    if (effectRef.current === false) {
      fetchPodcasts();
      return () => {
        effectRef.current = true;
      };
    }
  }, []);

  return {
    podcasts,
    isLoading,
    fetchPodcasts,
  };
};
