import { useState } from "react";
import { useNavigate } from "react-router";
// import logoImg from "@/assets/images/logo.png";
import PwVisIcon from "@/assets/icons/pw-vis.svg?react";
import { cn } from "@/utils/cn";
import { signin } from "@/services/authApi";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [pwVisible, setPwVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-60 flex-col items-center justify-center gap-2">
        {/* <img className="w-50 bg-gray-500" src={logoImg} alt="login" /> */}
        <span className="text-3xl font-bold tracking-tight text-sky-600">
          MiniLabelon
        </span>
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

        <button
          className="w-full rounded-md border bg-sky-500 p-1 text-white hover:bg-sky-600"
          type="submit"
        >
          로그인
        </button>

        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-xs whitespace-nowrap text-gray-500">
            아직 계정이 없으신가요?
          </span>
          <button
            className="text-sky-500 underline"
            type="button"
            onClick={() => navigate("/register")}
          >
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
