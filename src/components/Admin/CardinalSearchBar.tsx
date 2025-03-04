import React, { Dispatch, SetStateAction } from 'react';
import CardinalDropDown from '@/components/Admin/Cardinal';
import SearchBar, { SearchBarWrapper } from '@/components/Admin/SearchBar';

interface CombinedSearchBarProps {
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
}

const CombinedSearchBar: React.FC<CombinedSearchBarProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  return (
    <SearchBarWrapper>
      <div>
        <CardinalDropDown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </div>
      <SearchBar isWrapped={false} />
    </SearchBarWrapper>
  );
};

export default CombinedSearchBar;
