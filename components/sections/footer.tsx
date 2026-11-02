import Link from "next/link";
import { FooterWordmark } from "@/components/sections/footer-wordmark";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { StoreButtons } from "@/components/ui/store-buttons";
import { footerColumns, type FooterLink } from "@/lib/navigation";

const linkClass =
  "inline-flex min-h-10 items-center text-sm font-semibold text-muted transition-colors duration-(--duration-fast) hover:text-white xl:min-h-8";

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-deep">
      <div className="container-page pb-16 pt-14 md:pb-20 md:pt-20 xl:pb-28">
        <section
          aria-labelledby="footer-social"
          className="flex flex-col items-center text-center"
        >
          <h2
            id="footer-social"
            className="font-heading text-card-title font-semibold"
          >
            Follow PERSIB on social media
          </h2>
          <SocialLinks variant="plain" className="mt-5" />
        </section>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:mt-20 xl:grid-cols-[auto_repeat(5,minmax(0,1fr))_auto] xl:gap-x-10">
          <Link
            href="/"
            aria-label="PERSIB Bandung, ke beranda"
            className="col-span-2 justify-self-start md:col-span-3 xl:col-span-1"
          >
            <Logo className="h-24 w-auto xl:h-32" />
          </Link>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-heading text-base font-semibold">
                {column.title}
              </h3>
              <ul className="mt-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-3 xl:col-span-1">
            <h3 className="font-heading text-base font-semibold">
              Download PERSIB app
            </h3>
            <StoreButtons className="mt-4 flex-col items-start gap-3" />
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
