import React from 'react';
import styled from '@emotion/styled';

interface CardProps {
  children?: JSX.Element | JSX.Element[];
  title?: string | JSX.Element;
}

const Div = styled.div({
  background: '#fff',
  marginBottom: 16,
  borderRadius: 8,
  boxShadow: '0 8px 4px 0px #0000000f, 0 2px 2px 0px #0000000f',
  padding: 16,
  minHeight: 300,
});

const Title = styled.h2({
  borderBottom: '1px solid #eee',
  margin: '0 0 24px 0',
  paddingBottom: 8,
});

const Card = (props: CardProps) => {
  const { children, title } = props;

  return (
    <Div>
      {title && <Title>{title}</Title>}
      {children}
    </Div>
  );
};

export default React.memo(Card);
