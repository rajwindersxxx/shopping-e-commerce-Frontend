interface props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "danger" | "normal";
}

export function PrimaryButton({
  children,
  className = "min-w-33",
  onClick,
  disabled,
  type = "button",
  variant = "normal",
  ...props
}: props) {
  let buttonStyle;
  if (variant === "normal")
    buttonStyle =
      "rounded bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700";
  if (variant === "danger")
    buttonStyle = " hover:bg-red-500 bg-red1 font-semibold";
  return (
    <button
      className={`flex cursor-pointer justify-center gap-4 rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400 ${buttonStyle} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
