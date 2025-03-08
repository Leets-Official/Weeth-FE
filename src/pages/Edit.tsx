import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DropdownMenu from '@/components/Button/DropdownMenu';
import InfoInput from '@/components/MyPage/InfoInput';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import useGetUserInfo from '@/api/useGetUserInfo';
import Header from '@/components/Header/Header';
import Line from '@/components/common/Line';
import usePatchUserInfo from '@/api/usePatchMyInfo';
import { toastInfo, toastSuccess } from '@/components/common/ToastMessage';
import SelectModal from '@/components/Modal/SelectModal';

const Container = styled.div`
  width: 370px;
  padding-bottom: 183px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div``;

const Text = styled.div`
  font-size: 20px;
  font-family: ${theme.font.semiBold};
  margin: 24px 0 10px 25px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.semiBold};
`;

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content>
      <Text>{children}</Text>
      <Line />
    </Content>
  );
};

const Edit = () => {
  useCustomBack('/mypage');

  const { userInfo } = useGetUserInfo();
  const [userData, setUserData] = useState<{ key: string; value: any }[]>([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const navi = useNavigate();

  const positionMap: Record<string, string> = {
    FE: '프론트엔드',
    BE: '백엔드',
    D: '디자인',
  };

  const position = userInfo?.position ? positionMap[userInfo.position] : '';

  useEffect(() => {
    if (userInfo) {
      setUserData([
        { key: 'name', value: userInfo.name },
        { key: 'studentId', value: userInfo.studentId },
        { key: 'department', value: userInfo.department },
        { key: 'tel', value: userInfo.tel },
        { key: 'cardinals', value: userInfo.cardinals },
        { key: 'position', value: userInfo.position },
        { key: 'email', value: userInfo.email },
      ]);
    }
  }, [userInfo]);

  const editValue = (key: string, value: string | number | number[]) => {
    const newuserData = userData.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setUserData(newuserData);
  };

  const { updateInfo } = usePatchUserInfo();

  const onSave = async () => {
    setIsSelectModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = userData.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      if (userData.some((item) => !item.value)) {
        toastInfo('모든 항목을 입력해 주세요.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of userData) {
        if (item.key === 'email' && !emailRegex.test(item.value)) {
          toastInfo('올바른 이메일 형식이 아닙니다.');
          return;
        }
      }

      const response = await updateInfo(data);

      if (response?.data?.code === 400) {
        // TODO: 에러 코드에 따른 세분화
        toastInfo(response?.data?.message);
        return;
      }

      if (response?.data?.code === 200) {
        toastSuccess('저장이 완료되었습니다.');
        navi('/mypage');
      } else {
        toastInfo('저장 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      // TODO: 에러 코드에 따른 세분화
      toastInfo(err);
    } finally {
      setIsSelectModalOpen(false);
    }
  };

  return (
    <Container>
      <Header onClickRightButton={onSave} RightButtonType="TEXT" isAccessible>
        MY 수정
      </Header>
      {userInfo ? (
        <InfoWrapper>
          <Title>개인정보</Title>
          <InfoInput
            text="이름"
            origValue={userInfo.name}
            editValue={(value) => editValue('name', value)}
          />
          <InfoInput
            text="핸드폰"
            origValue={userInfo.tel}
            editValue={(value) => editValue('tel', value)}
          />
          <InfoInput
            text="메일"
            origValue={userInfo.email}
            editValue={(value) => editValue('email', value)}
          />

          <Title>활동정보</Title>
          <DropdownMenu
            text="학과"
            origValue={userInfo.department}
            editValue={(value) => editValue('department', value)}
            type="mypage"
          />
          <InfoInput
            text="학번"
            origValue={userInfo.studentId}
            editValue={(value) => editValue('studentId', value)}
          />
          <InfoInput text="기수" origValue={userInfo.cardinals} />
          <InfoInput text="역할" origValue={position} />
        </InfoWrapper>
      ) : (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      )}

      {isSelectModalOpen && (
        <SelectModal
          type="positive"
          title="정보 수정"
          content="변경사항을 저장하시겠습니까?"
          onClose={() => setIsSelectModalOpen(false)}
          onDelete={handleSave}
          buttonContent="저장"
        />
      )}
    </Container>
  );
};

export default Edit;
