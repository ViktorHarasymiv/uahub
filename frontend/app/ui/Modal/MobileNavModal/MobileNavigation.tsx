"use client";

import { useModalStore } from "@/app/store/modalStore";
import { useEffect, useRef, useState } from "react";
import Account from "./Account";

import "./Style.css";

export default function ModalContainer() {
  const modal = useModalStore((s) => s.modal);
  const close = useModalStore((s) => s.close);

  const startY = useRef(0);
  const dragging = useRef(false);

  const [offset, setOffset] = useState(0);

  // Скидаємо offset ПЕРЕД анімацією відкриття
  useEffect(() => {
    if (!modal) return;

    // Скидаємо offset синхронно, але без рендер-петлі
    requestAnimationFrame(() => {
      setOffset(0);
    });

    document.body.style.overflow = "hidden";
  }, [modal]);

  // Повертаємо скрол після закриття
  useEffect(() => {
    if (!modal) {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.current;

    if (delta > 0) {
      setOffset(delta);
    }
  };

  const onTouchEnd = () => {
    dragging.current = false;

    if (offset > 120) {
      close();
    } else {
      setOffset(0);
    }
  };

  return (
    <div className={`modal_overlay ${modal ? "show" : ""}`} onClick={close}>
      <div
        className={`modal_window ${modal ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translate(-50%, calc(${modal ? "0%" : "100%"} + ${offset}px))`,
        }}
      >
        <div className="content">{modal === "account" && <Account />}</div>
      </div>
    </div>
  );
}
