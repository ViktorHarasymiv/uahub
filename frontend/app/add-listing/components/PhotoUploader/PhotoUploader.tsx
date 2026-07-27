import { useRef } from "react";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";

import "./Style.css";

export default function PhotoUploader() {
  const { photos, addPhotoToSlot, removePhotoFromSlot, swapPhotos } =
    useQuickAdStore();

  // зберігаємо індекс перетягуваного слота
  const dragIndex = useRef<number | null>(null);

  const handleSelect = (slotIndex: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      addPhotoToSlot(slotIndex, file);
    };
    input.click();
  };

  const handleDropFile = (
    e: React.DragEvent<HTMLDivElement>,
    slotIndex: number,
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    addPhotoToSlot(slotIndex, file);
  };

  const handleDragStart = (slotIndex: number) => {
    dragIndex.current = slotIndex;
  };

  const handleDropSwap = (slotIndex: number) => {
    if (dragIndex.current === null) return;
    swapPhotos(dragIndex.current, slotIndex);
    dragIndex.current = null;
  };

  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="photo-slot"
          onClick={() => handleSelect(index)}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("drag-over");
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove("drag-over");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("drag-over");

            const files = e.dataTransfer.files;

            if (files && files.length > 0) {
              handleDropFile(e, index);
              return;
            }

            handleDropSwap(index);
          }}
        >
          {photo ? (
            <>
              <img src={URL.createObjectURL(photo)} alt="" />

              {/* Хендл для перетягування */}
              <div
                className="drag-handle"
                draggable
                onDragStart={() => handleDragStart(index)}
              >
                ☰
              </div>

              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhotoFromSlot(index);
                }}
              >
                ×
              </button>
            </>
          ) : (
            <div className="add-btn">+</div>
          )}
        </div>
      ))}
    </div>
  );
}
