import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  id,
  className,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-label font-bold uppercase tracking-label text-muted"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 h-12 w-full rounded-md border bg-glass px-4 text-base text-white placeholder:text-muted",
          error ? "border-accent" : "border-field-border",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
