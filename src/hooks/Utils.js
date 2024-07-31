const Utils = async (response, originalApiFunc, originalParams, navigate) => {
  // 데이터가 비어있는지 확인(데이터가 null/undefined, 객체, 배열일 때를 확인)
  const isResponseBodyEmpty = (data) => {
    if (data === null || data === undefined) return true;
    if (typeof data === 'object') return Object.keys(data).length === 0;
    if (Array.isArray(data)) return data.length === 0;
    return false;
  };

  if (response.status === 200) {
    if (!isResponseBodyEmpty(response.data)) {
      const newToken = response.headers['authorization'];
      const newRefreshToken = response.headers['authorization-refresh'];
      alert('login token', newToken, newRefreshToken);
      return response;
    } else {
      // Body가 비어있으면 token, refresh tokens을 local storage에 저장하기
      const newToken = response.headers['authorization'];
      const newRefreshToken = response.headers['authorization-refresh'];
      console.log('login token', newToken, newRefreshToken);
      // 새 토큰, refreshToken 둘 다 있는지
      if (newToken && newRefreshToken) {
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // 새로운 토큰으로 원래의 API 호출을 다시 시도
        const retryResponse = await originalApiFunc(...originalParams);
        return retryResponse;
      } else {
        throw new Error('새 토큰이 없습니다');
      }
    }
  } else {
    // local Storage 비우고 로그인 화면으로 리다이렉트
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    throw new Error('Forbidden : 로그인 화면으로 리디렉션합니다.');
  }
};

export default Utils;
