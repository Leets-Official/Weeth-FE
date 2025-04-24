import styled from 'styled-components';

import search from '@/assets/images/ic_search.svg';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={search} alt="search" />
    </ImgButton>
  );
};

export default SearchButton;
