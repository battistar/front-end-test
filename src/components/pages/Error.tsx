import styled from 'styled-components';
import GlobalStyle from '../../GlobalStyle';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Meme = styled.h2`
  font-size: 3rem;
  margin: 0;
`;

const Error = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Page not found</Title>
        <Meme>¯\_(ツ)_/¯</Meme>
      </Container>
    </>
  );
};

export default Error;
