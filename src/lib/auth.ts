export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
};

export const saveLoginData = (data: LoginResponse) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const getLoginData = (): LoginResponse | null => {
  try {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
