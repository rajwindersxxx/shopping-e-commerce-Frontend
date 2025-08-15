import type { ReactNode } from "react";

interface props {
  children: ReactNode;
}
const ErrorMessage = ({ children }: props) => {
  return <h3 className="text-center text-xl text-red-600">{children}</h3>;
};

export default ErrorMessage;
