"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Modal } from "@/components/ui/modal";
import { TextField } from "@/components/ui/text-field";

type Field = "email" | "password";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Format email tidak valid.";
  }
  if (values.password.length < 8) {
    errors.password = "Kata sandi minimal 8 karakter.";
  }
  return errors;
}

function LoginForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Values>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: Field) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const element = event.currentTarget.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <p className="text-sm leading-6 text-muted">
          Ini hanya tampilan contoh. Tidak ada sesi yang dibuat dan tidak ada
          data yang dikirim.
        </p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="inline-flex h-12 w-full items-center justify-center rounded-pill bg-accent text-label font-bold uppercase tracking-label text-on-accent"
        >
          Tutup
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <TextField
        data-autofocus
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange("email")}
        error={errors.email}
      />
      <TextField
        name="password"
        type="password"
        label="Kata sandi"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange("password")}
        error={errors.password}
      />
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-pill bg-accent text-label font-bold uppercase tracking-label text-on-accent"
      >
        Masuk
      </button>
    </form>
  );
}

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Login"
      description="Khusus admin. Tampilan contoh, belum terhubung ke akun nyata."
    >
      <LoginForm onClose={onClose} />
    </Modal>
  );
}
