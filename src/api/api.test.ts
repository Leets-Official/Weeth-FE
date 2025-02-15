// src/api/api.test.ts
import api from '@/api/api';
import MockAdapter from 'axios-mock-adapter';

// 테스트 환경에서는 jsdom을 사용하므로 localStorage와 window.location 사용이 가능합니다.

describe('API Interceptors', () => {
  let mock: MockAdapter;

  // 각 테스트 전에 axios-mock-adapter와 초기 토큰을 설정합니다.
  beforeEach(() => {
    // api 인스턴스에 대해 모의 어댑터 생성
    mock = new MockAdapter(api);
    // 테스트용 초기 토큰 설정
    localStorage.setItem('accessToken', 'testAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  // 각 테스트 후에는 mock을 복원하고 localStorage를 초기화합니다.
  afterEach(() => {
    mock.restore();
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('정상 요청 시, Authorization 헤더가 포함되어야 함', async () => {
    // 목표: request 인터셉터가 localStorage의 토큰 값을 읽어 헤더에 포함시키는지 확인

    let capturedHeaders: any;

    // GET /test 요청에 대해 모의 응답을 설정하고, 요청 시 전달된 헤더를 캡처합니다.
    mock.onGet('/test').reply((config) => {
      capturedHeaders = config.headers;
      return [200, { success: true }];
    });

    const response = await api.get('/test');
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    // 캡처된 헤더에 Authorization 및 Authorization_refresh 값이 올바르게 설정되어 있는지 확인
    expect(capturedHeaders.Authorization).toBe(`Bearer testAccessToken`);
    expect(capturedHeaders.Authorization_refresh).toBe(
      `Bearer testRefreshToken`,
    );
  });

  test('401 응답 시, 리프레시 토큰 갱신 후 원래 요청이 재시도되어야 함', async () => {
    // 목표: 첫 번째 요청에서 401 응답이 발생하면, 인터셉터가 getRefreshToken 함수를 호출하여 토큰을 갱신하고
    // 원래의 요청을 재시도하도록 하는 로직을 테스트합니다.

    // 만료된 토큰 상태로 설정
    localStorage.setItem('accessToken', 'expiredAccessToken');
    localStorage.setItem('refreshToken', 'expiredRefreshToken');

    const params = { dummy: 'data' };

    // 1차 요청: /api/v1/users/kakao/link 에서 401 에러 발생
    mock.onPatch('/api/v1/users/kakao/link').replyOnce(401);

    // getRefreshToken 호출 시: /api/v1/users/refresh 엔드포인트에서 새 토큰을 반환
    mock.onPost('/api/v1/users/refresh').replyOnce(200, {
      code: 200,
      data: {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      },
    });

    // 토큰 갱신 후 재시도된 원래 요청: 정상 응답 (200) 반환
    mock.onPatch('/api/v1/users/kakao/link').replyOnce(200, {
      data: {
        result: 'success',
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      },
    });

    const response = await api.patch('/api/v1/users/kakao/link', params);

    expect(response.status).toBe(200);
    expect(response.data.data.result).toBe('success');
    // 갱신된 토큰이 localStorage에 저장되었는지 확인
    expect(localStorage.getItem('accessToken')).toBe('newAccessToken');
    expect(localStorage.getItem('refreshToken')).toBe('newRefreshToken');
  });

  test('리프레시 토큰 갱신 실패 시, 토큰 삭제 및 로그인 페이지로 리다이렉트되어야 함', async () => {
    // 목표: 401 응답 후 토큰 갱신 요청이 실패하면 localStorage의 토큰이 삭제되고, window.location.href가 '/'로 설정되는지 테스트

    // 만료된 토큰 상태로 설정
    localStorage.setItem('accessToken', 'expiredAccessToken');
    localStorage.setItem('refreshToken', 'expiredRefreshToken');

    const params = { dummy: 'data' };

    // 1차 요청: 401 응답 발생
    mock.onPatch('/api/v1/users/kakao/link').replyOnce(401);

    // 리프레시 토큰 요청 실패: /api/v1/users/refresh 에서 400 에러 응답
    mock.onPost('/api/v1/users/refresh').replyOnce(400);

    // window.location.href를 테스트하기 위해 재정의
    const originalLocation = window.location;
    // jsdom에서는 window.location.href 변경이 어려울 수 있으므로, 직접 속성을 재정의합니다.
    delete (window as any).location;
    (window as any).location = { href: '' };

    // 401 → 리프레시 실패 시 에러가 발생하므로, reject 되는 것을 expect로 확인합니다.
    await expect(
      api.patch('/api/v1/users/kakao/link', params),
    ).rejects.toBeDefined();

    // 토큰이 삭제되었는지 확인
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    // window.location.href가 '/'로 설정되었는지 확인 (리다이렉트)
    expect(window.location.href).toBe('/');

    // 테스트 후 window.location 원복
    window.location = originalLocation;
  });
});
