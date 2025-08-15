import type { changePassword, Login, SignUp } from "../types/auth.type";
import { postRequest } from "../utils/axis";

export async function loginUser(data: Login) {
  return await postRequest({
    path: `auth/login`,
    data,
  });
}
export async function signUp(data: SignUp) {
  return await postRequest({
    path: `auth/SignUp`,
    data,
  });
}
export async function logoutUser() {
  return await postRequest({
    path: `auth/logout`,
    data: null,
  });
}
export async function changePassword(data: changePassword) {
  return await postRequest({
    path: `auth/changePassword`,
    data: data,
  });
}
export async function getAuthDetails() {
  const res = await fetch(`auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
}
