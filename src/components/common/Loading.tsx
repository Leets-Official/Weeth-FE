import Lottie from 'lottie-react';
import animationData from '@/components/common/WeethLoading.json';

const MyAnimation = () => {
  return (
    <Lottie animationData={animationData} loop style={{ width: '50px' }} />
  );
};

export default MyAnimation;
