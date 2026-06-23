"use client";

import { createPortal } from "react-dom";
import { useModalStore } from "@/app/store/useModalStore";

import style from "./Style.module.css";

import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";

export default function Modal() {
  const { open, type } = useModalStore();

  if (!open) return null;

  const renderContent = () => {
    switch (type) {
      case "signIn":
        return <LoginModal />;
      case "signUp":
        return <SignUpModal />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className={style.overlay}>
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>,
    document.body,
  );
}
