"use client";

import { useI18n } from "@/app/i18n/useI18n";
import { useConfirmStore } from "@/app/store/useConfirmStore";
import {
  changeEmailRequest,
  editProfile,
  sendChangePassword,
} from "@/app/lib/api/api";
import { useAuthStore } from "@/app/store/useAuthState";
import { ChangePassword, emailChange, LoginRequest } from "@/app/types/auth";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "@/app/ui/Button/Button";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AccountSetup() {
  const { messages } = useI18n();
  const user = useAuthStore((s) => s.user);

  const { deleteAccount } = useAuthStore();

  const fetchData = useAuthStore((s) => s.fetchData);

  // STATE

  const [showPass, setShowPass] = useState(false);

  // EMAIL

  const initialValues: emailChange = {
    newEmail: "",
  };

  const EmailChangeSchema = Yup.object().shape({
    newEmail: Yup.string()
      .email("Niepoprawny email")
      .required("Email jest wymagany"),
  });

  // SUBMIT EMAIL

  const handleSubmit = async (values: emailChange) => {
    try {
      const res = await changeEmailRequest(values.newEmail);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // PASSWORD

  const initialValuesPassword: ChangePassword = {
    oldPassword: "",
    newPassword: "",
  };

  const SchemaPassword = Yup.object().shape({
    oldPassword: Yup.string().required("Wpisz obecne hasło"),
    newPassword: Yup.string()
      .min(6, "Hasło musi mieć minimum 6 znaków")
      .required("Wpisz nowe hasło"),
  });

  // SUBMIT PASSWORD

  const handleSubmitPassword = async (values: typeof initialValuesPassword) => {
    if (!user) return;

    const res = await sendChangePassword(
      values.oldPassword,
      values.newPassword,
    );

    if (!res.success) {
      toast.error(res.message ?? "Błąd zmiany hasła");
      return;
    }

    toast.success("Hasło zostało zmienione");
  };

  return (
    <div className="block_position">
      {/* EMAIL */}

      <div className="block_internal">
        <Formik
          initialValues={initialValues}
          validationSchema={EmailChangeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form_block">
              <div>
                <h2 className="block_title">Zmień e-mail</h2>
                <p className="block_sub_title">
                  Na nowy adres wyślemy Ci wiadomość z linkiem aktywacyjnym.
                  Kliknij w niego i zmień adres e-mail, którym logujesz się do
                  swojego konta.
                </p>
                <div className="block_details">
                  <span>Obecny e-mail:</span>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="input_block">
                <label className="input_label">Email</label>
                <Field name="newEmail" type="email" className="input_base" />
                <ErrorMessage
                  name="newEmail"
                  component="span"
                  className="input_error"
                />
              </div>

              <Button type={"submit"} accent disable={isSubmitting}>
                Zmień
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* PASSWORD */}

      <div className="block_internal">
        <Formik
          initialValues={initialValuesPassword}
          validationSchema={SchemaPassword}
          onSubmit={handleSubmitPassword}
        >
          {({ isSubmitting }) => (
            <Form className="form_block">
              <div>
                <h2 className="block_title">Zmień hasło</h2>
              </div>

              <div className="input_block">
                <label className="input_label">Obecne hasło</label>

                <Field
                  name="oldPassword"
                  type={showPass ? "name" : "password"}
                  placeholder="Obecne hasło"
                  className="input_base"
                />
                {!showPass ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => setShowPass((prev) => !prev)}
                    onMouseEnter={() => setShowPass((prev) => !prev)}
                    className="show_trick"
                  />
                ) : (
                  <LuEyeOff
                    onClick={() => setShowPass((prev) => !prev)}
                    onMouseLeave={() => setShowPass((prev) => !prev)}
                    className="show_trick"
                  />
                )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="input_error"
                />
              </div>

              <div className="input_block">
                <label className="input_label">Nowe hasło</label>
                <Field
                  name="newPassword"
                  type={showPass ? "name" : "password"}
                  placeholder="Nowe hasło"
                  className="input_base"
                />
                {!showPass ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => setShowPass((prev) => !prev)}
                    onMouseEnter={() => setShowPass((prev) => !prev)}
                    className="show_trick"
                  />
                ) : (
                  <LuEyeOff
                    onClick={() => setShowPass((prev) => !prev)}
                    onMouseLeave={() => setShowPass((prev) => !prev)}
                    className="show_trick"
                  />
                )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="input_error"
                />
              </div>

              <Button type={"submit"} accent disable={isSubmitting}>
                Zmień
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* DELETE ACCOUNT */}

      <div className="block_internal">
        <h2 className="block_title">Usuń konto</h2>
        <p className="block_sub_title">
          Usuwając konto, stracisz wszystkie zapisane na nim dane, m.in.
          historię aplikowań i ulubione oferty.
        </p>
        <Button
          type="button"
          action={() =>
            useConfirmStore.getState().show({
              description: messages["confirm.description.account.delete"],
              onConfirm: deleteAccount,
            })
          }
          accent
        >
          Usuń konto
        </Button>
      </div>
    </div>
  );
}
