import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface LayoutProps {
  children?: JSX.Element | JSX.Element[];
}

const Container = styled.div({
  padding: 24,
});

const Layout = (props: LayoutProps) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Videos</Typography>
      </Toolbar>
    </AppBar>
    <Container>{props.children}</Container>
  </>
);

export default Layout;
