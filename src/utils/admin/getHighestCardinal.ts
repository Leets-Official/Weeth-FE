const getHighestCardinal = (cardinals: number[] | undefined | null): string => {
  if (!cardinals) return '기수 없음';

  let validCardinals: number[] = [];

  if (typeof cardinals === 'string') {
    validCardinals = (cardinals as string)
      .split('.')
      .map((c) => Number(c))
      .filter((c) => !Number.isNaN(c));
  } else if (Array.isArray(cardinals)) {
    validCardinals = cardinals.filter(
      (c) => typeof c === 'number' && !Number.isNaN(c),
    );
  }

  if (validCardinals.length === 0) return '기수 없음';

  return `${Math.max(...validCardinals)}기`;
};

export default getHighestCardinal;
