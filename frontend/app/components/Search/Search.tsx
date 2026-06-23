"use client";

import { useRef, useState } from "react";
import style from "./Style.module.css";

import { IoSearch } from "react-icons/io5";
import { RiCloseLargeLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const location = [
  "Bemowo",
  "Białołęka",
  "Bielany",
  "Mokotów",
  "Ochota",
  "Praga-Południe",
  "Praga-Północ",
  "Rembertów",
  "Śródmieście",
  "Targówek",
  "Ursus",
  "Ursynów",
  "Wawer",
  "Wesoła",
  "Wilanów",
  "Włochy",
  "Wola",
  "Żoliborz",
];

interface Payload {
  search: string;
  locations: string[];
}

function Search() {
  const formRef = useRef<HTMLFormElement>(null);

  const [value, setValue] = useState<string>("");
  const [personName, setPersonName] = React.useState<string[]>([]);

  const [result, setResult] = useState<Payload[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      search: value,
      locations: personName,
    };
    setResult([payload]);

    console.log(payload);

    setValue("");
    formRef.current?.reset();
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const resetForm = () => {
    setValue("");
    formRef.current?.reset();
  };

  return (
    <section
      className={style.wrapper}
      style={{ background: "url(/image/navigation.jpg)" }}
    >
      {/* BODY */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className={`${style.form_wrapper} container`}
      >
        {/* SEARCH INPUT */}
        <label htmlFor="search" className={style.label}>
          {/* ACTION */}
          <IoSearch className={style.icon} />
          {value.length > 0 && (
            <RiCloseLargeLine className="close" onClick={() => resetForm()} />
          )}
          {/* FORM */}
          <input
            type="search"
            name="search"
            id="search"
            value={value}
            placeholder="Знайди щось для себе в Варшаві ..."
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={style.input}
          />
        </label>
        {/* MUI SELECT LOCATION */}
        <div>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="location-checkbox-label">
              <GrLocation className={style.icon} style={{ left: "-2px" }} />
              <span style={{ marginLeft: "32px" }}>Обери район</span>
            </InputLabel>
            <Select
              labelId="location-checkbox-label"
              id="location-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Location" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {location.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* SEARCH SUBMIT */}
        <button
          type="submit"
          className={`${style.submit_button} ${"dark_button"}`}
        >
          <IoSearch className={style.icon} /> Знайти...
        </button>
      </form>
    </section>
  );
}

export default Search;
