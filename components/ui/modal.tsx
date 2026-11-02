"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { duration, ease } from "@/lib/motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

type ModalContentProps = Omit<ModalProps, "open">;

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribe = () => () => {};

function ModalContent({
  onClose,
  title,
  description,
  children,
}: ModalContentProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const dialog = dialogRef.current;
    const target =
      dialog?.querySelector<HTMLElement>("[data-autofocus]") ??
      dialog?.querySelector<HTMLElement>(focusable) ??
      dialog;
    target?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const items = Array.from(dialog.querySelectorAll<HTMLElement>(focusable));
    if (items.length === 0) {
      event.preventDefault();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.fast, ease }}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute inset-0 bg-canvas-edge/85"
        aria-hidden="true"
        onMouseDown={onClose}
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: duration.base, ease }}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto border border-glass-border bg-surface-deep p-6 sm:p-8"
      >
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-pill text-white transition-colors duration-(--duration-fast) hover:bg-glass-hover"
        >
          <X aria-hidden className="size-5" />
        </button>
        <h2 id={titleId} className="pr-10 font-semibold text-card-title">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted">
            {description}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function Modal({ open, ...content }: ModalProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open ? <ModalContent {...content} /> : null}
    </AnimatePresence>,
    document.body,
  );
}
