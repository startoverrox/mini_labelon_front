import axios, { type AxiosResponse } from "axios";
import type { ApiWrapper } from "@/types/apiWrapper";
import useToastStore from "@/store/toastStore";
import useUserStore from "@/store/userStore";
import { getNewAccessToken } from "@/services/authApi";

// 인증이 불필요한 엔드포인트 목록
const NO_AUTH_ENDPOINTS = [
  "/accounts/register/",
  "/accounts/login/",
  "/accounts/logout/",
  "/accounts/token/refresh/",
];

// 사용자 정의 axios 인스턴스
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 일
    const token = useUserStore.getState().user?.token;

    // 인증이 불필요한 엔드포인트인지 확인
    const isNoAuthEndpoint = NO_AUTH_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    // 토큰이 있고, 인증이 필요한 엔드포인트인 경우에만 Authorization 헤더 추가
    if (token && !isNoAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 오류 요청을 보내기 전 수행할 일
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response: AxiosResponse<ApiWrapper>): AxiosResponse<ApiWrapper> => {
    // Django body를 ApiWrapper 기준으로 재구성하여 response.data에 저장
    const { success, message, data, errors } = response.data;

    // 원래 response 객체를 유지하면서 data만 재구성
    response.data = {
      success,
      message,
      data,
      errors: errors,
      status: response.status,
    };

    return response;
  },
  async (error) => {
    // 오류 응답을 처리
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        // 토큰 갱신에 실패한 경우 사용자 정보 클리어 (logout 처리)
        console.warn("Token refresh failed, clearing user data");

        const { setToast } = useToastStore.getState();
        setToast({
          message: "세션이 만료 되었습니다. 다시 로그인 해주세요",
          type: "error",
        });

        const store = useUserStore.getState();
        store.clearUser();
      }
    }

    // Django wrapper 구조를 기준으로 실패 메시지 변환
    const responseData = error.response?.data;
    const formattedError = {
      success: false,
      status: error.response?.status,
      message:
        responseData?.message ||
        (responseData?.errors && typeof responseData.errors === "object"
          ? Object.values(
              responseData.errors as Record<string, string[]>,
            )[0]?.[0]
          : "알 수 없는 오류가 발생했습니다."),
      data: responseData?.data || null,
      errors: responseData?.errors || null,
    };

    return Promise.reject(formattedError);
  },
);

export default api;
