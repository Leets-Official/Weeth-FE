import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*
사용방법!!
각 페이지의 임포트 후 컴포넌트 최상단에서 사용
매개변수로 뒤로가기 시 이동할 페이지의 경로를 적어주면 됨!!

아래는 예시..

cosnt Example = () => {
  useCustomBack('/');
  return ();
}
*/

const useCustomBack = (redirectPath) => {
  const navigate = useNavigate();

  console.log(redirectPath);

  const browserPreventEvent = () => {
    const currentUrl =
      window.location.pathname + window.location.search + window.location.hash;
    window.history.pushState(null, '', currentUrl);
    navigate(redirectPath);
  };

  useEffect(() => {
    const handlePopstate = () => {
      browserPreventEvent();
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate, redirectPath]);
};

export default useCustomBack;
