"use client";

import { useI18n } from "@/app/i18n/useI18n";
import { useConfirmStore } from "@/app/store/useConfirmStore";
import { editProfile } from "@/app/lib/api/api";
import { useAuthStore } from "@/app/store/useAuthState";
import { LoginRequest } from "@/app/types/auth";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "@/app/ui/Button/Button";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";

export default function AccountSetup() {
  const { messages } = useI18n();
  const user = useAuthStore((s) => s.user);

  const { deleteAccount } = useAuthStore();

  const fetchData = useAuthStore((s) => s.fetchData);

  // STATE

  const [showPass, setShowPass] = useState(false);

  const initialValues: LoginRequest = {
    email: user?.email || "",
    password: "",
  };

  const UserUpdateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Niepoprawny email")
      .required("Email jest wymagany"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Hasło jest wymagane"),
  });

  const handleSubmit = async (
    formValues: LoginRequest,
    { setSubmitting }: FormikHelpers<LoginRequest>,
  ) => {
    try {
      const res = await editProfile(formValues);
      if (res) {
        fetchData();
      }

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="block_position">
      {/* EMAIL */}

      <div className="block_internal">
        <Formik
          initialValues={initialValues}
          validationSchema={UserUpdateSchema}
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
                <Field name="email" type="email" className="input_base" />
                <ErrorMessage
                  name="email"
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
          initialValues={initialValues}
          validationSchema={UserUpdateSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form_block">
              <div>
                <h2 className="block_title">Zmień hasło</h2>
              </div>

              <div className="input_block">
                <label className="input_label">Obecne hasło</label>

                <Field
                  name="password"
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
                  name="password"
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
