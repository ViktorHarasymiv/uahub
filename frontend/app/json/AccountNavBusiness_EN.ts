import { IconName } from "../types/icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const AccountNavBusiness_EN: NavItem[] = [
  { label: "Company Dashboard", href: "/profile/business", icon: "home" },
  {
    label: "Add Listing",
    href: "/profile/business/add-listing",
    icon: "listing",
  },
  {
    label: "Company Listings",
    href: "/profile/business/listings",
    icon: "notebookPen",
  },
  { label: "Statistics", href: "/profile/business/stats", icon: "notebookPen" },
  { label: "Notifications", href: "/profile/notifications", icon: "bell" },
  {
    label: "Company Settings",
    href: "/profile/business/settings",
    icon: "settings",
  },
  {
    label: "Account Settings",
    href: "/profile/settings",
    icon: "notebookPen",
  },
];

export default AccountNavBusiness_EN;
