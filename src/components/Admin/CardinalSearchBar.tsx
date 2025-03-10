import React, { Dispatch, SetStateAction } from 'react';
import CardinalDropDown from '@/components/Admin/Cardinal';
import SearchBar, { SearchBarWrapper } from '@/components/Admin/SearchBar';

interface CombinedSearchBarProps {
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  isPenaltyPage?: boolean;
  searchName: string;
  setSearchName: Dispatch<SetStateAction<string>>;
}

const CombinedSearchBar: React.FC<CombinedSearchBarProps> = ({
  selectedCardinal,
  setSelectedCardinal,
  isPenaltyPage,
  searchName,
  setSearchName,
}) => {
  return (
    <SearchBarWrapper isPenaltyPage={isPenaltyPage}>
      <div>
        <CardinalDropDown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </div>
      <SearchBar
        isWrapped={false}
        searchName={searchName}
        setSearchName={setSearchName}
      />
    </SearchBarWrapper>
  );
};

export default CombinedSearchBar;
