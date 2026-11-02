export interface NavLink {
  label: string;
  href: string;
}

export const mainLinks: readonly NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Berita", href: "/news" },
  { label: "Tim", href: "/team" },
  { label: "Jadwal", href: "/fixtures" },
  { label: "Member", href: "/member" },
  { label: "Tentang", href: "/about" },
];

export const otherLinks: readonly NavLink[] = [
  { label: "Kontak Kami", href: "/contact" },
  { label: "Syarat dan Ketentuan", href: "/terms" },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export type SocialId =
  | "facebook"
  | "x"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "linkedin";

const YOUTUBE_URL = "https://www.youtube.com/channel/UCq9VjkTSRBvlyr0sSXwm8Kw";

export const socialLinks: readonly {
  id: SocialId;
  label: string;
  href: string;
}[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100044543224893",
  },
  { id: "x", label: "Twitter", href: "https://x.com/persib" },
  { id: "youtube", label: "YouTube", href: YOUTUBE_URL },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/persib/",
  },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/persib/",
  },
];

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Media",
    links: [
      { label: "News", href: "/news" },
      { label: "Video", href: YOUTUBE_URL, external: true },
    ],
  },
  {
    title: "Teams",
    links: [
      { label: "First Team", href: "/team" },
      { label: "EPA U-20", href: "/teams/epa-u20" },
      { label: "EPA U-18", href: "/teams/epa-u18" },
      { label: "EPA U-16", href: "/teams/epa-u16" },
      { label: "Youth Teams", href: "/teams/youth" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "History", href: "/about" },
      { label: "Stadium", href: "/about#stadium" },
      { label: "Management", href: "/team?tab=management" },
      { label: "Our Partners", href: "/#partners" },
    ],
  },
  {
    title: "Fan",
    links: [
      { label: "Passport Persib", href: "/member#passport-persib" },
      { label: "Membersib Plus", href: "/member#membersib-plus" },
      { label: "Membersib Jersey", href: "/member#membersib-jersey" },
      { label: "Membersib", href: "/member#membersib" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Terms & Conditions", href: "/terms?section=syarat-ketentuan" },
      { label: "Ticket Policy", href: "/terms?section=kebijakan-tiket" },
      { label: "Match Policy", href: "/terms?section=kebijakan-pertandingan" },
      { label: "Privacy Policy", href: "/terms?section=kebijakan-privasi" },
      { label: "Stadium Rules", href: "/terms?section=peraturan-stadion" },
    ],
  },
];
