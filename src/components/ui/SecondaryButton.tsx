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
      className={`mt-4 flex cursor-pointer justify-center gap-4 rounded-lg border bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:bg-gray-200 ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
