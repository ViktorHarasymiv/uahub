import style from "./Style.module.css";

export default function GreetingBlock({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className={style.greeting_block}>
      <h2 className={style.greeting_h2_text}>{title}</h2>
      <h3 className={style.greeting_h3_text}>{subTitle}</h3>
    </div>
  );
}
