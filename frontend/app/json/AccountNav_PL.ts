import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNav_PL: NavItem[] = [
  {
    label: "Oferty dopasowane do Ciebie",
    href: "/profile/recommendations",
    icon: "userStar",
  },
  { label: "Zapisane", href: "/profile/saved", icon: "star" },
  { label: "Powiadomienia", href: "/profile/notifications", icon: "bell" },
];

export default AccountNav_PL;
