import React, { Dispatch, SetStateAction, useState } from 'react';
import CardinalDropDown from './Cardinal';
import SearchBar, { SearchBarWrapper } from './SearchBar';

interface CombinedSearchBarProps {
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
}

const CombinedSearchBar: React.FC<CombinedSearchBarProps> = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);

  return (
    <SearchBarWrapper>
      <div>
        <CardinalDropDown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={(value) => {
            setSelectedCardinal(value);
          }}
        />
      </div>
      <SearchBar isWrapped={false} />
    </SearchBarWrapper>
  );
};

export default CombinedSearchBar;
