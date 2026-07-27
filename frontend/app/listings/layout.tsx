import style from "./Style.module.css";

import RightSidebar from "./RightSidebar";

export default function ListingsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="container">
      <div className={style.grid}>
        <div className={style.left}>{children}</div>
        <aside className={style.right}>
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
