import { useI18n } from "@/app/i18n/useI18n";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";

import Button from "@/app/ui/Button/Button";

export default function NextBtn() {
  const { messages } = useI18n();

  const { step, setStep } = useQuickAdStore();

  const nextPage = () => {
    if (step > 1 && step !== 5) {
      setStep(step + 1);
    } else return;
  };

  return (
    <Button action={nextPage} accent={true}>
      {messages["listing.nextBtn"]}
    </Button>
  );
}
