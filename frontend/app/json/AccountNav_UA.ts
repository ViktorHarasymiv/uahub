import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNav_UA: NavItem[] = [
  { label: "Додати оголошення", href: "/add-listing", icon: "listing" },
  { label: "Мої оголошення", href: "/my-listings", icon: "notebookPen" },
  {
    label: "Пропозиції, підібрані спеціально для вас",
    href: "/profile/recommendations",
    icon: "userStar",
  },
  { label: "Збережені", href: "/profile/saved", icon: "star" },
  { label: "Сповіщення", href: "/profile/notifications", icon: "bell" },
];

export default AccountNav_UA;
