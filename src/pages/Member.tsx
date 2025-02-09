import CardinalDropdown from '@/components/common/CardinalDropdown';
import Header from '@/components/Header/Header';
import MemberList from '@/components/Member/MemberList';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import search from '@/assets/images/ic_search.svg';

const Wrapper = styled.div`
  width: 370px;
  font-family: ${theme.font.regular};
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
    font-family: ${theme.font.regular};
    font-size: 16px;
    color: ${theme.color.gray[65]};
  }
`;

const SearchButton = styled.img``;

const Member = () => {
  useCustomBack('/home');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number>(
    Number(cardinal) || 0,
  );

  return (
    <Wrapper>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      <Search>
        <CardinalDropdown
          origValue={selectedCardinal}
          editValue={setSelectedCardinal}
        />
        <SearchInput placeholder="멤버 이름을 검색하세요" />
        <SearchButton
          src={search}
          alt={search}
          onClick={() => {
            // TODO: 검색 API 요청
          }}
        />
      </Search>
      <MemberList />
    </Wrapper>
  );
};

export default Member;
