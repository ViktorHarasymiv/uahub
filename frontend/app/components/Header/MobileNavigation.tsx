"use client";

import Link from "next/link";

import { useModalStore } from "@/app/store/modalStore";
import { usePathname } from "next/navigation";
import { Icons } from "@/app/ui/Icons/icons";

import style from "./Style.module.css";
import { useEffect } from "react";
import HeaderLogo from "./HeaderLogo";

function MobileNavigation() {
  const pathname = usePathname();

  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const modal = useModalStore((s) => s.modal);

  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <header>
      <div className={style.header_mobile_logo}>
        <HeaderLogo />
      </div>

      <div className={style.header_mobile}>
        <div className={style.mobile_nav}>
          <div className={style.mobile_nav_list}>
            <Link href="/" className={style.item} onClick={() => close()}>
              <Icons.home className="icon margin-none small_icon" />
              <span>Home</span>
            </Link>
            <button
              onClick={() => open("offers")}
              className={`${style.item} ${modal === "offers" ? "active_link" : ""}`}
            >
              <Icons.puzzle className="icon margin-none small_icon" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => open("account")}
              className={`${style.item} ${modal === "account" ? "active_link" : ""}`}
            >
              <Icons.user className="icon margin-none small_icon" />
              <span>Account</span>
            </button>

            <button
              onClick={() => open("menu")}
              className={`${style.item} ${modal === "menu" ? "active_link" : ""}`}
            >
              <Icons.menu className="icon margin-none small_icon" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MobileNavigation;
