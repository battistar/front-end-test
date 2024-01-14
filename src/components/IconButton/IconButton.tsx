import styled from 'styled-components';

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  background-color: ${(props): string => props.theme.palette.button.selected};
  border-radius: 100vmax;
  cursor: pointer;

  &:hover {
    background-color: ${(props): string => props.theme.palette.button.hover};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const IconButton = ({ className, icon, onClick }: IconButtonProps): JSX.Element => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button className={className} onClick={handleClick}>
      <Icon src={icon} />
    </Button>
  );
};

export default IconButton;
