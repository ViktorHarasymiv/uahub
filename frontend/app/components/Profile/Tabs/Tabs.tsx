"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TabsProps } from "@/app/types/TabsTypes";

import style from "./Style.module.css";

export function Tabs({ tabs }: TabsProps) {
  const pathname = usePathname();

  return (
    <div className={style.tabs_block}>
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${style.tab_link}
            ${active ? "active_line" : "text-gray-600"}
            `}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
