import { Routes, Route, Outlet } from 'react-router-dom';
import { routePaths } from './common/routePaths';
import { VideoManager, VideoFormContainer } from './components/features';
import { Layout } from './components/layout';
import { ThemeProvider } from '@emotion/react';
import { theme } from './common/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path={routePaths.HOME} element={<Outlet />}>
            <Route index element={<VideoManager />} />
            <Route path={routePaths.CREATE_VIDEO} element={<VideoFormContainer mode="new" />} />
            <Route path={routePaths.EDIT_VIDEO} element={<VideoFormContainer mode="edit" />} />
          </Route>
          <Route path={routePaths.ABOUT_US} element={<div>About us</div>} />
          <Route path={routePaths.FAQ} element={<div>FAQ</div>} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
