export type Candidate = {
  id: string;
  name: string;
  gender: "Woman" | "Man";
  avatarInitials: string;
  avatarColor: string;
  care: {
    residential: boolean;
    home: boolean;
    liveIn: boolean;
  };
  driver: boolean;
  owner: boolean;
  fullTime: boolean;
  hasVideo?: boolean;
  hasAudio?: boolean;
  favourited?: boolean;
  status: CandidateStatus;
};

export type CandidateStatus =
  | "review"
  | "favourites"
  | "team-favourites"
  | "interviewing"
  | "offer-made"
  | "hired"
  | "rejected"
  | "withdrawn"
  | "unavailable";

const AVATAR_COLORS = [
  "#FFA4E0",
  "#7FF5FF",
  "#C4B5FD",
  "#FDE68A",
  "#FCA5A5",
  "#A7F3D0",
  "#BFDBFE",
  "#FDBA74",
];

const names: Array<{
  name: string;
  gender: "Woman" | "Man";
  liveIn?: boolean;
  driver?: boolean;
  hasAudio?: boolean;
  favourited?: boolean;
}> = [
  { name: "Sonia", gender: "Woman", hasAudio: true },
  { name: "Lillian", gender: "Woman" },
  { name: "Leslie", gender: "Man", driver: false },
  { name: "Franca", gender: "Woman", liveIn: true, favourited: true },
  { name: "Melody", gender: "Woman" },
  { name: "Nancy", gender: "Woman" },
  { name: "Tapiwa Eugene", gender: "Man", liveIn: true },
  { name: "Princes", gender: "Woman", liveIn: true },
  { name: "Wadzanai", gender: "Woman" },
  { name: "Abiodun", gender: "Woman", liveIn: true },
  { name: "Audry", gender: "Woman", liveIn: true },
  { name: "Gracious", gender: "Woman" },
  { name: "Rudo Rose", gender: "Woman" },
  { name: "Dorothy", gender: "Woman", driver: false },
  { name: "Eric", gender: "Man", liveIn: true },
  { name: "Md Forhad Khan", gender: "Man", liveIn: true },
];

export const CANDIDATES: Candidate[] = names.map((n, i) => ({
  id: String(i + 1),
  name: n.name,
  gender: n.gender,
  avatarInitials: n.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
  care: {
    residential: true,
    home: true,
    liveIn: n.liveIn ?? false,
  },
  driver: n.driver ?? true,
  owner: true,
  fullTime: true,
  hasVideo: true,
  hasAudio: n.hasAudio ?? false,
  favourited: n.favourited ?? false,
  status: "review",
}));

export const TOTAL_MATCHES = 1684;
