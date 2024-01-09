import styled from 'styled-components';
import searchIcon from '../assets/icon-search.png';
import { ChangeEvent } from 'react';
import Loader from './Loader';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 100vmax;
  padding: 10px 15px;
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
  width: 30px;
  height: 30px;
`;

type SearchboxProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
};

const Searchbox = ({ value, placeholder, onChange, loading }: SearchboxProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Container>
      <Icon src={searchIcon} />
      <Input value={value} placeholder={placeholder} onChange={handleChange} />
      {loading && <Loader size={20} />}
    </Container>
  );
};

export default Searchbox;
