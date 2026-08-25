import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNavBusiness_PL: NavItem[] = [
  { label: "Panel firmy", href: "/profile/business", icon: "home" },
  {
    label: "Dodaj ogłoszenie",
    href: "/profile/business/add-listing",
    icon: "listing",
  },
  {
    label: "Ogłoszenia firmy",
    href: "/profile/business/listings",
    icon: "notebookPen",
  },
  { label: "Statystyki", href: "/profile/business/stats", icon: "notebookPen" },
  { label: "Powiadomienia", href: "/profile/notifications", icon: "bell" },
  {
    label: "Ustawienia firmy",
    href: "/profile/business/settings",
    icon: "settings",
  },
  {
    label: "Ustawienia konta",
    href: "/profile/settings",
    icon: "notebookPen",
  },
];

export default AccountNavBusiness_PL;
