import { useState } from "react";
import { useNavigate } from "react-router";
import JoinIcon from "@/assets/icons/join.svg?react";
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
    <div className="w-full max-w-[340px]">
      <div className="mb-[55px] flex flex-col items-center">
        <JoinIcon className="w-full" />
        <span className="text-[16px] text-[#666666] ">
          등록 후 로그인 기능을 이용할 수 있습니다.
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="auth-input-block">
          <label htmlFor="role">User Role</label>
          <div className="flex gap-[20px]">
            <label htmlFor="annotator" className="auth-radio-block">
              <input
                type="radio"
                id="annotator"
                name="role"
                value="annotator"
                required
              />
              <span>Annotator</span>
            </label>
            <label htmlFor="reviewer" className="auth-radio-block">
              <input
                type="radio"
                id="reviewer"
                name="role"
                value="reviewer"
                required
              />
              <span>Reviewer</span>
            </label>
          </div>
        </div>

        <div className="auth-input-block">
          <label htmlFor="name">Username</label>
          <input
            className="w-full"
            type="text"
            id="name"
            name="name"
            placeholder="gildonghong"
            required
          />
        </div>

        <div className="auth-input-block">
          <label htmlFor="email">E-mail</label>
          <input
            className="w-full"
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

        <div className="auth-input-block">
          <label htmlFor="passwordConfirm">Password Check</label>
          <input
            type={pwVisible ? "text" : "password"}
            id="passwordConfirm"
            name="passwordConfirm"
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
          REGISTER
        </button>

        <div className="flex w-full items-center justify-between gap-2 px-[20px] text-[14px]">
          <span className="whitespace-nowrap text-[#666666]">
            이미 계정이 있나요?
          </span>
          <button
            className="font-[600] text-[#222222] hover:underline"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
