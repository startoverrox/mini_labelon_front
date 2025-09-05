import useToastStore from "@/store/toastStore";
import type { ApiResponse } from "@/types/apiResponse";

/**
 * errors 객체를 문자열 메시지로 변환하는 함수
 */
const formatErrorsToMessage = (
  errors?: Record<string, string[]>,
): string | undefined => {
  if (!errors || Object.keys(errors).length === 0) {
    return undefined;
  }

  // errors 객체의 첫 번째 필드의 의 오류 메시지가 있는 경우 반환
  const firstField = Object.keys(errors)[0];
  const firstFieldErrors = errors[firstField];

  return firstFieldErrors && firstFieldErrors.length > 0
    ? firstFieldErrors[0]
    : undefined;
};

/**
 * API 응답 message를 toast로 처리하는 함수
 */
export const handleApiResponse = async <T = unknown>(
  apiCall: Promise<ApiResponse<T>>,
): Promise<ApiResponse<T>> => {
  const { setToast } = useToastStore.getState();

  try {
    const response = await apiCall;

    if (response.success) {
      // success 처리
      if (response.message && response.message.length > 0) {
        setToast({
          message: response.message,
          type: "success",
        });
      }
      return {
        success: true,
        data: response.data,
      };
    } else {
      // django error 처리
      const errorMessage = formatErrorsToMessage(response.errors);
      if (
        (response.message && response.message.length > 0) ||
        (errorMessage && errorMessage.length > 0)
      ) {
        setToast({
          message: errorMessage || response.message,
          type: "error",
        });
      }
      return {
        success: false,
      };
    }
  } catch (error: unknown) {
    // axios error 처리
    console.error("API call error:", error);

    setToast({
      message: "네트워크 오류가 발생했습니다.",
      type: "error",
    });

    return {
      success: false,
    };
  }
};
