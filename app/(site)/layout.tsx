import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-on-accent"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
