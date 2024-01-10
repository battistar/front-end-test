import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Message = ({ text }: { text: string }): JSX.Element => {
  return (
    <Container>
      <h2>{text}</h2>
    </Container>
  );
};

export default Message;
