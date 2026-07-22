"use client";

import { useState, useRef } from "react";

import css from "./AvatarPicker.module.css";

import { uploadPhoto } from "@/app/lib/api/api";
import { useAuthStore } from "@/app/store/useAuthState";

export const AvatarUpdateForm = ({
  initialPhoto,
}: {
  initialPhoto?: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useAuthStore((s) => s.fetchData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError("");

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Only images");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Max file size 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setFile(selected);
      handleSubmit(selected);
    };

    reader.readAsDataURL(selected);
  };

  const handleSubmit = async (selectedFile?: File) => {
    const fileToUpload = selectedFile || file;

    if (!fileToUpload) {
      setError("Choose a file first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("photoUrl", fileToUpload);

      const res = await uploadPhoto(formData);

      if (res) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.avatar_picker_wrapper}>
      <div className={css.preview_avatar}>
        {initialPhoto || previewUrl ? (
          <img
            src={previewUrl || `http://localhost:1997${initialPhoto}`}
            alt="Preview avatar"
            width={132}
            height={132}
            className={css.avatar}
          />
        ) : (
          "Dozwolony format pliku JPEG, GIF, JPG, BMP, PNG. Maksymalny rozmiar: 6,3 MB."
        )}
      </div>

      <div className={css.photo_block}>
        <input
          ref={inputRef}
          id="photoUrl"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={css.custom_avatar_input}
        />

        {error && <p className={css.error}>{error}</p>}

        <div
          className={css.button_mask}
          onClick={() => inputRef.current?.click()}
        >
          {loading ? "Uploading..." : "Dodaj zdjęcie"}
        </div>
      </div>
    </div>
  );
};
