import Button from "@/app/ui/Button/Button";
import PhotoUploader from "./PhotoUploader/PhotoUploader";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import NextBtn from "./NextBtn";

export default function StepPhotos() {
  const { setStep } = useQuickAdStore();

  return (
    <div className="form_block">
      {/* BODY */}
      <PhotoUploader />

      <NextBtn />
    </div>
  );
}
