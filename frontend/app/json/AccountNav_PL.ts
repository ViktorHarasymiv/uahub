import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNav_PL: NavItem[] = [
  { label: "Twój pulpit", href: "/profile", icon: "home" },
  {
    label: "Oferty dopasowane do Ciebie",
    href: "/profile/recommendations",
    icon: "userStar",
  },
  { label: "Zapisane", href: "/profile/saved", icon: "star" },
  { label: "Powiadomienia", href: "/profile/notifications", icon: "bell" },
  {
    label: "Ustawienia konta",
    href: "/profile/settings",
    icon: "settings",
  },
];

export default AccountNav_PL;
