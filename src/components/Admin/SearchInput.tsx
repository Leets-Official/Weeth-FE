import styled from 'styled-components';
import SearchIcon from '@/assets/images/ic_admin_search.svg';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 250px;
  margin-top: 2%;
  color: black;

  input {
    width: 100%;
    padding: 10px 40px;
    border: 1px solid #dedede;
    font-size: 18px;
    outline: none;
    color: #4e4e4e;
  }
`;

const SearchIconWrapper = styled.img`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
`;

const SearchInput: React.FC<{
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchTerm, onSearch }) => {
  return (
    <SearchWrapper>
      <SearchIconWrapper src={SearchIcon} alt="검색 아이콘" />
      <input
        type="text"
        placeholder="Search for name"
        value={searchTerm}
        onChange={onSearch}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
