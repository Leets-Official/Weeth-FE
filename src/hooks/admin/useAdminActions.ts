import deleteUserApi from '@/api/admin/member/deleteUser';
import {
  resetPwdApi,
  approveSignupApi,
  changeUserRoleApi,
} from '@/api/admin/member/patchUserManagement';

type UserRole = 'ADMIN' | 'USER';

type ActionType =
  | '가입 승인'
  | '관리자로 변경'
  | '사용자로 변경'
  | '비밀번호 초기화'
  | '유저 추방';

const getConfirmMessage = (action: ActionType, count: number) => {
  switch (action) {
    case '가입 승인':
      return `${count}명의 멤버 가입을 승인하시겠습니까?`;
    case '관리자로 변경':
      return `${count}명의 멤버를 관리자로 변경하시겠습니까?`;
    case '사용자로 변경':
      return `${count}명의 멤버를 사용자로 변경하시겠습니까?`;
    case '비밀번호 초기화':
      return `${count}명의 멤버 비밀번호를 초기화하시겠습니까?`;
    case '유저 추방':
      return `${count}명의 멤버를 추방하시겠습니까?`;
    default:
      return `${count}명의 멤버에 대해 ${action}을 진행하시겠습니까?`;
  }
};

const useAdminActions = () => {
  const handleAction = async (action: ActionType, targetIds: number[]) => {
    const count = targetIds.length;
    const confirmMessage = getConfirmMessage(action, count);

    if (!window.confirm(confirmMessage)) return;

    try {
      let response;

      switch (action) {
        case '비밀번호 초기화':
          response = await resetPwdApi(targetIds);
          console.log('비밀번호 초기화 API 응답:', response);
          alert('비밀번호 초기화가 완료되었습니다.');
          window.location.reload();
          break;

        case '가입 승인':
          response = await approveSignupApi(targetIds);
          console.log('가입 승인 API 응답:', response);
          alert('가입 승인 처리가 완료되었습니다.');
          window.location.reload();
          break;

        case '관리자로 변경':
        case '사용자로 변경': {
          const newRole: UserRole =
            action === '관리자로 변경' ? 'ADMIN' : 'USER';
          const roleChangeData = targetIds.map((id) => ({
            userId: id,
            role: newRole,
          }));
          response = await changeUserRoleApi(roleChangeData);
          alert(`멤버의 역할이 ${newRole}로 변경되었습니다.`);
          window.location.reload();
          break;
        }

        case '유저 추방':
          response = await deleteUserApi(targetIds);
          alert('유저 추방이 완료되었습니다.');
          window.location.reload();
          break;

        default:
          console.warn('잘못된 액션 타입:', action);
      }
    } catch (error: any) {
      console.error('오류 발생:', error.message);
      alert(`"${action}" 실행 중 오류가 발생했습니다.`);
    }
  };

  return { handleAction };
};

export default useAdminActions;
