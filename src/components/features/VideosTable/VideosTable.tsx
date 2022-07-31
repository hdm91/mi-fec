import React from 'react';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ProcessedVideo, VideoTableCommandEventArgs, VideoTableSearchEventArgs } from '../../../common/interfaces';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { getCategoriesFormatted, getHighestQualityFormat } from '../../../utils';
import { isFunction } from '../../../utils';

interface VideosTableProps {
  videos: ProcessedVideo[];
  onDelete?: (args: VideoTableCommandEventArgs) => void;
  onEdit?: (args: VideoTableCommandEventArgs) => void;
  onSearch?: (args: VideoTableSearchEventArgs) => void;
}

const HeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
  },
}));

const OptionButton = styled(Button)({
  margin: 4,
  fontSize: '12px',
});

const VideosTable = (props: VideosTableProps) => {
  const { videos, onDelete, onEdit } = props;

  const handleEdit = (videoId: number, authorId: number) => {
    if (isFunction(onEdit)) {
      onEdit({ videoId, authorId });
    }
  };

  const handleDelete = (videoId: number, authorId: number) => {
    if (isFunction(onDelete)) {
      onDelete({ videoId, authorId });
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>Video Name</HeaderCell>
            <HeaderCell>Author</HeaderCell>
            <HeaderCell>Categories</HeaderCell>
            <HeaderCell>Release Date</HeaderCell>
            <HeaderCell>Highest quality format</HeaderCell>
            <HeaderCell>Options</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={`${video.authorId}-${video.id}`}>
              <TableCell>{video.name}</TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{getCategoriesFormatted(video)}</TableCell>
              <TableCell>{video.releaseDate}</TableCell>
              <TableCell>{getHighestQualityFormat(video.formats)}</TableCell>
              <TableCell>
                <OptionButton onClick={() => handleEdit(video.id, video.authorId)} size="small" variant="contained">
                  Edit
                </OptionButton>
                <OptionButton onClick={() => handleDelete(video.id, video.authorId)} size="small" variant="contained" color="error">
                  Delete
                </OptionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {videos.length === 0 && (
        <Typography variant={'body1'} sx={{ textAlign: 'center', marginTop: 2, color: '#565656' }}>
          No data!
        </Typography>
      )}
    </TableContainer>
  );
};

export default React.memo(VideosTable);
