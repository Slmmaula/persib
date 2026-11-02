"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/modal";

interface VideoModalButtonProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export function VideoModalButton({
  title,
  className,
  children,
}: VideoModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description="Pemutar video belum tersambung. TODO: pasang video resmi."
      >
        <div className="flex aspect-video w-full items-center justify-center border border-glass-border bg-glass text-sm text-muted">
          Video belum tersedia
        </div>
        <button
          data-autofocus
          type="button"
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-pill bg-accent text-label font-bold uppercase tracking-label text-on-accent"
        >
          Tutup
        </button>
      </Modal>
    </>
  );
}
