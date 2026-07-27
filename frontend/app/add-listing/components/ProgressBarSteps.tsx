import style from "./Style.module.css";

interface ProgressBarStepsProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBarSteps({
  currentStep,
  totalSteps,
}: ProgressBarStepsProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={style.wrapper}>
      {steps.map((step) => {
        const isActive = step <= currentStep;

        return (
          <div
            key={step}
            className={`${style.step} ${isActive ? style.active : ""}`}
          >
            <div className={style.fill}></div>
          </div>
        );
      })}
    </div>
  );
}
