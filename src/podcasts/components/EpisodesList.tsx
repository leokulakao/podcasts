// import { useState, useEffect } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useEpisodes } from '../hooks';
import { Link, useParams } from 'react-router-dom';
import { Episode } from '../../store';

export const EpisodesList = () => {
  const { podcastId = null } = useParams();

  const { isLoading, episodes } = useEpisodes(
    podcastId === null ? '' : podcastId,
  );

  console.log('episodes -> ', episodes);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            episodes.map((episode: Episode, index: any) => (
              <tr key={index}>
                <td>
                  <Link to={`/podcast/${podcastId}/${episode.trackId}`}>
                    {episode.trackId}
                  </Link>
                </td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row className="mt-3 mb-3"></Row>
    </>
  );
};
