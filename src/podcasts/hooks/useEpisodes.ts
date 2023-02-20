import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { Buffer } from 'buffer';
import {
  AlloriginsOutput,
  EpisodeFeedXMLOutput,
  episodesFailed,
  episodesLoaded,
  episodesLoading,
  EpisodesOutput,
  RootState,
} from '../../store';
import convert from 'xml-js';

export const useEpisodes = (podcastId: string) => {
  const dispatch = useDispatch();
  const effectRef = useRef(false);
  const isLoading = useSelector(
    (state: RootState) => state.podcasts.episodesLoading,
  );
  const episodes = useSelector((state: RootState) => state.podcasts.episodes);

  async function fetchEpisodes() {
    try {
      dispatch(episodesLoading());
      const { data } = await api.get<AlloriginsOutput>(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}`,
        )}`,
      );

      const dataObj: EpisodesOutput = JSON.parse(data.contents);

      console.log(dataObj.results[0].feedUrl);

      if (dataObj.results[0].feedUrl) {
        const feedsBase64 = await api.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `${dataObj.results[0].feedUrl}`,
          )}`,
        );
        const feedsString = Buffer.from(
          feedsBase64.data.contents.split(
            'data:application/rss+xml; charset=utf-8;base64,',
          )[1],
          'base64',
        ).toString();
        const feedsJson: EpisodeFeedXMLOutput = JSON.parse(
          convert.xml2json(feedsString),
        );
        dispatch(episodesLoaded(feedsJson));
      }
    } catch (error) {
      dispatch(episodesFailed());
      console.log(error);
    }
  }

  useEffect(() => {
    if (effectRef.current === false) {
      fetchEpisodes();
      return () => {
        effectRef.current = true;
      };
    }
  }, []);

  return {
    episodes,
    isLoading,
    fetchEpisodes,
  };
};
