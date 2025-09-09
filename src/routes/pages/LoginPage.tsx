import { useState } from "react";
import { useNavigate } from "react-router";
import JoinIcon from "@/assets/icons/join.svg?react";
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

    const result = await signin(email, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-[340px]">
      <div className="mb-[55px] flex flex-col items-center">
        <JoinIcon className="w-full" />
        <span className="text-[16px] text-[#666666] ">로그인하세요.</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="auth-input-block">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="auth-input-block">
          <label htmlFor="password">Password</label>
          <input
            type={pwVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button type="button" onClick={() => setPwVisible((prev) => !prev)}>
            <PwVisIcon
              className={cn({
                "opacity-[1]": pwVisible,
                "opacity-[0.6]": !pwVisible,
              })}
            />
          </button>
        </div>

        <button className="auth-btn" type="submit">
          LOGIN
        </button>

        <div className="flex w-full items-center justify-between gap-2 px-[20px] text-[14px]">
          <span className="whitespace-nowrap text-[#666666]">
            아직 계정이 없나요?
          </span>
          <button
            className="font-[600] text-[#222222] hover:underline"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
