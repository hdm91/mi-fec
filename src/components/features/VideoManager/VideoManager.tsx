import { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { useResolveData } from '../../../hooks';
import { ProcessedVideo, VideoTableCommandEventArgs } from '../../../common/interfaces';
import { routePaths } from '../../../constants';
import { getVideos, removeVideo } from '../../../services/videos';
import { AlertDialog, Card, Loading } from '../../shared';
import { VideosTable } from '../VideosTable';

interface dialogState {
  visible: boolean;
  data?: {
    authorId: number;
    videoId: number;
  };
}

const VideoManager = () => {
  const { data, loading, reload, error } = useResolveData<ProcessedVideo[]>(getVideos);
  const navigate = useNavigate();
  const [dialogState, setDialogState] = useState<dialogState>({ visible: false });

  const handleAdd = () => {
    navigate(routePaths.CREATE_VIDEO);
  };

  const handleEdit = useCallback(
    (args: VideoTableCommandEventArgs) => {
      const path = generatePath(routePaths.EDIT_VIDEO, {
        videoId: args.videoId.toString(),
        authorId: args.authorId.toString(),
      });

      navigate(path);
    },
    [navigate]
  );

  const handleDelete = useCallback((args: VideoTableCommandEventArgs) => {
    const { authorId, videoId } = args;
    setDialogState({ visible: true, data: { authorId, videoId } });
  }, []);

  const handleDialogOk = () => {
    if (dialogState.data) {
      const { authorId, videoId } = dialogState.data;

      removeVideo(videoId, authorId).then(() => {
        reload();
        setDialogState({ visible: false });
      });
    }
  };

  const handleDialogCancel = () => {
    setDialogState({ visible: false });
  };

  if (error) {
    return <h1>Oops, something went wrong.</h1>;
  }

  return (
    <Card
      title={
        <Box sx={{ display: 'flex' }}>
          <>VManager Demo v0.0.1</>
          <Box sx={{ flexGrow: 1 }} />
          <Box mb={1}>
            <Button onClick={handleAdd} variant="contained">
              Add Video
            </Button>
          </Box>
        </Box>
      }>
      <Loading delay={300} isLoading={loading}>
        {data && <VideosTable videos={data} onEdit={handleEdit} onDelete={handleDelete} />}
      </Loading>
      <AlertDialog
        onOk={handleDialogOk}
        onCancel={handleDialogCancel}
        visible={dialogState.visible}
        title="Warning"
        message="Are you sure you want to delete this video?"
      />
    </Card>
  );
};

export default VideoManager;
