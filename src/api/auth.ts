import type { changePassword, Login, SignUp, UserData } from "../types/auth.type";
import { getRequest, postRequest } from "../utils/axis";

export async function loginUser(data: Login) {
  return await postRequest<{ email: string; role: "ADMIN" | "USER" }>({
    path: `/auth/login`,
    data,
  });
}
export async function signUp(data: SignUp) {
  return await postRequest({
    path: `/auth/SignUp`,
    data,
  });
}
export async function logoutUser() {
  return await postRequest({
    path: `/auth/logout`,
    data: null,
  });
}
export async function changePassword(data: changePassword) {
  return await postRequest({
    path: `/auth/changePassword`,
    data: data,
  });
}
export async function getAuthDetails() {
  return await getRequest<UserData>({ path: `/auth/me` });
}
