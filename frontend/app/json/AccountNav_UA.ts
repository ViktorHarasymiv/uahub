import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNav_UA: NavItem[] = [
  { label: "Твоя панель", href: "/profile", icon: "home" },
  {
    label: "Пропозиції, підібрані спеціально для вас",
    href: "/profile/recommendations",
    icon: "userStar",
  },
  { label: "Збережені", href: "/profile/saved", icon: "star" },
  { label: "Сповіщення", href: "/profile/notifications", icon: "bell" },
  {
    label: "Налаштування акаунта",
    href: "/profile/settings",
    icon: "settings",
  },
];

export default AccountNav_UA;
