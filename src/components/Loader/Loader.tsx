import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to { 
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div<{ $size?: number }>`
  width: ${(props): string => `${props.$size}px`};
  height: ${(props): string => `${props.$size}px`};
  border: solid 3px ${(props): string => props.theme.palette.text};
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  animation: ${rotate} 1s infinite linear;
`;

type LoaderProps = {
  size?: number;
  className?: string;
};

const Loader = ({ size = 40, className }: LoaderProps): JSX.Element => {
  return <StyledLoader data-testid="loader" className={className} $size={size} />;
};

export default Loader;
