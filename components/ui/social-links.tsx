import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { socialLinks, type SocialId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const icons: Record<SocialId, typeof XIcon> = {
  facebook: FacebookIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  linkedin: LinkedinIcon,
};

interface SocialLinksProps {
  variant?: "circle" | "plain";
  className?: string;
}

export function SocialLinks({
  variant = "circle",
  className,
}: SocialLinksProps) {
  const plain = variant === "plain";

  return (
    <ul
      className={cn(
        "flex",
        plain ? "flex-wrap justify-center gap-x-2 gap-y-2 sm:gap-x-6" : "gap-3",
        className,
      )}
    >
      {socialLinks.map((link) => {
        const Icon = icons[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} PERSIB Bandung`}
              className={cn(
                "inline-flex items-center justify-center transition-colors duration-(--duration-fast)",
                plain
                  ? "size-12 hover:text-accent"
                  : "size-11 rounded-pill border border-glass-border hover:border-accent hover:bg-accent hover:text-on-accent",
              )}
            >
              <Icon className={plain ? "size-7" : "size-5"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
