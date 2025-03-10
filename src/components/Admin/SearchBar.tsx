import styled from 'styled-components';
import theme from '@/styles/theme';
import icSearch from '@/assets/images/ic_admin_search.svg';
import { useMemberContext } from '@/components/Admin/context/MemberContext';

export const SearchBarWrapper = styled.div<{
  isWrapped?: boolean;
  isPenaltyPage?: boolean;
}>`
  position: relative;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: ${({ isPenaltyPage }) => (isPenaltyPage ? '63%' : '100%')};
  min-width: ${({ isPenaltyPage }) => (isPenaltyPage ? '890px' : '1400px')};
  padding: 15px 20px;
  border-radius: 4px;
  margin: 30px 0 10px;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  gap: 15px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  font-size: 18px;
  font-family: ${theme.font.regular};
  box-sizing: border-box;
  padding: 12px 12px 12px 40px;
  border: 1px solid #dedede;
  border-radius: 4px;
  &::placeholder {
    color: ${theme.color.gray[20]};
  }
  &:focus {
    outline: 1.5px solid ${theme.color.gray[18]};
  }
`;

export const SearchBarIcon = styled.img<{ isWrapped?: boolean }>`
  position: absolute;
  left: ${({ isWrapped }) => (isWrapped ? '32px' : '165px')};
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;

interface SearchBarProps {
  isWrapped?: boolean; // Wrapper css 사용 여부
  isPenaltyPage?: boolean; // 페널티 페이지 검색바 너비 조정
  searchName: string;
  setSearchName: (name: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isWrapped = true,
  searchName,
  setSearchName,
}) => {
  const { members, setFilteredMembers, selectedCardinal } = useMemberContext();

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchName(value);

    let filtered = selectedCardinal
      ? members.filter((member) => member.cardinals.includes(selectedCardinal))
      : members;

    if (value !== '') {
      filtered = filtered.filter((member) =>
        member.name.toLowerCase().includes(value),
      );
    }

    setFilteredMembers(filtered);
  };

  const content = (
    <>
      <SearchBarIcon src={icSearch} alt="search" isWrapped={isWrapped} />
      <StyledInput
        placeholder="Search for name"
        value={searchName}
        onChange={handleSearchName}
      />
    </>
  );

  return isWrapped ? <SearchBarWrapper>{content}</SearchBarWrapper> : content;
};

export default SearchBar;
