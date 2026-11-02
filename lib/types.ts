export type CountryCode =
  | "ID"
  | "FR"
  | "BR"
  | "HR"
  | "AR"
  | "JP"
  | "BA"
  | "ME"
  | "MY"
  | "EG";

export type PlayerPosition =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward";

export type HonourIcon = "trophy" | "medal" | "award" | "shield";

export interface Honour {
  id: string;
  title: string;
  count: number;
  icon: HonourIcon;
}

export interface SeasonValue {
  season: string;
  value: number;
}

export interface PlayerStats {
  minutesPlayed: number | null;
  appearances: number | null;
  highlight: number | null;
  heightCm: number | null;
  weightKg: number | null;
  age: number;
}

export interface Player {
  slug: string;
  firstName: string;
  lastName: string;
  number: number;
  position: PlayerPosition;
  nationality: CountryCode;
  photo: string;
  stats: PlayerStats;
  rings: [number | null, number | null];
  honours: Honour[];
  seasonSeries: SeasonValue[];
}

export interface StaffMember {
  slug: string;
  firstName: string;
  lastName: string;
  role: string;
  tenure?: string;
  nationality: CountryCode;
  photo: string;
}

export interface Club {
  id: string;
  name: string;
  shortName: string;
  badge: string;
}

export type MatchStatus = "upcoming" | "result";

export interface Match {
  id: string;
  date: string;
  kickoff: string;
  competition: string;
  stadium: string;
  round?: string;
  homeId: string;
  awayId: string;
  status: MatchStatus;
  score?: { home: number; away: number };
  reportSlug?: string;
}

export type MatchEventType =
  | "goal"
  | "yellow-card"
  | "red-card"
  | "substitution";

export interface MatchEvent {
  id: string;
  minute: number;
  type: MatchEventType;
  text: string;
}

export interface LiveMatch {
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  competition: string;
  events: MatchEvent[];
}

export type FormResult = "W" | "D" | "L";

export interface StandingRow {
  clubId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  deduction?: number;
  form?: FormResult[];
}

export type NewsCategory = "match-report" | "club" | "academy" | "community";

export interface NewsArticle {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  image: string;
  featured: boolean;
  body: string[];
  sourceUrl: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  invert?: boolean;
}

export interface MembershipBenefit {
  id: string;
  label: string;
  hint?: string;
}

export interface BenefitValue {
  active: boolean;
  detail?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  image?: string;
  variant: "main" | "compact";
  benefits: Record<string, BenefitValue>;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AboutFact {
  id: string;
  label: string;
  value: string;
  todo?: boolean;
}

export interface HistoryMilestone {
  id: string;
  year: string;
  text: string;
  kind: "founding" | "title";
  todo?: boolean;
}

export interface AboutHonour {
  id: string;
  title: string;
  detail: string;
  count: number | null;
  icon: HonourIcon;
  todo?: boolean;
}

export type TermsBlock = string | { subheading: string };

export interface TermsClause {
  heading: string;
  body: TermsBlock[];
}

export interface TermsListItem {
  text: string;
  subItems?: string[];
}

export interface TermsSection {
  id: string;
  title: string;
  heading?: string;
  marker?: "number" | "letter";
  clauses?: TermsClause[];
  items?: TermsListItem[];
  note?: string;
  download?: { label: string; href: string };
}
