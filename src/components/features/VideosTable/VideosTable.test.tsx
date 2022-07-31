import { render, screen, within } from '@testing-library/react';
import { processedVideos } from '../../../testData';
import VideosTable from './VideosTable';

describe('Videos Table Component', () => {
  it('intial render', () => {
    render(<VideosTable videos={[]} />);
    screen.getByRole('table');
  });

  it('should display table with no data message if videos would be empty', () => {
    render(<VideosTable videos={[]} />);
    screen.getByText('No data!');
  });

  it('should display table with right number of rows in order to videos length', () => {
    render(<VideosTable videos={processedVideos} />);

    const rows = screen.queryAllByRole('row');
    expect(rows.length).toEqual(3);
  });

  it('should display table cells correctly', () => {
    render(<VideosTable videos={processedVideos} />);

    const rows = screen.queryAllByRole('row');

    within(rows[1]).getByText('Set the Moon');
    within(rows[1]).getByText('Thriller, Crime');
    within(rows[2]).getByText('David Munch');
    within(rows[2]).getByText('two 1080p');
  });
});
