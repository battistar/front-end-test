import styled from 'styled-components';

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  background-color: ${(props): string => props.theme.palette.action.selected};
  border-radius: 100vmax;
  cursor: pointer;

  &:hover {
    background-color: ${(props): string => props.theme.palette.action.hover};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const IconButton = ({ icon, onClick }: IconButtonProps): JSX.Element => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button onClick={handleClick}>
      <Icon src={icon} />
    </Button>
  );
};

export default IconButton;
