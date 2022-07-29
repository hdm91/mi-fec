import { useEffect, useState } from 'react';
import { isFunction } from '../../utils/isWhat';

export const useResolveData = <T>(fn: () => Promise<T> | undefined) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  const reload = () => {
    if (isFunction(fn)) {
      const fnResult = fn();
      if (fnResult && isFunction(fnResult?.then)) {
        fnResult
          ?.then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((reason) => setError(reason))
          .finally(() => setLoading(false));
      }
    }
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, reload };
};
