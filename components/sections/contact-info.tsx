import { Mail, MapPin, Phone, Share2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/ui/social-links";
import { contact } from "@/data/contact";

interface InfoCellProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

function InfoCell({ icon: Icon, label, children }: InfoCellProps) {
  return (
    <div className="flex gap-4 rounded-sm border border-glass-border bg-surface-panel p-6">
      <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-glass-hover">
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0">
        <h2 className="text-label font-bold uppercase tracking-label text-muted">
          {label}
        </h2>
        <div className="mt-2 text-base leading-7">{children}</div>
      </div>
    </div>
  );
}

const linkClass =
  "transition-colors duration-(--duration-fast) hover:text-accent";

export function ContactInfo() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      <InfoCell icon={MapPin} label="Alamat">
        <address className="not-italic">
          {contact.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </InfoCell>

      <InfoCell icon={Phone} label="Telepon">
        <a href={contact.phone.href} className={linkClass}>
          {contact.phone.label}
        </a>
      </InfoCell>

      <InfoCell icon={Mail} label="Email">
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      </InfoCell>

      <InfoCell icon={Share2} label="Media Sosial">
        <SocialLinks className="mt-1 flex-wrap" />
      </InfoCell>
    </div>
  );
}
