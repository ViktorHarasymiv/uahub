import Link from "next/link";

import { useModalStore } from "@/app/store/modalStore";
import style from "./Style.module.css";

function MobileNavigation() {
  const open = useModalStore((s) => s.open);

  return (
    <nav className={style.mobile_nav}>
      <div className={style.mobile_nav_list}>
        <Link href="/">Home</Link>
        <button onClick={() => open("offers")}>Offers</button>
        <button onClick={() => open("account")}>Account</button>
        <button onClick={() => open("menu")}>Menu</button>
      </div>
    </nav>
  );
}

export default MobileNavigation;
