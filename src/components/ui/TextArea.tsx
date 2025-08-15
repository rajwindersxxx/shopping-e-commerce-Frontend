import React from "react";

interface TextareaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  rows?: number;
}

export function Textarea({
  label,
  name,
  placeholder,
  className = "",
  defaultValue,
  onChange,
  value,
  disabled,
  error,
  required = false,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className="relative mb-2 w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      />

      {error && <p className="absolute -bottom-[10px] text-xs text-red-500">{error}</p>}
    </div>
  );
}
