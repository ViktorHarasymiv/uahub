"use client";

import { useState } from "react";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";

import EmojiPicker from "emoji-picker-react";
import { Icons } from "@/app/ui/Icons/icons";
import { CategoryField } from "@/app/types/category";

interface DynamicFieldProps {
  field: CategoryField;
}

export default function DynamicField({ field }: DynamicFieldProps) {
  const { fields, updateField } = useQuickAdStore();
  const [showPicker, setShowPicker] = useState(false);

  const value = fields[field.name] ?? "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    let val: string | number = e.target.value;

    if (field.type === "number") {
      val = e.target.value === "" ? "" : Number(e.target.value);
    }

    updateField(field.name, val);
  };

  //   SELECT

  if (field.type === "select") {
    return (
      <div className="mb-4">
        <label className="block mb-1">{field.label}</label>
        <select
          value={value as string}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Оберіть...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  //   TEXTAREA

  if (field.type === "textarea") {
    return (
      <div className="input_block textarea">
        <label className="input_label">{field.label}</label>
        <textarea
          value={value as string}
          onChange={handleChange}
          required={field.required}
          className="input_base"
        />

        <div className="textarea_panel">
          <button
            type="button"
            className="tag_button"
            onClick={() => updateField(field.name, "")}
          >
            Очистити
          </button>
          <button
            onClick={() => setShowPicker(!showPicker)}
            style={{ padding: 0 }}
          >
            <Icons.smile style={{ marginRight: 0 }} />
          </button>
        </div>
        {showPicker && (
          <div className="emoji_picker_popup">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                updateField(field.name, (value as string) + emoji.emoji)
              }
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="input_block">
      <label className="input_label">{field.label}</label>
      <input
        type={field.type}
        value={value as string | number}
        onChange={handleChange}
        className="input_base"
        required={field.required}
        readOnly={field.name === "location"} // авто‑локація
      />
    </div>
  );
}
