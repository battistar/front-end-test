import styled from 'styled-components';
import searchIcon from '../../assets/icon-search.png';
import { ChangeEvent, useRef } from 'react';
import Loader from '../Loader/Loader';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${(props): string => props.theme.palette.action.selected};
  border-radius: 100vmax;
  padding: 10px 15px;

  &:hover {
    border-color: ${(props): string => props.theme.palette.action.hover};
    cursor: text;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 1.1rem;
  margin: 0 10px;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

type SearchboxProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  className?: string;
};

const Searchbox = ({ className, value, placeholder, onChange, loading }: SearchboxProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Container className={className} onClick={handleClick}>
      <Icon src={searchIcon} />
      <Input ref={inputRef} value={value} placeholder={placeholder} onChange={handleChange} />
      {loading && <Loader size={20} />}
    </Container>
  );
};

export default Searchbox;
