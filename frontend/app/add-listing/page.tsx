"use client";

import { useI18n } from "../i18n/useI18n";
import { useQuickAdStore } from "../store/useQuickAdStore";

import style from "./components/Style.module.css";

import GreetingBlock from "../components/Profile/GreetingBlock/GreetingBlock";
import StepCategory from "./components/StepCategory";
import StepFields from "./components/StepFields";
import StepPhotos from "./components/StepPhotos";
import StepConfirm from "./components/StepConfirm";
import StepContact from "./components/StepContact";
import ProgressBarSteps from "./components/ProgressBarSteps";

import { Icons } from "../ui/Icons/icons";
import { useEffect, useState } from "react";
import { getUserLocation } from "../config/getUserLocation";
import { getAddressFromCoords } from "../config/getAddressFromCoords.";
import StepHeader from "./components/StepHeader";

export default function AddListing() {
  const { messages } = useI18n();

  const [location, setLocation] = useState("");

  const { step, setStep, updateField } = useQuickAdStore();

  // Автоматичне визначення міста та району
  useEffect(() => {
    getUserLocation()
      .then((coords) => getAddressFromCoords(coords.lat, coords.lng))
      .then((address) => {
        const city = address.city || address.town || address.village;
        const district = address.suburb || address.neighbourhood;

        const loc = `${city}, ${district}`;

        setLocation(loc);

        updateField("location", loc || "");
      })
      .catch(() => {
        // fallback якщо геолокація заблокована
        updateField("location", "Unknown");
      });
  }, []);

  return (
    <section className="container">
      <GreetingBlock
        title={messages["listing.title"]}
        subTitle={messages["listing.subtitle"]}
      />

      <div className="block_position">
        <div className={`block_internal ${style.step_range}`}>
          <ProgressBarSteps currentStep={step} totalSteps={5} />

          <div className={style.step_wrapper}>
            <span className={style.step_list}>Крок: {step} з 5</span>

            {step > 1 && (
              <div>
                <Icons.moveLeft
                  onClick={() => step > 1 && setStep(step - 1)}
                  className={style.arrow_icon}
                />

                <Icons.moveRight
                  onClick={() => step < 5 && setStep(step + 1)}
                  className={`${style.arrow_icon} ${
                    step === 5 ? style.disabled : ""
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="block_internal">
          {/* HEADER */}
          <StepHeader />
          {step === 1 && <StepCategory />}
          {step === 2 && <StepFields />}
          {step === 3 && <StepPhotos />}
          {step === 4 && <StepContact />}
          {step === 5 && <StepConfirm />}
        </div>
      </div>
    </section>
  );
}
