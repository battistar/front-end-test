import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: 2rem;
`;

const Favorites = (): JSX.Element => {
  return (
    <Container>
      <Title>Favorites</Title>
    </Container>
  );
};

export default Favorites;
