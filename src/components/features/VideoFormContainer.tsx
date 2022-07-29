import { Skeleton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResolveData } from '../../common/hooks';
import { VideoToSave } from '../../common/interfaces';
import { routePaths } from '../../common/routePaths';
import { createVideo, getVideoById, updateVideo } from '../../services/videos';
import { Card, Loading } from '../shared';
import VideoForm from './VideoForm';

interface VideoFormContainerProps {
  mode: 'edit' | 'new';
}

const VideoFormContainer = (props: VideoFormContainerProps) => {
  const { mode } = props;
  const navigate = useNavigate();
  const { videoId, authorId } = useParams() || {};

  const { data, loading } = useResolveData(() => {
    if (mode === 'edit') {
      return getVideoById(Number(videoId), Number(authorId)).then((video) => ({ ...video, categories: video.categories.map((v) => v.id) }));
    }
  });

  const handleSubmit = useCallback((values: VideoToSave) => {
    if (mode === 'new') {
      createVideo(values).then(() => {
        navigate(routePaths.HOME);
      });
    } else {
      if (authorId) {
        updateVideo(values, Number(authorId)).then(() => {
          navigate(routePaths.HOME);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = useCallback(() => {
    navigate(routePaths.HOME);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  if (mode === 'new') {
    return (
      <Card title={'Add video'}>
        <VideoForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Card>
    );
  }

  return (
    <Card title={loading ? <Skeleton animation="wave" /> : `Edit video: ${data ? data.name : ''}`}>
      <Loading isLoading={loading} delay={300}>
        {!loading && data ? <VideoForm video={data} onSubmit={handleSubmit} onCancel={handleCancel} /> : <></>}
      </Loading>
    </Card>
  );
};

export default VideoFormContainer;
