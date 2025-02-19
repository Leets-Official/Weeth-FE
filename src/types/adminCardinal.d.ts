export interface CardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface DirectCardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: (value: number, isCustom: boolean) => void;
}
