import style from "./Style.module.css";

export function PromoBanner() {
  return (
    <div className={style.promo_banner}>
      <div>
        <h4 className="font-semibold">ADS</h4>
        <p className="text-sm">GOOGLE</p>
      </div>
    </div>
  );
}
