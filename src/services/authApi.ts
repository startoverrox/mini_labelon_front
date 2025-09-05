import { jwtDecode } from "jwt-decode";
import useUserStore from "@/store/userStore";
import api from "@/utils/api";
import type { ApiResponse } from "@/types/apiResponse";
import { handleApiResponse } from "@/utils/errorHandler";
import type { jwtPayload } from "@/types/jwtPayload";

export const signin = async (
  email: string,
  password: string,
): Promise<ApiResponse<{ access: string }>> => {
  const result = await handleApiResponse<{ access: string }>(
    api.post("/accounts/login/", {
      email,
      password,
    }),
  );

  // 로그인 성공 시 사용자 정보 저장
  if (result.success && result.data) {
    const { access } = result.data;
    const decoded = jwtDecode<jwtPayload>(access);
    const user = {
      role: decoded.role,
      name: decoded.name,
      email: decoded.email,
      token: access,
    };
    const store = useUserStore.getState();
    store.setUser(user);
  }

  return result;
};

export const register = async (
  role: string,
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<ApiResponse> => {
  return handleApiResponse(
    api.post("/accounts/register/", {
      role,
      name,
      email,
      password,
      passwordConfirm,
    }),
  );
};

export const signout = async (): Promise<ApiResponse> => {
  const result = await handleApiResponse(api.post("/accounts/logout/", {}));

  // 로그아웃 성공 시 사용자 정보 클리어
  if (result.success) {
    const store = useUserStore.getState();
    store.clearUser();
  }

  return result;
};

export const getNewAccessToken = async (): Promise<{
  access: string;
} | null> => {
  try {
    const response = await api.post("/accounts/token/refresh/", {});

    const { access } = response.data;
    const store = useUserStore.getState();
    const currentUser = store.user;
    if (currentUser && access) {
      store.setUser({ ...currentUser, token: access });
      console.error("get New Access Token success");
      return { access };
    }
    return null;
  } catch (error) {
    console.error("get New Access Token error:", error);
    return null;
  }
};
