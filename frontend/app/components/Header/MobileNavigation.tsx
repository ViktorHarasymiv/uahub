import { useModalStore } from "@/app/store/modalStore";
import style from "./Style.module.css";

function MobileNavigation() {
  const open = useModalStore((s) => s.open);

  return (
    <nav className={style.mobile_nav}>
      <div className={style.mobile_nav_list}>
        <button onClick={() => open("home")}>Home</button>
        <button onClick={() => open("search")}>Search</button>
        <button onClick={() => open("offers")}>Offers</button>
        <button onClick={() => open("account")}>Account</button>
      </div>
    </nav>
  );
}

export default MobileNavigation;
