import { useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthState";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import NextBtn from "./NextBtn";

export default function StepContact() {
  //  STATE

  const { contact, updateContact, setStep } = useQuickAdStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!contact.name && user?.firstName) {
      updateContact({ name: user.firstName });
    }
    if (!contact.phone && user?.phone) {
      updateContact({ phone: user.phone });
    }
    if (!contact.email && user?.email) {
      updateContact({ email: user.email });
    }
  }, [user]);

  return (
    <div className="form_block">
      {/* BODY */}
      <div className="input_block">
        <label className="input_label">Ваше імя</label>
        <input
          type="text"
          value={contact.name || ""}
          onChange={(e) => updateContact({ name: e.target.value })}
          className="input_base"
          placeholder="Введіть ім'я"
        />
      </div>

      <div className="input_block">
        <label className="input_label">Телефон</label>
        <input
          type="text"
          value={contact.phone || ""}
          onChange={(e) => updateContact({ phone: e.target.value })}
          className="input_base"
          placeholder="+48 ..."
        />
      </div>

      <div className="input_block">
        <label className="input_label">Email</label>
        <input
          type="email"
          value={contact.email || ""}
          onChange={(e) => updateContact({ email: e.target.value })}
          className="input_base"
          placeholder="example@gmail.com"
        />
      </div>

      {/* NEXT PAGE */}

      <NextBtn />
    </div>
  );
}
