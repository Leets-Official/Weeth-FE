import FEIcon from '@/assets/images/ic_FE.svg';
import BEIcon from '@/assets/images/ic_BE.svg';
import DEIcon from '@/assets/images/ic_DE.svg';
import ADIcon from '@/assets/images/ic_MA.svg';

const positionIcons: Record<string, string> = {
  FE: FEIcon,
  BE: BEIcon,
  DE: DEIcon,
  AD: ADIcon,
};

const setPositionIcon = (role: string, position: string): string => {
  return role === 'ADMIN' ? ADIcon : positionIcons[position] || FEIcon;
};

export default setPositionIcon;
