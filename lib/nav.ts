import type { SVGProps } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ComplianceIcon,
  GearIcon,
  GlobeIcon,
  BellIcon,
  MegaphoneIcon,
} from "@/components/brand/LiftedIcons";

export type NavIcon = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

export type NavItem = {
  label: string;
  href: string;
  icon: NavIcon;
  disabled?: boolean;
  expandable?: boolean;
  children?: Array<{ label: string; href: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Find new talent", href: "/candidates/all", icon: HomeIcon },
  { label: "Interviews", href: "/interviews", icon: CalendarIcon },
  {
    label: "Team",
    href: "/team",
    icon: UsersIcon,
    expandable: true,
    children: [
      { label: "Overview", href: "/team" },
      { label: "Update Feed", href: "/team/updates" },
    ],
  },
  { label: "Compliance", href: "/compliance/alerts", icon: ComplianceIcon },
  { label: "Settings", href: "/settings", icon: GearIcon },
  {
    label: "Immigration hub",
    href: "/immigration",
    icon: GlobeIcon,
    expandable: true,
    disabled: true,
  },
  { label: "Notifications", href: "/notifications", icon: BellIcon },
  { label: "Updates", href: "/updates", icon: MegaphoneIcon },
];
