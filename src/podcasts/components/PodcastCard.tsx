import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Podcast } from '../../store';

interface Props {
  podcast: Podcast;
}

export const PodcastCard: React.FC<Props> = ({ podcast }) => {
  const selectedImage = podcast.image.length > 0 ? podcast.image[0] : null;
  return (
    <Col md={3} sm={6} key={podcast.id} className="mb-5 mt-3 pod__list">
      <Link to={`/podcast/${podcast.id}`}>
        <Card className="shadow border-0">
          <Card.Body>
            <div className="text-center">
              <Image
                className="pod__imagepodcast mb-4"
                roundedCircle
                src={selectedImage?.uri}
                fluid
              />
              <h5>{podcast.title}</h5>
              <h6>Author: {podcast.artist}</h6>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
