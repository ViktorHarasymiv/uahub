"use client";

import { useConfirmStore } from "@/app/store/useConfirmStore";

import { createPortal } from "react-dom";
import Button from "@/app/ui/Button/Button";

import style from "./Style.module.css";
import { useI18n } from "@/app/i18n/useI18n";

export const ConfirmDialog = () => {
  const { open, config, hide } = useConfirmStore();

  const { messages } = useI18n();

  if (!open || !config) return null;

  return createPortal(
    <div className={style.confirm_block}>
      <div className={style.confirm_content}>
        <div>
          <h2 className={style.confirm_title}>
            {config.title || messages["confirm.title"]}
          </h2>
        </div>
        <p className={style.confirm_subtitle}>
          {config.description || messages["confirm.description"]}
        </p>
        <div className={style.action_block}>
          <Button
            type={"button"}
            accent
            action={() => {
              hide();
              config.onConfirm();
            }}
          >
            {config.confirmText || messages["confirm.action"]}
          </Button>

          <Button type={"button"} action={hide}>
            {config.cancelText || messages["confirm.cancel"]}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
