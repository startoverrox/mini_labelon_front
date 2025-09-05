import { useState } from "react";
import { useNavigate } from "react-router";
import PwVisIcon from "@/assets/icons/pw-vis.svg?react";
import { cn } from "@/utils/cn";
import useToastStore from "@/store/toastStore";
import { register } from "@/services/authApi";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToast } = useToastStore();

  const [pwVisible, setPwVisible] = useState(false);
  const [pwConfirmVisible, setPwConfirmVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const role = formData.get("role") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    // if (role === null) {
    //   setToast({
    //     message: "역할을 선택해주세요",
    //     type: "error",
    //   });
    //   return;
    // }

    // if (password !== passwordConfirm) {
    //   setToast({
    //     message: "비밀번호가 일치하지 않습니다!",
    //     type: "error",
    //   });
    //   return;
    // }

    await register(role, name, email, password, passwordConfirm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-60 flex-col items-center justify-center gap-2">
        <span className="text-3xl font-bold tracking-tight text-sky-600">
          MiniLabelon
        </span>
        <div className="auth-input-block">
          <label htmlFor="role">구분</label>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center justify-center gap-2">
              <input
                type="radio"
                id="annotator"
                name="role"
                value="annotator"
                required
              />
              <label htmlFor="annotator">작업자</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="radio"
                id="reviewer"
                name="role"
                value="reviewer"
                required
              />
              <label htmlFor="reviewer">검수자</label>
            </div>
          </div>
        </div>

        <div className="auth-input-block">
          <label htmlFor="name">이름</label>
          <input
            className="w-full"
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            required
          />
        </div>

        <div className="auth-input-block">
          <label htmlFor="email">아이디</label>
          <input
            className="w-full"
            type="email"
            id="email"
            name="email"
            placeholder="아이디"
            required
          />
        </div>

        <div className="auth-input-block">
          <label htmlFor="password">비밀번호</label>
          <div className="relative w-full">
            <input
              className="w-full pr-8"
              type={pwVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="비밀번호"
              required
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <PwVisIcon
                className={cn("h-5 w-5 transition-opacity", {
                  "fill-gray-800": pwVisible,
                  "fill-gray-500": !pwVisible,
                })}
                onClick={() => setPwVisible((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        <div className="auth-input-block">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <div className="relative w-full">
            <input
              className="w-full pr-8"
              type={pwConfirmVisible ? "text" : "password"}
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              required
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <PwVisIcon
                className={cn("h-5 w-5 transition-opacity", {
                  "fill-gray-800": pwConfirmVisible,
                  "fill-gray-500": !pwConfirmVisible,
                })}
                onClick={() => setPwConfirmVisible((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        <button
          className="w-full rounded-md border bg-sky-500 p-1 text-white hover:bg-sky-600"
          type="submit"
        >
          회원가입
        </button>

        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-xs whitespace-nowrap text-gray-500">
            이미 계정이 있으신가요?
          </span>
          <button
            className="text-sky-500 underline"
            type="button"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
