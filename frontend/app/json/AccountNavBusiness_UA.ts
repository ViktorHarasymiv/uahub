import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNavBusiness_UA: NavItem[] = [
  {
    label: "Оголошення компанії",
    href: "/konto/biznes/ogloszenia",
    icon: "notebookPen",
  },
  {
    label: "Статистика",
    href: "/konto/biznes/statystyki",
    icon: "stats",
  },
  {
    label: "Сповіщення",
    href: "/konto/powiadomienia",
    icon: "bell",
  },
  {
    label: "Керування підпискою",
    href: "/konto/biznes/subskrypcja",
    icon: "business",
  },
];

export default AccountNavBusiness_UA;
