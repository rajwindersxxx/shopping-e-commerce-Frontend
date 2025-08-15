import React, { type ReactNode } from "react";

interface InputProps {
  label?: string;
  name?: string;
  type: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
  error?: string | null;
  required?: boolean;
  style?: string;
  children?: ReactNode;
}

export function Input({
  children,
  style,
  label,
  name,
  type,
  placeholder,
  className = "",
  defaultValue,
  onChange,
  value,
  disabled,
  error,
  required = false,
  ...props
}: InputProps) {
  if (style === "rounded")
    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={name}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-full border px-3 py-2 text-sm outline outline-gray-400 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100" : ""} ${className}`}
          defaultValue={defaultValue}
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...props}
        />
        {children}
        {error && <p className="absolute text-xs text-red-500">{error}</p>}
      </div>
    );
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      />
      {error && <p className="absolute text-xs text-red-500">{error}</p>}
    </div>
  );
}
