import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';

const useGetUserName = () => {
  const { globalInfo } = useGetGlobaluserInfo();

  let name: string;
  if (!globalInfo) {
    name = 'loading';
  } else {
    name = globalInfo.name;
  }

  return name;
};

export default useGetUserName;
