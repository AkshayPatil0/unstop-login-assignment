import illustration from "@/assets/illustration.svg";
import { useNavigate } from "react-router-dom";
import LoginForm from "./login-form";
import OauthLogin from "./o-auth-login";
import OrSeparator from "@/components/or-separator";
import { LoginResponse, saveLoginData } from "@/lib/auth";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const onLogin = (loginData: LoginResponse) => {
    saveLoginData(loginData);
    navigate("/home");
  };

  useEffect(() => {
    const loginData = localStorage.getItem("auth");
    if (loginData) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 p-4 md:p-12 xl:p-16 items-center place-items-center gap-12">
      <div className="size-64 md:size-96 lg:w-full lg:h-fit lg:pr-12 xl:pr-36">
        <img src={illustration} />
      </div>
      <div className="h-full w-full p-8 border border-1 bg-white rounded-lg">
        <h1 className="text-3xl">
          Welcome to{" "}
          <span className="block text-primary text-5xl font-extrabold pt-4">
            Unstop
          </span>
        </h1>
        <OauthLogin />
        <OrSeparator />
        <LoginForm onSuccess={onLogin} />
      </div>
    </div>
  );
}
