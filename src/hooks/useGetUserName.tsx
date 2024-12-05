import useGetUserInfo from '@/api/useGetUserInfo';

const useGetUserName = () => {
  const { userInfo } = useGetUserInfo();

  let name: string;
  if (!userInfo) {
    name = 'loading';
  } else {
    name = userInfo.name;
  }

  return name;
};

export default useGetUserName;
