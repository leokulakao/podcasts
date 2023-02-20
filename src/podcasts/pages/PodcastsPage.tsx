// import { PodcastsList } from '../components/PodcastsList';
// import { SearchInput } from '../components/SearchInput';
import { MainLayout } from '../../layouts/MainLayout';
import { PodcastsList } from '../components/PodcastsList';

export const PodcastsPage = () => {
  return (
    <MainLayout>
      <PodcastsList></PodcastsList>
    </MainLayout>
  );
};
