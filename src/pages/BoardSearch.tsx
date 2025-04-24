import Header from '@/components/Header/Header';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';
import search from '@/assets/images/ic_search.svg';
import { toastError } from '@/components/common/ToastMessage';

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 4px;
  padding: 7px 10px;
  margin-bottom: 10px;
  width: 345px;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  padding: 0;
  width: 211px;
  margin-left: 10px;

  &::placeholder {
    font-size: 16px;
    color: ${theme.color.gray[65]};
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
`;
const BoardSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getSearchMember(keyword);
      setSearchResults(response.data.data);
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div>
      <Header RightButtonType="none" isAccessible>
        게시판 검색
      </Header>
      <Search>
        <SearchInput
          placeholder="제목, 내용 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnter}
        />
        <SearchButton src={search} alt={search} onClick={handleSearch} />
      </Search>
      <SearchList searchResults={searchResults} loading={loading} />
    </div>
  );
};

export default BoardSearch;
