import profileImg from "@/assets/profile.jpeg";
import { getLoginData } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const loginData = getLoginData();

  const onLogout = () => {
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  if (!loginData) return null;

  return (
    <div className="w-full h-screen flex flex-col gap-24 items-center justify-center">
      <h1 className="text-4xl text-center">
        Welcome to
        <span className="block mt-4 text-5xl font-extrabold text-primary">
          Unstop
        </span>
      </h1>
      <div className="w-72 flex flex-col gap-8 justify-center items-center py-8 px-8 border border-1 bg-white rounded-2xl">
        <img
          src={profileImg}
          className="w-1/2 aspect-square object-cover rounded-full"
        />
        <div className="text-center">
          <p className="font-bold text-center text-primary mb-2">
            {loginData.firstName} {loginData.lastName}
          </p>
          <p className="text-center text-sm text-muted-foreground">
            {loginData.email}
          </p>
          <p className="text-center text-sm text-muted-foreground">
            {loginData.gender}
          </p>
        </div>
        <button
          className="w-full bg-primary text-white rounded-lg p-3"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
