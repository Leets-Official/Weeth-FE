import CardinalDropdown from '@/components/common/CardinalDropdown';
import Header from '@/components/Header/Header';
import MemberList from '@/components/Member/MemberList';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import search from '@/assets/images/ic_search.svg';
import getSearchMember from '@/api/getSearchMember';
import { User } from '@/types/user';
import { toastError } from '@/components/common/ToastMessage';

const Wrapper = styled.div`
  width: 370px;
  margin-bottom: 50px;
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 4px;
  padding: 7px 10px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 230px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #fff;

  &::placeholder {
    font-size: 16px;
    color: ${theme.color.gray[65]};
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const Member = () => {
  useCustomBack('/home');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getSearchMember(keyword);
      setSearchResults(response.data.data);
      navigate(`/member?search=${keyword}`);
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigate(`/member?cardinal=${selectedCardinal}`);
  }, [selectedCardinal]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Wrapper>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      <Search>
        <CardinalDropdown
          origValue={selectedCardinal}
          editValue={setSelectedCardinal}
          isMember
        />
        <SearchInput
          placeholder="멤버 이름을 검색하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnter}
        />
        <SearchButton src={search} alt={search} onClick={handleSearch} />
      </Search>
      <MemberList searchResults={searchResults} loading={loading} />
    </Wrapper>
  );
};

export default Member;
