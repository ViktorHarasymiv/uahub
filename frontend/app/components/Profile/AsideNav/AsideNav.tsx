"use client";

import DynamicLinksSetup from "../../DynamicLinksSetup/DynamicLinksSetup";
import style from "./Style.module.css";

import { useAuthStore } from "@/app/store/useAuthState";

type AsideNavProps = {
  styles?: object;
};

export default function AsideNav({ styles }: AsideNavProps) {
  const user = useAuthStore((s) => s.user);

  const userId = (user?._id || "").slice(0, 8);

  if (!user) return;

  return (
    <aside className={style.aside_block} style={styles}>
      <div className={style.profile_pulpit_block}>
        <div className="avatar_block">
          {user?.photoUrl ? (
            <img
              src={`http://localhost:1997${user.photoUrl}`}
              className="avatar"
            />
          ) : (
            "A"
          )}
        </div>
        <div className={style.user_info}>
          <p className={style.user_name}>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : `User: ${userId}`}
          </p>
          <p className={style.user_email}>{user?.email}</p>
          <p>{user?.accountType}</p>
        </div>
        {/* LINK PANEL */}
        <DynamicLinksSetup user={user} />
      </div>
    </aside>
  );
}
