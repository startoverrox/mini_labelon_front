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
    const { message, data } = response.data as ApiResponse<T>;
    // success 처리
    if (message) {
      setToast({
        message: message,
        type: "success",
      });
    }
    return {
      success: true,
      data: data,
    };
  } catch (error: unknown) {
    // axios error 처리
    console.error("API call error:", error);

    // axios error 객체에서 Django 응답 데이터 확인
    if (
      error &&
      typeof error === "object" &&
      "success" in error &&
      error.success === false
    ) {
      // Django에서 보낸 구조화된 오류 응답 처리
      const { message, errors } = error as ApiResponse<T>;

      const errorMessage = formatErrorsToMessage(errors);
      const displayMessage = errorMessage || message;

      if (displayMessage) {
        setToast({
          message: displayMessage,
          type: "error",
        });
      }

      return {
        success: false,
      };
    }

    // 실제 네트워크 오류나 기타 오류 처리
    setToast({
      message: "네트워크 오류가 발생했습니다.",
      type: "error",
    });

    return {
      success: false,
    };
  }
};
