import { useState } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { usePodcasts } from '../hooks/usePodcasts';
import { Podcast } from '../../store';
import { PodcastCard } from './PodcastCard';

export const PodcastsList = () => {
  const { podcasts, isLoading } = usePodcasts();
  const [query, setQuery] = useState([]);

  const onChangeEvent = (event: any) => {
    setQuery(event.target.value);
  };

  if (!podcasts) {
    return <p>Not fouded</p>;
  }
  return !isLoading ? (
    <>
      <Row className="mt-3 mb-3">
        <Col></Col>
        <Col xs={4}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Filter podcasts"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={query}
              onChange={onChangeEvent}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {!isLoading &&
          podcasts.map((podcast: Podcast, index: any) => (
            <PodcastCard key={index} podcast={podcast} />
          ))}
      </Row>
    </>
  ) : (
    <p>Loading...</p>
  );
};
