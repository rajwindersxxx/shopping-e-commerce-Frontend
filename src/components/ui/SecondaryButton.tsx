interface props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export function SecondaryButton({
  children,
  className = "min-w-33",
  onClick,
  type = "button",
  ...props
}: props) {
  return (
    <button
      className={`flex cursor-pointer justify-center gap-4 rounded-lg border py-2 text-blue-500 transition-colors disabled:bg-gray-200 ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
