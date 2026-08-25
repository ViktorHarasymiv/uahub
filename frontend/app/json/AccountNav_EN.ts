import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNav_EN: NavItem[] = [
  {
    label: "Offers tailored to you",
    href: "/profile/recommendations",
    icon: "userStar",
  },
  { label: "Saved", href: "/profile/saved", icon: "star" },
  { label: "Notifications", href: "/profile/notifications", icon: "bell" },
];

export default AccountNav_EN;
