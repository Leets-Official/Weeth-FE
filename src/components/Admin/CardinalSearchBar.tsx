import React from 'react';
import CardinalDropdown from '@/components/Admin/Cardinal';
import SearchBar, { SearchBarWrapper } from './SearchBar';

interface CombinedSearchBarProps {
  selectedCardinal: string;
  setSelectedCardinal: (cardinal: string) => void;
}

const CombinedSearchBar: React.FC<CombinedSearchBarProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  return (
    <SearchBarWrapper>
      <CardinalDropdown
        selectedCardinal={selectedCardinal}
        setSelectedCardinal={setSelectedCardinal}
      />
      <SearchBar isWrapped={false} />
    </SearchBarWrapper>
  );
};

export default CombinedSearchBar;
