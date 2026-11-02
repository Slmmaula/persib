"use client";

import { Check, Link2 } from "lucide-react";
import { useRef, useState, type ComponentType } from "react";
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/social-icons";

function WhatsAppShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.45 0 .09 5.36.09 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.63a11.95 11.95 0 0 0 5.82 1.48h.01C18.63 23.85 24 18.49 24 11.9a11.85 11.85 0 0 0-3.48-8.42ZM12.04 21.82h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.98-3.6-.23-.37a9.85 9.85 0 0 1-1.51-5.28c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.94 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.09 2.91 1.24 3.11.15.2 2.14 3.27 5.18 4.59.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

interface ShareTarget {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  build: (url: string, text: string) => string;
}

const targets: readonly ShareTarget[] = [
  {
    label: "Facebook",
    Icon: FacebookIcon,
    build: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    label: "X",
    Icon: XIcon,
    build: (url, text) => `https://x.com/intent/post?url=${url}&text=${text}`,
  },
  {
    label: "WhatsApp",
    Icon: WhatsAppShareIcon,
    build: (url, text) => `https://wa.me/?text=${text}%20${url}`,
  },
  {
    label: "LinkedIn",
    Icon: LinkedinIcon,
    build: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
];

const buttonClass =
  "inline-flex size-11 items-center justify-center rounded-pill border border-glass-border transition-colors duration-(--duration-fast) hover:border-accent hover:bg-accent hover:text-on-accent";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  function share(target: ShareTarget) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(target.build(url, text), "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ul className="flex flex-wrap items-center gap-3">
        {targets.map((target) => (
          <li key={target.label}>
            <button
              type="button"
              aria-label={`Bagikan ke ${target.label}`}
              onClick={() => share(target)}
              className={buttonClass}
            >
              <target.Icon className="size-5" />
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label="Salin tautan"
            onClick={copyLink}
            className={buttonClass}
          >
            {copied ? (
              <Check aria-hidden className="size-5" />
            ) : (
              <Link2 aria-hidden className="size-5" />
            )}
          </button>
        </li>
      </ul>
      <p role="status" className="text-sm font-semibold text-accent">
        {copied ? "Tautan disalin" : ""}
      </p>
    </div>
  );
}
