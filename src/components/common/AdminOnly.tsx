import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';

const AdminOnly = () => {
  const { isAdmin } = useGetGlobaluserInfo();

  return !isAdmin && <div>운영진만 접근 가능</div>;
};

export default AdminOnly;
