import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface LoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
  delay?: number;
}

const Loading = (props: LoadingProps): JSX.Element => {
  const { isLoading, children, delay } = props;
  const [showLoading, setShowLoading] = useState<boolean>(delay ? false : true);

  useEffect(() => {
    let timer: any;
    if (delay) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading && showLoading ? (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <>{children}</>
  );
};

export default Loading;
