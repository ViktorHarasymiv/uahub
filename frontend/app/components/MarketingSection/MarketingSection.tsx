import style from "./Style.module.css";

import backgroundImg from "@/public/marketing/markering.jpg";

export default function MarketingSection() {
  return (
    <section
      style={{ background: `url(${backgroundImg.src})` }}
      className={style.wrapper}
    ></section>
  );
}
