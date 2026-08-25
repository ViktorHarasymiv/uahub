import GreetingBlock from "@/app/components/Profile/GreetingBlock/GreetingBlock";

import style from "../Style.module.css";
import { Tabs } from "@/app/components/Profile/Tabs/Tabs";

import Tab from "@/app/json/Tabs/SetupTabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.main}>
      <GreetingBlock
        title={"Ustawienia konta"}
        subTitle={
          "Możesz zmienić tutaj dane konta i edytować ustawienia prywatności oraz powiadomień."
        }
      />

      <section className="section_block">
        <Tabs tabs={Tab} />
        {children}
      </section>
    </div>
  );
}
