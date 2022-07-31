import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface LoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
  delay?: number;
}

const Loading = (props: LoadingProps): JSX.Element => {
  const { isLoading, children, delay } = props;
  const [showLoading, setShowLoading] = useState<boolean>(delay ? false : true);
  const timerRef = useRef<any>();

  useEffect(() => {
    if (delay) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (isLoading === true) {
        timerRef.current = setTimeout(() => {
          setShowLoading(true);
        }, delay);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return isLoading && showLoading ? (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <CircularProgress role="progressbar" />
    </Box>
  ) : (
    <>{children}</>
  );
};

export default Loading;
