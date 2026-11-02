"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/modal";
import { StoreButtons } from "@/components/ui/store-buttons";

interface SubscribeButtonProps {
  planName?: string;
  className?: string;
  children: ReactNode;
}

export function SubscribeButton({
  planName,
  className,
  children,
}: SubscribeButtonProps) {
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
        title={planName ? `Berlangganan ${planName}` : "Berlangganan"}
        description="Pendaftaran member dilakukan melalui aplikasi PERSIB. Unduh aplikasinya untuk melanjutkan."
      >
        <StoreButtons className="flex-col items-start gap-3" />
      </Modal>
    </>
  );
}
