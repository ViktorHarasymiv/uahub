"use client";

import * as React from "react";
import Image from "next/image";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Locale, useI18nStore } from "@/app/store/i18nStore";

function LangSwitcher() {
  const [language, setLanguage] = React.useState("pl");
  const setLocale = useI18nStore((s) => s.setLocale);

  // Load saved language on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value as Locale;
    setLanguage(newLang);

    const locale = newLang.toLowerCase();

    // Save to localStorage
    localStorage.setItem("lang", locale);

    setLocale(newLang);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
      <Select
        value={language}
        label="Language"
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={"ua"} sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={"/icons/flags/ua.png"}
            width={14}
            height={14}
            alt="UA flag"
          />
          <span style={{ marginLeft: "10px" }}>UA</span>
        </MenuItem>

        <MenuItem value={"en"} sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={"/icons/flags/uk.png"}
            width={14}
            height={14}
            alt="UK flag"
          />
          <span style={{ marginLeft: "10px" }}>EN</span>
        </MenuItem>

        <MenuItem value={"pl"} sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={"/icons/flags/pl.png"}
            width={14}
            height={14}
            alt="PL flag"
          />
          <span style={{ marginLeft: "10px" }}>PL</span>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default LangSwitcher;
