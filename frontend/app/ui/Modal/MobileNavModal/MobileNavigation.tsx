"use client";

import { useModalStore } from "@/app/store/modalStore";
import { useEffect } from "react";
import Account from "./Account";

import "./Style.css";

export default function MobileNavigation() {
  const modal = useModalStore((s) => s.modal);
  const close = useModalStore((s) => s.close);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  return (
    <div className={`modal_overlay ${modal ? "show" : ""}`} onClick={close}>
      <div
        className={`modal_window ${modal ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* {modal === "home" && <Home />}
        {modal === "search" && <Search />}
        {modal === "offers" && <Offers />} */}
        {modal === "account" && <Account />}
      </div>
    </div>
  );
}
