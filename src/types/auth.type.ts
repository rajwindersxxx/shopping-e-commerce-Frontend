export interface Login {
  email: string;
  password: string;
}
export interface SignUp extends Login {
  confirmPassword: string;
}
export interface changePassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
