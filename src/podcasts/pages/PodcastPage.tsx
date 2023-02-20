import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Card, Col, Row, Image } from 'react-bootstrap';
import { MainLayout } from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { selectPodcastById } from '../../store/podcasts/podcastsSelector';
import { EpisodesList } from '../components/EpisodesList';

export const PodcastPage = () => {
  const { podcastId = null } = useParams();
  const podcast = useSelector(
    selectPodcastById(podcastId === null ? '' : podcastId),
  );

  console.log(podcast);
  // const { episodes, isLoading } = useEpisodes();
  if (!podcast) {
    return <>Not found</>;
  }

  return (
    <MainLayout>
      <Breadcrumb className="mt-2 mb-5">
        <Breadcrumb.Item href="/">Podcast List</Breadcrumb.Item>
        <Breadcrumb.Item active>{podcast?.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={3}>
          <Card className="pod__detail">
            <Card.Body>
              <div className="border-bottom">
                <Image
                  className="pod__imagepodcastbig mb-4"
                  src={podcast?.image[2].uri}
                  fluid
                />
              </div>
              <div className="border-bottom mt-2">
                <h4>{podcast?.title}</h4>
                <h5>
                  <em>by {podcast?.artist}</em>
                </h5>
              </div>
              <div className="border-bottom mt-2">
                {/* <h5>
                  <strong>Description</strong>
                </h5>
                <h5>
                  <em>{pod.summary.label}</em>
                </h5> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="pod__detail mb-3"></Card>
          <Card className="pod__detail">
            <Card.Body>
              <EpisodesList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};
