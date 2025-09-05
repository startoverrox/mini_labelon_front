import dayjs from "dayjs";

export const formatSqlDateTime = (dateString: string): string => {
  if (!dateString) {
    return "";
  }

  try {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm:ss");
  } catch (error) {
    console.error("날짜 포맷 변환 중 오류:", error);
    return dateString;
  }
};
