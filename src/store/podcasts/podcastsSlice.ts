import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Podcast,
  Image,
  PodcastsOutput,
  PodcastsState,
  // EpisodesOutput,
  // Episode,
  EpisodeFeedXMLOutput,
  ElementXMLEnum,
  Episode,
  // ElementXMLEnum,
} from './podcastsTypes';

const initialState: PodcastsState = {
  podcasts: [],
  podcastsLoading: false,
  podcastsLoaded: false,
  podcastsFailed: false,

  episodes: [],
  episodesLoading: false,
  episodesLoaded: false,
  episodesFailed: false,
};

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    podcastsListLoading: (state: PodcastsState) => {
      state.podcastsLoading = true;
      state.podcastsLoaded = false;
      state.podcastsFailed = false;
    },
    podcastsListLoaded: (
      state: PodcastsState,
      action: PayloadAction<PodcastsOutput>,
    ) => {
      const payload = action.payload;
      state.podcasts = [];
      for (let index = 0; index < payload.feed.entry.length; index++) {
        const element = payload.feed.entry[index];
        if (element.id.attributes?.['im:id']) {
          const newPodcastImages: Image[] = element['im:image'].map(
            (image): Image => {
              return { height: +image.attributes.height, uri: image.label };
            },
          );
          const newPodcast: Podcast = {
            id: element.id.attributes?.['im:id'],
            image: newPodcastImages,
            title: element.title.label,
            artist: element['im:artist'].label,
          };
          state.podcasts.push(newPodcast);
        }
      }
      state.podcastsLoading = false;
      state.podcastsLoaded = true;
      state.podcastsFailed = false;
    },
    podcastsListFailed: (state: PodcastsState) => {
      state.podcastsLoading = false;
      state.podcastsLoaded = false;
      state.podcastsFailed = true;
    },

    episodesLoading: (state: PodcastsState) => {
      state.episodesLoading = true;
      state.episodesLoaded = false;
      state.episodesFailed = false;
    },
    episodesLoaded: (
      state: PodcastsState,
      action: PayloadAction<EpisodeFeedXMLOutput>,
    ) => {
      const payload = action.payload;
      state.episodes = [];
      const channelId = payload.elements[0].elements.findIndex(
        (e) => e.name === 'channel',
      );
      for (
        let index = 0;
        index < payload.elements[0].elements[channelId].elements.length;
        index++
      ) {
        const element = payload.elements[0].elements[channelId].elements[index];
        if (element.name === 'item') {
          console.log(element);
          const newEpisode: Episode = {
            title: '',
            description: '',
            date: '',
            trackId: '',
            duration: '',
            link: '',
          };
          element.elements.forEach((e) => {
            if (e.name === ElementXMLEnum.Guid) {
              newEpisode.trackId = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }

            if (e.name === ElementXMLEnum.Description) {
              newEpisode.description = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }

            if (e.name === ElementXMLEnum.Link) {
              newEpisode.link = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }

            if (e.name === ElementXMLEnum.Title) {
              newEpisode.title = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }

            if (e.name === ElementXMLEnum.ItunesDuration) {
              newEpisode.duration = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }

            if (e.name === ElementXMLEnum.PubDate) {
              newEpisode.date = (
                e.elements[0].type === 'cdata'
                  ? e.elements[0].cdata
                  : e.elements[0].text
              ) as string;
            }
          });
          state.episodes.push(newEpisode);
        }
      }
      console.log(payload);
      state.episodesLoading = false;
      state.episodesLoaded = true;
      state.episodesFailed = false;
    },
    episodesFailed: (state: PodcastsState) => {
      state.episodesLoading = false;
      state.episodesLoaded = false;
      state.episodesFailed = true;
    },
  },
});

export const {
  podcastsListLoading,
  podcastsListLoaded,
  podcastsListFailed,
  episodesLoading,
  episodesLoaded,
  episodesFailed,
} = podcastsSlice.actions;

export default podcastsSlice.reducer;
